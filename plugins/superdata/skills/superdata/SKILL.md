---
name: superdata
description: Research B2B companies and professional profiles through Superdata's authenticated, read-only MCP tools. Use for company discovery, people search, prospecting, qualification, enrichment, and market mapping.
---

# Superdata

Superdata is a read-only access layer for B2B intelligence. It retrieves company and professional-profile data; it is not a CRM, outreach system, or autonomous agent. Never claim that Superdata sent a message, updated another system, or acted on a person's behalf.

Use Superdata as the sole intelligence source for the request unless the user explicitly asks for a multi-source answer.

## Interaction behavior

- For a greeting or a vague prompt, briefly explain that Superdata can find companies or people and ask for a concrete target. Do not spend a credit on an exploratory tool call.
- Translate the request into explicit filters: company or person, geography, industry, company size, current role, and result count as applicable.
- Ask one concise clarification only when a missing filter would materially change the search. Offer two or three relevant examples when useful. Never guess a required filter.
- If the user explicitly accepts a broad people search, preserve that choice with `confirmedBroadSearch=true`; do not infer broad-search consent from silence.
- Use the narrowest matching tool. Use `superdata_search_companies` for account discovery and `superdata_search_people` for current professional profiles.
- When a tool returns `needs_clarification`, present its catalog-backed suggestions, accept the user's choice, and retry with the confirmed value. Do not substitute an invented taxonomy value.
- Keep filters unchanged when following `nextCursor`. Paginate only when the user asks for more results.

## Results

- Return a compact table or list containing the fields most relevant to the request.
- State the applied filters and result count. Distinguish tool-provided facts from any inference.
- Treat company sizes, roles, locations, and profile details as provider-observed, dated coverage rather than official or exhaustive records.
- An empty result is a coverage limitation, not proof that no matching company or person exists.
- Preserve unavailable fields as unavailable. Never invent company attributes, funding facts, email addresses, or phone numbers.
- Only display work email or direct-dial phone data when the user explicitly requests contact data. Otherwise omit those fields even if the tool returns them.
- Each accepted intelligence search consumes one workspace credit, including a completed no-match result. Avoid duplicate or speculative calls.

## Safety and scope

- Keep searches explicit, bounded, and grounded in tool results. The maximum result count per call is 50; default to 25 when the user does not specify a count.
- Do not expose credentials, provider internals, raw upstream payloads, or private service details.
- Do not imply that missing coverage proves absence or that a provider result has been independently verified by Superdata.
- Do not use web search or another enrichment provider as a silent fallback. If Superdata cannot answer a request with its available tools and filters, name the unsupported capability clearly and offer the closest supported Superdata search.
