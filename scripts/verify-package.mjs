#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const pluginRoot = resolve(repoRoot, "plugins/superdata");
const endpoint = "https://api.superdata.so/mcp";
const repository = "https://github.com/superdata-hq/superdata-plugins";

async function json(path) {
  return JSON.parse(await readFile(resolve(repoRoot, path), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function textFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const path = resolve(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await textFiles(path)));
    else if ([".json", ".md", ".mjs", ".svg", ".yaml", ".yml"].includes(extname(path))) files.push(path);
  }
  return files;
}

const codexCatalog = await json(".agents/plugins/marketplace.json");
const claudeCatalog = await json(".claude-plugin/marketplace.json");
const codexManifest = await json("plugins/superdata/.codex-plugin/plugin.json");
const claudeManifest = await json("plugins/superdata/.claude-plugin/plugin.json");
const packageManifest = await json("package.json");
const codexMcp = await json("plugins/superdata/.mcp.json");
const claudeMcp = claudeManifest.mcpServers;
const codexSuperdataServer = codexMcp.mcpServers?.superdata;

assert(codexCatalog.name === "superdata", "Unexpected Codex marketplace name");
assert(claudeCatalog.name === "superdata", "Unexpected Claude marketplace name");
assert(codexCatalog.plugins?.length === 1, "Codex marketplace must contain one plugin");
assert(claudeCatalog.plugins?.length === 1, "Claude marketplace must contain one plugin");
assert(codexCatalog.plugins[0]?.source?.path === "./plugins/superdata", "Codex plugin path is wrong");
assert(claudeCatalog.plugins[0]?.source === "./plugins/superdata", "Claude plugin path is wrong");
assert(codexManifest.name === "superdata", "Unexpected Codex plugin name");
assert(claudeManifest.name === "superdata", "Unexpected Claude plugin name");
assert(codexManifest.version === claudeManifest.version, "Plugin versions must match");
assert(codexManifest.version === "5.1.0", "Semantic-workflow release must be version 5.1.0");
assert(packageManifest.version === codexManifest.version, "Package and plugin versions must match");
assert(claudeCatalog.plugins[0]?.version === claudeManifest.version, "Claude marketplace version must match");
assert(codexManifest.repository === repository, "Codex repository is wrong");
assert(claudeManifest.repository === repository, "Claude repository is wrong");
assert(codexManifest.mcpServers === "./.mcp.json", "Codex MCP path is wrong");
assert(claudeMcp && typeof claudeMcp === "object", "Claude MCP config is missing");
assert(codexMcp.mcpServers && typeof codexMcp.mcpServers === "object", "Codex MCP config must define mcpServers");
assert(codexSuperdataServer && typeof codexSuperdataServer === "object", "Codex Superdata MCP server is missing");
assert(
  typeof codexSuperdataServer.url === "string" || typeof codexSuperdataServer.command === "string",
  "Codex Superdata MCP server must define a transport",
);
assert(codexSuperdataServer.url === endpoint, "Unexpected Codex MCP endpoint");
assert(codexSuperdataServer.auth === "oauth", "Codex must use OAuth");
assert(codexSuperdataServer.type === "http", "Codex MCP transport type must be http");
assert(codexSuperdataServer.http_headers?.["x-superdata-client"] === "Codex", "Codex client header is missing");
assert(!("bearer_token_env_var" in codexSuperdataServer), "Codex must not require an environment token");
assert(claudeMcp.superdata?.url === endpoint, "Unexpected Claude MCP endpoint");
assert(!JSON.stringify(claudeMcp).match(/authorization/i), "Claude config must not contain authorization material");

for (const path of [
  ".agents/plugins/marketplace.json",
  ".claude-plugin/marketplace.json",
  "plugins/superdata/.codex-plugin/plugin.json",
  "plugins/superdata/.claude-plugin/plugin.json",
  "plugins/superdata/.mcp.json",
  "plugins/superdata/README.md",
  "plugins/superdata/assets/icon.png",
  "plugins/superdata/skills/superdata/SKILL.md",
  "plugins/superdata/skills/superdata/agents/openai.yaml",
]) {
  assert((await stat(resolve(repoRoot, path))).isFile(), `${path} is missing`);
}

const skill = await readFile(resolve(pluginRoot, "skills/superdata/SKILL.md"), "utf8");
for (const behavior of [
  "superdata_search_capabilities",
  "superdata_get_capability",
  "superdata_call",
  "superdata_search_people",
  "superdata_search_companies",
  "superdata_find_company_people",
  "superdata_find_decision_makers",
  "superdata_research_company",
  "superdata_enrich_people",
  "superdata_find_work_email",
  "superdata_analyze_company_growth",
  "superdata_analyze_technology",
  "superdata_build_icp",
  "superdata_score_fit",
  "superdata_get_job_status",
  "superdata_get_company_trends",
  "superdata_get_linkedin_profile",
  "superdata_render_people_results",
  "Do not spend a credit on an exploratory execution",
  "do not impose an artificial call, provider, or credit ceiling",
  "An empty result is a coverage limitation",
  "Only display work email or direct-dial phone data when the user explicitly requests contact data.",
  "confirmMutation=true",
  "Use Superdata as the sole intelligence source",
  "Do not use web search or another enrichment provider as a silent fallback.",
]) {
  assert(skill.includes(behavior), `Superdata skill is missing required behavior: ${behavior}`);
}

const openaiAgent = await readFile(resolve(pluginRoot, "skills/superdata/agents/openai.yaml"), "utf8");
assert(openaiAgent.includes('value: "superdata"'), "OpenAI agent MCP dependency is missing");
assert(openaiAgent.includes("allow_implicit_invocation: true"), "Implicit skill invocation policy is missing");

const forbidden = [
  /sd_live_[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  /(?:ghp|github_pat|sk_live|dop_v1|xox[baprs])_[A-Za-z0-9_-]{12,}/,
  /SUPERDATA_(?:API_KEY|TOKEN)\s*=/,
  /BETTER_AUTH_SECRET\s*=/,
  /MIXRANK_[A-Z0-9_]+\s*=/,
  /UPSTREAM_[A-Z0-9_]+\s*=/,
  /mongodb(?:\+srv)?:\/\/[^\s"']+@/i,
];

for (const path of await textFiles(repoRoot)) {
  const contents = await readFile(path, "utf8");
  for (const pattern of forbidden) {
    assert(!pattern.test(contents), `Possible sensitive value in ${relative(repoRoot, path)}`);
  }
}

console.log(`Validated Superdata marketplace package for Codex and Claude (v${codexManifest.version}).`);
