# FOS-Bench Observatory

Blue academic dashboard for functional capability and human validity.

The public GitHub Pages frontend polls the existing public results API every 30 seconds. The benchmark server continues publishing new aggregate snapshots independently. No model calls, raw responses, credentials, or private configuration are included here. The publishing-time snapshot provides a fallback if the live API is temporarily unavailable.

## Develop and publish

Use Node.js 22.13 or newer. Run `npm ci`, then `npm run build`. Commit both the source and generated `docs/` directory. GitHub Pages publishes from `main` → `/docs`.

Evaluation protocols and scoring definitions are included under `app/methods/`. Historical summaries retain their original metrics, denominators, and scope. Scores from different protocols must not be combined into a single ranking.

Dataset introductions appear above each leaderboard with a plain-language task name, input materials, and the system's required action. The methods catalog covers 79 benchmark/protocol entries. All 75 Psych-101 experiment identifiers have separate explanations derived from their frozen instructions, retaining original identifiers and source hashes for traceability.
