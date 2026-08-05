# Superdata plugin

Superdata brings authenticated, read-only B2B company and professional-profile intelligence into Codex and Claude. The plugin contains the hosted MCP connection and Superdata routing guidance; it contains no backend service code, customer credentials, OAuth tokens, provider credentials, or intelligence data.

## Start here

You need an approved Superdata account. Public plugin installation does not grant intelligence access.

### Codex desktop app or CLI

```sh
codex plugin marketplace add superdata-hq/superdata-plugins --ref main \
  && codex plugin add superdata@superdata \
  && codex mcp login superdata
```

Complete browser sign-in, fully reopen the desktop app or start a new CLI session, and ask Superdata for a focused company or people search.

### Claude Desktop or Cowork

Open **Customize → Plugins**, choose **Add marketplace → Add from a repository**, and paste:

```text
https://github.com/superdata-hq/superdata-plugins
```

Install Superdata, connect its connector, complete browser sign-in, and start a new chat.

### Claude Code CLI

```sh
claude plugin marketplace add superdata-hq/superdata-plugins \
  && claude plugin install superdata@superdata
```

Run `/reload-plugins`, open `/mcp`, connect Superdata, and use `/superdata:superdata` followed by your request.

## Product behavior

- `superdata_search_companies` finds companies by industry, country, and employee range.
- `superdata_search_people` finds current professional profiles by role, location, current-company industry, and current-company size.
- Every accepted intelligence search uses one workspace credit. Pre-execution clarification does not.
- Provider-observed company sizes, roles, locations, and profile details are dated coverage rather than official or exhaustive records.
- Empty results are coverage limitations, not proof of absence.
- Contact fields are displayed only when explicitly requested and unavailable values are never guessed.
- Superdata does not send messages, update CRMs, or take action in other systems.

## Direct MCP

Advanced users can register `https://api.superdata.so/mcp` directly. Direct MCP supplies the tools but not the plugin's bundled routing guidance.

See [Superdata](https://superdata.so), the [privacy policy](https://superdata.so/privacy), [terms](https://superdata.so/terms), or email [support](mailto:hey@superdata.so).

Never put an API key or OAuth token in a repository, issue, prompt, screenshot, analytics event, documentation file, or URL.
