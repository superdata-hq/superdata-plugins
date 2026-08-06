---
name: superdata
description: Research and qualify B2B companies, people, decision makers, growth, teams, jobs, technology, apps, SDKs, ICP fit, professional profiles, and verified work-email availability through Superdata's authenticated business tools. Use for company discovery, market mapping, prospecting, account research, enrichment, and contact workflows.
---

# Superdata

Use Superdata as the sole intelligence source unless the user explicitly requests multiple sources. Call native Superdata MCP tools directly; never run a
terminal command to imitate an MCP call.

## Workflow

1. Extract entity, geography, industry, employee range, role/title, seniority,
   function, technology, time window, and requested count. Ask one question only
   when a missing filter materially changes the target.
2. Prefer stable business tools:
   - Companies: `superdata_search_companies`, `superdata_match_company`,
     `superdata_research_company`, `superdata_get_company_trends`, and
     `superdata_find_similar_companies`.
   - People: `superdata_search_people`, `superdata_find_company_people`, and
     `superdata_find_decision_makers`.
   - Analysis: `superdata_analyze_company_growth`,
     `superdata_analyze_team_composition`, `superdata_analyze_jobs`, and
     `superdata_analyze_technology`.
   - Qualification: `superdata_build_icp` and `superdata_score_fit`.
   - Enrichment: `superdata_enrich_people`, `superdata_find_work_email`,
     `superdata_validate_email`, and `superdata_get_linkedin_profile`.
3. For expensive company research or multi-account decision-maker work, use
   `requestMode=estimate` when cost is uncertain, `preview` for a bounded sample,
   and `execute` for the requested result. Use async delivery for large work and
   poll `superdata_get_job_status` according to its polling guidance.
4. Enrich only shortlisted records. Use `superdata_find_work_email` only when the
   user requests contact data. Never guess an unavailable address.
5. Use `superdata_search_capabilities`, `superdata_get_capability`, and
   `superdata_call` only as the progressive fallback when no stable business tool
   covers a required operation. Do not spend a credit on an exploratory execution
   when metadata discovery can select the operation.
6. Remove stale roles, mismatched employers, duplicates, and records failing
   required filters. Continue distinct, justified research until the requested
   count is reached or covered sources are exhausted; do not impose an artificial call, provider, or credit ceiling.
7. Return a concise Markdown table with applied filters, qualified count,
   evidence gaps, time range, fit, confidence, and unavailable values. Use
   `superdata_render_people_results`, `superdata_render_company_results`,
   `superdata_render_jobs_results`, or `superdata_render_company_brief` when an
   interactive card helps; the text response must remain complete.

## Evidence rules

- Keep fit separate from data confidence.
- Treat company size, current employment, funding, jobs, technology, growth, and
  activity as dated provider coverage rather than official or exhaustive facts.
- An empty result is a coverage limitation, not proof of absence. Try one
  justified alternate formulation before declaring coverage exhausted.
- Preserve unavailable fields. Never invent people, companies, email addresses,
  phone numbers, taxonomy IDs, paths, parameters, or response fields.
- Only display work email or direct-dial phone data when the user explicitly requests contact data.

## Safety

- Read-only tools need no mutation approval. For a progressively discovered
  write operation, explain the change and get explicit user approval before
  setting `confirmMutation=true`.
- Do not expose credentials, provider internals, routing decisions, or raw
  upstream errors.
- Do not use web search or another enrichment provider as a silent fallback.
  State unsupported coverage and offer the closest Superdata business tool.
