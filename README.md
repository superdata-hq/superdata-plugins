# Superdata plugins

**Authenticated B2B intelligence for Codex and Claude.**

Superdata connects an approved account to company and professional-profile intelligence through MCP. Your team asks questions in the AI client it already uses; Superdata handles authenticated, read-only retrieval and returns compact results with explicit coverage limits.

Think of Superdata as an MCP access layer for go-to-market and market research—not as a CRM, outreach system, or autonomous agent. It retrieves intelligence but does not send messages, update another system, or take action on a customer's behalf.

This public repository contains customer-safe plugins for Codex, Claude Desktop and Cowork, and Claude Code. It contains no Superdata backend code, private data, customer credentials, OAuth tokens, or upstream credentials.

## What you get

- `superdata_search_companies` for company discovery by industry, country, and employee range.
- `superdata_search_people` for current-profile discovery by role, country, current-company industry, and current-company size.
- Browser-based OAuth sign-in to an approved, customer-scoped account.
- Natural-language routing through the Superdata skill, plus direct access to the MCP tools when needed.

Each accepted intelligence search uses one workspace credit. Clarification before execution does not use a credit.

## Before you install

You need an approved Superdata account and a supported client. The repository is public, but Superdata intelligence is not; installing the plugin does not create an account or bypass approval.

## Codex desktop app and CLI

Run this once on the same computer where you use Codex:

```sh
codex plugin marketplace add superdata-hq/superdata-plugins --ref main \
  && codex plugin add superdata@superdata \
  && codex mcp login superdata
```

Complete browser sign-in. Then fully quit and reopen the Codex desktop app, or start a new Codex CLI session.

Select Superdata from the plugin picker or ask:

> Use Superdata to find 20 US fintech companies with 50 to 200 employees.

## Claude Desktop and Cowork

1. Open **Customize → Plugins**. Some versions place Plugins under **Settings → Plugins**.
2. Choose **Add marketplace → Add from a repository**.
3. Paste `https://github.com/superdata-hq/superdata-plugins`.
4. Install Superdata, open its connector, select **Connect**, and complete browser sign-in.
5. Start a new chat, type `/`, select Superdata, and add your question.

## Claude Code CLI

```sh
claude plugin marketplace add superdata-hq/superdata-plugins \
  && claude plugin install superdata@superdata
```

Run `/reload-plugins`, open `/mcp`, connect Superdata, and start a new session. Use `/superdata:superdata` followed by your request, or ask Claude to use Superdata in ordinary language.

## What to ask

- “Find 20 US fintech companies with 50 to 200 employees.”
- “Find product leaders in Canada at SaaS companies with 200 to 1,000 employees.”
- “Show work emails for these people when available.”
- “Explain what Superdata can search and which filters I should provide.”

Superdata treats company sizes, roles, locations, and profile details as provider-observed coverage rather than official or exhaustive records. An empty result is a coverage limitation, not proof of absence. Contact data is displayed only when explicitly requested, and unavailable fields are never guessed.

The bundled skill uses Superdata as the sole intelligence source unless the user explicitly requests a multi-source answer. It does not silently fall back to web search or another enrichment provider; unsupported capabilities are reported clearly.

## Update the plugin

Codex:

```sh
codex plugin marketplace upgrade superdata \
  && codex plugin add superdata@superdata
```

Claude Code:

```sh
claude plugin marketplace update superdata \
  && claude plugin update superdata@superdata
```

For Claude Desktop or Cowork, update Superdata from **Customize → Plugins**. Start a new chat or session after every plugin update.

## Direct MCP connection

The plugin is recommended because it includes both the MCP connection and Superdata's routing guidance. Advanced users can connect the tools directly at:

```text
https://api.superdata.so/mcp
```

Direct Codex setup:

```sh
codex mcp add superdata --url https://api.superdata.so/mcp \
  && codex mcp login superdata
```

Direct Claude Code setup:

```sh
claude mcp add --transport http --scope user \
  superdata https://api.superdata.so/mcp
```

Complete browser sign-in when the client opens the authorization flow.

## Troubleshooting

- **The plugin is installed but no tools appear:** finish the connector or MCP sign-in, fully reload the client, and start a new session.
- **Browser authorization does not complete:** sign in with the approved Superdata account that should own the usage.
- **The skill appears but tools do not:** confirm the Superdata connector is connected, then retry in a new chat.
- **A request returns no data:** broaden one filter at a time and report remaining gaps as coverage limitations.
- **The workspace is out of credits:** open the Superdata dashboard to inspect usage and allowance.

## Security and support

Superdata is read-only and customer-scoped. Never put an API key or OAuth token in a repository, issue, prompt, screenshot, analytics event, documentation file, or URL.

- [Superdata](https://superdata.so)
- [Privacy](https://superdata.so/privacy)
- [Terms](https://superdata.so/terms)
- [Support](mailto:hey@superdata.so)

Report security concerns privately to `security@superdata.so`. Do not open a public issue containing credentials, tokens, customer information, private service details, or intelligence results.
