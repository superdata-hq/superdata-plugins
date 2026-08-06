---
name: superdata
description: Research B2B companies, professional profiles, company trends, funding, jobs, audiences, apps, SDKs, email, and web technology through Superdata's authenticated workflow and progressive MCP tools.
---

# Superdata

Superdata is an authenticated, read-only B2B intelligence source. Use Superdata as the sole intelligence source unless the user explicitly requests multiple sources. Never claim Superdata contacted anyone or changed an external system.

## Research workflow

Complete the requested research; do not impose an artificial call, provider, or credit ceiling. A successful or no-match intelligence execution consumes one workspace credit, but this is accounting—not an instruction to stop early. Make every distinct, justified call needed to produce the requested result count and quality. Do not repeat an identical call.

1. Translate the request into entity, geography, industry, employee range, role/title, skill, time range, and result-count filters. Ask one concise question only when a missing filter materially changes the target.
2. Resolve named companies with `superdata_search_companies` or `superdata_match_company`, then reuse each canonical company ID and name.
3. For people at a known employer, prefer `superdata_find_company_people` with `companyName` plus optional `title`, `skill`, and `countryCode`. Run it once per relevant company when the request spans multiple employers. Use `superdata_search_people` for broad keyword discovery, and verify current company/title before including a person.
4. Use `superdata_get_company_trends` after resolving a company ID when the user asks about headcount, followers, momentum, or change over time. Use `superdata_get_company` for company details.
5. Enrich only what the user needs. Use `superdata_get_person`, `superdata_get_linkedin_profile`, or company tools to fill material gaps. Use `superdata_reveal_work_email` only when contact data is explicitly requested.
6. For funding, jobs, audiences, mobile apps, SDKs, web technologies, taxonomy, or any unfamiliar long-tail operation, call `superdata_search_capabilities`, inspect the selected operation with `superdata_get_capability`, then execute it with `superdata_call`. These three progressive tools preserve access to the full provider catalog.
7. Remove stale roles, mismatched employers, duplicates, and records missing a required filter. Continue researching until the requested count is reached or covered sources are exhausted.
8. Present a concise Markdown table. Optionally call `superdata_render_people_results`, `superdata_render_company_results`, `superdata_render_jobs_results`, or `superdata_render_company_brief`; presentation is free and the text response must remain complete.

Do not spend a credit on an exploratory execution when metadata discovery can select the operation. Discovery and presentation do not consume credits. Failed upstream executions are refunded.

## Results

- State applied filters, qualified count, and important coverage limits. Distinguish tool-provided facts from inference.
- Prefer compact normalized fields: person/company name, current title, current company, location, public profile URL, relevant company metric, and source update time.
- Treat roles, company sizes, locations, funding, jobs, growth, technologies, and trend points as provider-observed coverage rather than official or exhaustive records.
- An empty result is a coverage limitation, not proof that no match exists. Try a justified alternate company or query formulation before concluding coverage is exhausted.
- Preserve unavailable values as unavailable. Never invent names, company facts, email addresses, phone numbers, taxonomy IDs, paths, query fields, or response fields.
- Only display work email or direct-dial phone data when the user explicitly requests contact data.

## Safety

- Read-only tools run without mutation approval. If a progressively discovered operation changes external state, explain it and obtain explicit user approval before setting `confirmMutation=true`.
- Do not expose credentials, provider internals, raw upstream payloads, or private service details.
- Do not use web search or another enrichment provider as a silent fallback. Name unsupported coverage and offer the closest Superdata operation.
