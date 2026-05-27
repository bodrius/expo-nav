# Cursor agents

Subagents live in `.cursor/agents/`. Delegate from chat with:

```text
Use the <agent-name> subagent to <task>
```

## One-shot pipeline (recommended)

Instead of listing every agent, use a **slash command** or the orchestrator:

| Invoke | When |
|--------|------|
| `/feature` + опис feature | Повний цикл: requirements → plan → verify → code → tests → reviews → docs |
| `/ship-feature` + `@docs/requirements/...` `@docs/plans/...` | Лише код і review (документи вже Approved) |
| `Use the feature-pipeline subagent to …` | Те саме без slash (можна вказати `full` або `ship` mode) |

Commands live in [`.cursor/commands/`](../.cursor/commands/). Orchestrator: [`.cursor/agents/feature-pipeline.md`](../.cursor/agents/feature-pipeline.md).

**Note:** Cursor still runs one Agent session; the orchestrator **delegates** to subagents step by step. Use **Agent mode** (not Ask). Fix loops after review are automatic (up to 2 rounds).

## Agents

| Agent | When to use |
|-------|-------------|
| **requirements-planner** | Capture WHAT to build from designs/descriptions (conversational Q&A → `docs/requirements/`) |
| **plan-verifier** | Validate a plan in `docs/plans/` (or pasted) before coding; optional drift check after implementation |
| **implementator** | Build or change UI, hooks, screens, styling, navigation under `src/` |
| **frontend-reviewer** | Audit performance, architecture, flows, animations, FSD placement |
| **security-reviewer** | Find secrets leaks, storage, auth, networking, input risks |
| **test-writer** | Add tests, run `yarn test`, fix failures |
| **docs-writer** | Create or update `docs/` and README |

## Suggested flow

1. **requirements-planner** — approved doc in [`docs/requirements/`](./requirements/)
2. Draft plan in [`docs/plans/`](./plans/) from requirements (brainstorming skill or manual)
3. **plan-verifier** — pre-implementation review; revise until approved
4. **implementator** — implement the feature (follow the plan; requirements = product truth)
5. **plan-verifier** (optional) — confirm code matches the plan
6. **test-writer** — add/run tests (acceptance criteria in requirements)
7. **frontend-reviewer** — quality pass
8. **security-reviewer** — before merge (auth, env, storage)
9. **docs-writer** — update docs when behavior or setup changed

## Skills

Agents load project skills from `.cursor/skills/` (React, React Native, architecture). See [.cursor/skills/README.md](../.cursor/skills/README.md).
