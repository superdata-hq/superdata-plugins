import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = resolve(process.cwd());
const required = [
  ".agents/plugins/marketplace.json",
  ".claude-plugin/marketplace.json",
  "plugins/superdata/.codex-plugin/plugin.json",
  "plugins/superdata/.claude-plugin/plugin.json",
  "plugins/superdata/.mcp.json",
  "plugins/superdata/skills/superdata/SKILL.md",
  "plugins/superdata/assets/icon.png",
];

for (const path of required) await stat(join(root, path));

async function files(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const nested = await Promise.all(
    entries
      .filter((entry) => !entry.name.startsWith(".git"))
      .map((entry) => (entry.isDirectory() ? files(join(path, entry.name)) : [join(path, entry.name)])),
  );
  return nested.flat();
}

const privateMarkers = [
  /dl_live_[A-Za-z0-9_-]+/g,
  /sd_live_[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+/g,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g,
  /mongodb(?:\+srv)?:\/\/[^\s"']+@/gi,
];

for (const path of await files(root)) {
  const content = await readFile(path);
  if (content.includes(0)) continue;
  const text = content.toString("utf8");
  for (const marker of privateMarkers) {
    if (marker.test(text)) throw new Error(`Potential secret found in ${path.slice(root.length + 1)}`);
    marker.lastIndex = 0;
  }
}

for (const platform of ["codex", "claude"]) {
  const manifest = JSON.parse(await readFile(join(root, `plugins/superdata/.${platform}-plugin/plugin.json`), "utf8"));
  if (manifest.name !== "superdata" || manifest.version !== "1.0.0") {
    throw new Error(`${platform} plugin manifest is incomplete.`);
  }
}

const mcp = JSON.parse(await readFile(join(root, "plugins/superdata/.mcp.json"), "utf8"));
if (mcp.mcpServers?.superdata?.url !== "https://api.superdata.so/mcp") {
  throw new Error("Unexpected MCP URL.");
}
if (mcp.mcpServers.superdata.bearer_token_env_var) {
  throw new Error("OAuth distribution must not require an API key.");
}

console.log("Validated shared Codex and Claude plugin package.");
