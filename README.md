# Superdata Agent Plugin

**Authenticated workflow and progressive B2B intelligence for Agent Plugins-compatible clients.**

Superdata connects an approved account to company, people, funding, jobs, audience, mobile-app, SDK, email, and web-technology intelligence through MCP. This repository is an Agent Plugins 1.0.0 package with a portable `plugin.json`, `mcp.json`, and `skills/` layout, plus Codex marketplace metadata for current Codex installs. It contains no backend code, private data, customer credentials, OAuth tokens, or upstream credentials.

## What you get

- Thirty-five semantic business tools for company, people, decision-maker,
  analysis, ICP, enrichment, async-job, and presentation workflows.
- Full long-tail catalog access through progressive discovery instead of loading every raw schema into each task.
- Interactive people, company, job, and company-brief result cards.
- Progressive `superdata_search_capabilities`, `superdata_get_capability`, and `superdata_call` fallback for unfamiliar operations.
- Free estimates, bounded previews, durable async jobs, authenticated resources,
  and five reusable research prompts.
- Direct calls cost one credit; composed work reserves and reconciles its catalog
  range. Failed work is refunded, while discovery and presentation are free.
- Client-managed authentication for an approved, customer-scoped account.
- Natural-language routing through the bundled Superdata skill.

## Install

### Codex

Run this command on the computer where you use Codex:

```sh
codex plugin marketplace add superdata-hq/superdata-plugins --ref main \
  && codex plugin add superdata@superdata \
  && codex mcp login superdata
```

Complete browser sign-in, fully reopen Codex, and start a new task. This installs the plugin package, enables the bundled Superdata skill, connects the hosted MCP server, and starts OAuth sign-in.

### Agent Plugins-compatible clients

Use an Agent Plugins-compatible client that supports Agent Skills and Streamable HTTP MCP servers. Add this repository as a plugin package, then enable the `superdata` plugin.

The portable MCP configuration is:

```json
{
  "mcpServers": {
    "superdata": {
      "type": "streamable-http",
      "url": "https://api.superdata.so/mcp"
    }
  }
}
```

Complete the client-managed Superdata sign-in flow if your client prompts for authentication, then start a new task and ask:

> Use Superdata to find UK cybersecurity companies with 50 to 500 employees.

## Authentication

Agent Plugins 1.0.0 does not define portable OAuth or credential-reference fields in `mcp.json`. Authentication is handled by the compatible client and the hosted Superdata MCP server. Do not add bearer tokens, OAuth refresh tokens, or API keys to this repository.

## Direct MCP connection

The plugin is recommended because it bundles both the MCP connection and Superdata routing guidance. Advanced users can connect directly to `https://api.superdata.so/mcp` in an MCP-capable client and then complete the client-managed sign-in flow.

## Troubleshooting

- If `codex plugin marketplace add` reports that the marketplace root does not
  contain a supported manifest, confirm you are installing a version of this
  repository that includes `.agents/plugins/marketplace.json`.
- If the skill appears but tools do not, verify that your client loaded `mcp.json` and supports Streamable HTTP MCP.
- If sign-in fails, verify both authorization-server metadata URL shapes advertise the same compatibility contract.
- If a request returns no data, broaden one filter at a time and treat the result as a coverage limitation.

Never put an API key or OAuth token in a repository, issue, prompt, screenshot, analytics event, documentation file, or URL.
