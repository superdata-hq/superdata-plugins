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

## Semantic business tools and progressive fallback

- Thirty-five native tools cover company and people search, decision makers,
  company briefs, growth, team composition, jobs, similar companies, technology,
  apps/SDKs, ICP fit, enrichment, verified email workflows, async job status, and
  interactive presentation.
- Expensive company research and decision-maker workflows support free
  `estimate`, bounded `preview`, and full `execute` modes. Large execution can
  return a durable job for `superdata_get_job_status` to poll.
- `superdata_search_capabilities`, `superdata_get_capability`, and `superdata_call` remain available as a progressive fallback for unfamiliar or newly released operations.
- The progressive catalog retains every supported long-tail provider operation without loading more than one hundred raw schemas into each Codex task.
- `superdata_render_people_results`, `superdata_render_company_results`, `superdata_render_jobs_results`, and `superdata_render_company_brief` provide interactive, non-billable result cards.
- Direct calls consume one credit. Composed research reserves the published cost
  range and reconciles actual spend; estimates, status, resources, prompts, and
  presentation are free. Failed upstream work is refunded.
- The skill does not impose an artificial call or credit ceiling: it continues with distinct, justified calls until the requested result count is reached or covered sources are exhausted.
- OAuth requests offline access and serializes refresh-token rotation across concurrent calls, so a client that supports refresh tokens should need interactive authorization only once per installed connection.
- Non-read-only operations require explicit user approval and `confirmMutation=true`.
- Provider-observed results are dated coverage rather than official or exhaustive records.
- Empty results are coverage limitations, not proof of absence.
- Contact tools are used only when explicitly requested, and unavailable values are never guessed.
- Versioned taxonomy, workspace, usage, and job-result resources plus five prompt
  templates are discoverable through native MCP resource and prompt APIs.

## Direct MCP

Advanced users can register `https://api.superdata.so/mcp` directly. Direct MCP supplies the tools but not the plugin's bundled routing guidance.

See [Superdata](https://superdata.so), the [privacy policy](https://superdata.so/privacy), [terms](https://superdata.so/terms), or email [support](mailto:hey@superdata.so).

Never put an API key or OAuth token in a repository, issue, prompt, screenshot, analytics event, documentation file, or URL.
