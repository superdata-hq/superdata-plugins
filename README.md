# Superdata plugins

**Authenticated workflow and progressive B2B intelligence for Codex and Claude.**

Superdata connects an approved account to company, people, funding, jobs, audience, mobile-app, SDK, email, and web-technology intelligence through MCP. The public repository contains customer-safe plugins and no backend code, private data, customer credentials, OAuth tokens, or upstream credentials.

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
- Browser-based OAuth sign-in with refresh-token support for an approved, customer-scoped account.
- Natural-language routing through the bundled Superdata skill.

## Codex desktop app and CLI

```sh
codex plugin marketplace add superdata-hq/superdata-plugins --ref main \
  && codex plugin add superdata@superdata \
  && codex mcp login superdata
```

Complete browser sign-in, fully reopen Codex, and start a new task. Select Superdata or ask:

> Use Superdata to find UK cybersecurity companies with 50 to 500 employees.

## Claude Desktop and Cowork

Add `https://github.com/superdata-hq/superdata-plugins` as a plugin marketplace, install Superdata, connect its MCP server, complete browser sign-in, and start a new chat.

## Claude Code CLI

```sh
claude plugin marketplace add superdata-hq/superdata-plugins \
  && claude plugin install superdata@superdata
```

Run `/reload-plugins`, open `/mcp`, connect Superdata, and start a new session.

## Update the plugin

```sh
codex plugin marketplace upgrade superdata \
  && codex plugin add superdata@superdata
```

For Claude Code, run `claude plugin marketplace update superdata` and `claude plugin update superdata@superdata`. Start a new task or session after every update.

## Direct MCP connection

The plugin is recommended because it bundles both the MCP connection and Superdata routing guidance. Advanced users can connect directly to `https://api.superdata.so/mcp` and then complete OAuth sign-in.

## Troubleshooting

- If the skill appears but tools do not, complete `codex mcp login superdata`, fully restart Codex, and use a new task.
- If OAuth fails, verify both authorization-server metadata URL shapes advertise the same compatibility contract.
- If a request returns no data, broaden one filter at a time and treat the result as a coverage limitation.

Never put an API key or OAuth token in a repository, issue, prompt, screenshot, analytics event, documentation file, or URL.
