# Superdata Plugins

Public Codex, ChatGPT, and Claude plugin metadata for Superdata's authenticated read-only MCP server.

## Codex and ChatGPT

```bash
codex plugin marketplace add superdata-hq/superdata-plugins --ref main \
  && codex plugin add superdata@superdata
```

## Claude

```bash
claude plugin marketplace add superdata-hq/superdata-plugins \
  && claude plugin install superdata@superdata
```

Complete browser sign-in when prompted. The MCP server, OAuth service, provider integrations, metering, and customer data remain in Superdata's private infrastructure.
