---
name: superdata
description: Research B2B companies, professional profiles, markets, funding, jobs, audiences, apps, SDKs, email, and web technology through Superdata's authenticated direct and progressive MCP tools.
---

# Superdata

Superdata is an authenticated access layer for B2B intelligence. Use Superdata as the sole intelligence source unless the user explicitly requests a multi-source answer. Never claim that Superdata sent outreach, updated another system, or acted on a person's behalf unless the selected capability explicitly performs that action and the user approved it.

## Direct-first tool workflow

1. Prefer a first-class typed tool whenever one matches the request. Primary workflows include `superdata_search_companies`, `superdata_match_company`, `superdata_get_company`, `superdata_search_people`, `superdata_match_person`, `superdata_get_person`, `superdata_resolve_person_from_social_url`, `superdata_reveal_work_email`, `superdata_validate_email`, `superdata_get_linkedin_profile`, `superdata_get_linkedin_company`, and `superdata_get_linkedin_job`.
2. Every remaining catalog operation is also registered directly under a `superdata_*` name. Use its exact path, query, body, mutability, and credit contract.
3. Use progressive discovery only when the correct direct tool is unfamiliar: call `superdata_search_capabilities`, inspect it with `superdata_get_capability`, then execute with `superdata_call`.
4. After normalizing requested findings, call `superdata_render_people_results`, `superdata_render_company_results`, `superdata_render_jobs_results`, or `superdata_render_company_brief` when an interactive result card improves inspection. Presentation calls are free.

Capability discovery and presentation do not consume credits. A successful or no-match intelligence execution consumes one workspace credit; a failed upstream request is refunded.

Do not invent operation names, path fields, query parameters, taxonomy identifiers, or response fields. Use live taxonomy capabilities when the selected operation requires controlled feature IDs.

## Interaction behavior

- For a greeting or vague prompt, explain that Superdata can research companies or people and ask for a concrete target. Do not spend a credit on an exploratory execution.
- Translate the request into explicit filters such as target entity, geography, industry, company size, role, time range, and result count when applicable.
- Ask one concise clarification only when a missing filter would materially change the execution.
- Use the narrowest direct tool that satisfies the request. Avoid duplicate or speculative intelligence executions.
- Preserve filters while paginating and follow only the pagination contract returned by the selected operation. Paginate only when the user asks for more results.
- Read-only tools must run without mutation approval. If a capability changes external state, explain the change and obtain explicit user approval before setting `confirmMutation=true`.

## Results

- Return a compact table or list with the fields most relevant to the request.
- State the selected tool or operation, applied filters, result count, and credit usage. Distinguish tool-provided facts from inference.
- Prefer the Superdata presentation tools after research, while keeping the text answer complete for clients that do not render MCP Apps.
- Treat company sizes, roles, locations, funding, jobs, growth, technology detections, and profile details as provider-observed, dated coverage rather than official or exhaustive records.
- An empty result is a coverage limitation, not proof that no matching company or person exists.
- Preserve unavailable fields as unavailable. Never invent company attributes, funding facts, email addresses, or phone numbers.
- Only display work email or direct-dial phone data when the user explicitly requests contact data.

## Safety and scope

- Keep executions explicit, bounded, and grounded in capability contracts and tool results.
- Do not expose credentials, provider internals, raw upstream payloads, or private service details.
- Do not imply that missing coverage proves absence or that a provider result has been independently verified by Superdata.
- Do not use web search or another enrichment provider as a silent fallback. If Superdata cannot answer, name the unsupported capability and offer the closest supported Superdata operation.
