---
name: superdata
description: Research B2B companies and professional profiles through Superdata's authenticated read-only MCP tools. Use for company discovery, people search, prospecting, qualification, enrichment, market mapping, or requests for business contact data.
---

# Superdata

Use Superdata's MCP tools for company and people intelligence. Keep searches explicit, bounded, and grounded in tool results.

## Workflow

1. Translate the request into explicit filters such as role, geography, industry, company size, and result count.
2. Use the narrowest matching Superdata search tool.
3. Ask one concise clarification only when a missing filter would materially change the search.
4. Return a compact table or list with the fields most relevant to the request.
5. State which filters were applied and distinguish tool-provided data from inference.

## Guardrails

- Never invent email addresses, phone numbers, company attributes, or funding facts.
- Preserve missing contact fields as unavailable.
- Do not expose credentials or internal provider details.
- Keep result counts within tool limits and paginate only when the user asks for more.
