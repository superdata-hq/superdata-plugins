# Superdata plugin

Superdata brings authenticated B2B intelligence into Codex and Claude. The plugin contains the hosted MCP connection and routing guidance; it contains no backend code, customer credentials, OAuth tokens, provider credentials, or intelligence data.

## Start here

You need an approved Superdata account. Public plugin installation does not grant intelligence access.

### Codex desktop app or CLI

```sh
codex plugin marketplace add superdata-hq/superdata-plugins --ref main \
  && codex plugin add superdata@superdata \
  && codex mcp login superdata
```

Complete browser sign-in, fully reopen the desktop app or start a new CLI session, and ask Superdata for focused research.

### Claude Desktop or Cowork

Open **Customize → Plugins**, choose **Add marketplace → Add from a repository**, paste `https://github.com/superdata-hq/superdata-plugins`, install Superdata, connect its MCP server, and start a new chat.

### Claude Code CLI

```sh
claude plugin marketplace add superdata-hq/superdata-plugins \
  && claude plugin install superdata@superdata
```

Run `/reload-plugins`, open `/mcp`, connect Superdata, and use `/superdata:superdata` followed by your request.

## Progressive tool workflow

- `superdata_search_capabilities` searches the complete capability catalog without consuming a credit.
- `superdata_get_capability` inspects one exact operation contract without consuming a credit.
- `superdata_call` executes one selected operation. A successful or no-match execution consumes one workspace credit; a failed upstream request is refunded.
- Non-read-only operations require explicit user approval and `confirmMutation=true`.
- Provider-observed results are dated coverage rather than official or exhaustive records.
- Empty results are coverage limitations, not proof of absence.
- Contact fields are displayed only when explicitly requested, and unavailable values are never guessed.

## Direct MCP

Advanced users can register `https://api.superdata.so/mcp` directly. Direct MCP supplies the tools but not the plugin's bundled routing guidance.

See [Superdata](https://superdata.so), the [privacy policy](https://superdata.so/privacy), [terms](https://superdata.so/terms), or email [support](mailto:hey@superdata.so).

Never put an API key or OAuth token in a repository, issue, prompt, screenshot, analytics event, documentation file, or URL.
