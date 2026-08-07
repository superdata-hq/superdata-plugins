#!/usr/bin/env node

import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const endpoint = "https://api.superdata.so/mcp";
const repository = "https://github.com/superdata-hq/superdata-plugins";
const pluginSchema = "https://agent-plugins.org/schemas/1.0.0/plugin.schema.json";
const mcpSchema = "https://agent-plugins.org/schemas/1.0.0/mcp.schema.json";
const pluginTopLevelFields = new Set([
  "$schema",
  "name",
  "version",
  "description",
  "author",
  "homepage",
  "repository",
  "license",
  "keywords",
  "extensions",
]);

async function json(path) {
  return JSON.parse(await readFile(resolve(repoRoot, path), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function assertKeys(value, allowed, label) {
  for (const key of Object.keys(value)) {
    assert(allowed.has(key), `${label} contains non-portable field '${key}'`);
  }
}

function assertString(value, label) {
  assert(typeof value === "string" && value.length > 0, `${label} must be a non-empty string`);
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

const plugin = await json("plugin.json");
const mcp = await json("mcp.json");
const packageManifest = await json("package.json");
const superdataServer = mcp.mcpServers?.superdata;

assertKeys(plugin, pluginTopLevelFields, "plugin.json");
assert(plugin.$schema === pluginSchema, "plugin.json must target Agent Plugins 1.0.0");
assert(plugin.name === "superdata", "Unexpected plugin name");
assert(/^(?!.*(?:--|\\.\\.))[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?$/.test(plugin.name), "Plugin name is invalid");
assert(plugin.version === "5.1.0", "Agent Plugins release must be version 5.1.0");
assert(packageManifest.version === plugin.version, "Package and plugin versions must match");
assertString(plugin.description, "Plugin description");
assert(plugin.repository === repository, "Repository is wrong");
assert(plugin.license === "MIT", "License must be MIT");
assert(Array.isArray(plugin.keywords) && plugin.keywords.every((value) => typeof value === "string"), "Keywords are invalid");
assert(plugin.author && typeof plugin.author === "object" && !Array.isArray(plugin.author), "Author must be an object");
assertKeys(plugin.author, new Set(["name", "email", "url"]), "plugin.json author");
assert(plugin.author.name === "Superdata", "Author name is wrong");

assertKeys(mcp, new Set(["$schema", "mcpServers"]), "mcp.json");
assert(mcp.$schema === mcpSchema, "mcp.json must target Agent Plugins MCP 1.0.0");
assert(mcp.mcpServers && typeof mcp.mcpServers === "object" && !Array.isArray(mcp.mcpServers), "mcpServers must be an object");
assert(Object.keys(mcp.mcpServers).length === 1, "mcp.json must define one MCP server");
assert(superdataServer && typeof superdataServer === "object", "Superdata MCP server is missing");
assertKeys(superdataServer, new Set(["type", "url", "headers"]), "Superdata MCP server");
assert(superdataServer.type === "streamable-http", "Superdata MCP transport must be streamable-http");
assert(superdataServer.url === endpoint, "Unexpected MCP endpoint");
assert(
  superdataServer.headers?.["x-superdata-client"] === "AgentPlugins",
  "Agent Plugins client header is missing",
);
assert(!JSON.stringify(mcp).match(/auth|oauth|authorization|bearer|token|secret|http_headers/i), "mcp.json must not contain auth or credential fields");

for (const path of [
  "plugin.json",
  "mcp.json",
  "README.md",
  "LICENSE",
  "SECURITY.md",
  "assets/icon.png",
  "assets/screenshot-pipeline.png",
  "skills/superdata/SKILL.md",
]) {
  assert((await stat(resolve(repoRoot, path))).isFile(), `${path} is missing`);
}

const removedPaths = [
  [".agents", "plugins", "market" + "place.json"],
  ["." + "claude-plugin", "market" + "place.json"],
  ["plugins", "superdata", "." + "codex-plugin", "plugin.json"],
  ["plugins", "superdata", "." + "claude-plugin", "plugin.json"],
  ["plugins", "superdata", "." + "mcp.json"],
  ["skills", "superdata", "agents", "openai" + ".yaml"],
].map((parts) => parts.join("/"));

for (const path of removedPaths) {
  try {
    await stat(resolve(repoRoot, path));
    throw new Error(`${path} must be removed for the Agent Plugins package`);
  } catch (error) {
    if (error && typeof error === "object" && "code" in error && error.code === "ENOENT") continue;
    throw error;
  }
}

const skill = await readFile(resolve(repoRoot, "skills/superdata/SKILL.md"), "utf8");
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

console.log(`Validated Superdata Agent Plugins package v${plugin.version}.`);
