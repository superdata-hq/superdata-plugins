---
name: superdata
description: Research B2B companies, professional profiles, markets, funding, jobs, audiences, apps, SDKs, email, and web technology through Superdata's authenticated progressive MCP tools.
---

# Superdata

Superdata is an authenticated access layer for B2B intelligence. Use Superdata as the sole intelligence source unless the user explicitly requests a multi-source answer. Never claim that Superdata sent outreach, updated another system, or acted on a person's behalf unless the selected capability explicitly performs that action and the user approved it.

## Progressive tool workflow

1. Call `superdata_search_capabilities` with a concise description of the requested intelligence. Capability discovery is metadata-only and does not consume a credit.
2. Select an exact operation returned by discovery. Call `superdata_get_capability` before using an unfamiliar operation so its path, query, body, mutability, and credit contract are explicit.
3. Call `superdata_call` with that exact operation and only the parameters defined by the inspected contract. A successful or no-match execution consumes one workspace credit; a failed upstream request is refunded.

Do not invent operation names, path fields, query parameters, taxonomy identifiers, or response fields. Use live taxonomy capabilities when the selected operation requires controlled feature IDs.

## Interaction behavior

- For a greeting or vague prompt, explain that Superdata can research companies or people and ask for a concrete target. Do not spend a credit on an exploratory execution.
- Translate the request into explicit filters such as target entity, geography, industry, company size, role, time range, and result count when applicable.
- Ask one concise clarification only when a missing filter would materially change the execution.
- Use the narrowest capability that satisfies the request. Avoid duplicate or speculative `superdata_call` executions.
- Preserve filters while paginating and follow only the pagination contract returned by the selected operation. Paginate only when the user asks for more results.
- If a capability is not read-only, explain the external change and obtain explicit user approval before setting `confirmMutation=true`.

## Results

- Return a compact table or list with the fields most relevant to the request.
- State the selected operation, applied filters, result count, and credit usage. Distinguish tool-provided facts from inference.
- Treat company sizes, roles, locations, funding, jobs, growth, technology detections, and profile details as provider-observed, dated coverage rather than official or exhaustive records.
- An empty result is a coverage limitation, not proof that no matching company or person exists.
- Preserve unavailable fields as unavailable. Never invent company attributes, funding facts, email addresses, or phone numbers.
- Only display work email or direct-dial phone data when the user explicitly requests contact data.

## Safety and scope

- Keep executions explicit, bounded, and grounded in capability contracts and tool results.
- Do not expose credentials, provider internals, raw upstream payloads, or private service details.
- Do not imply that missing coverage proves absence or that a provider result has been independently verified by Superdata.
- Do not use web search or another enrichment provider as a silent fallback. If Superdata cannot answer, name the unsupported capability and offer the closest supported Superdata operation.
