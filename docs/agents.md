# Cursor agents

Subagents live in `.cursor/agents/`. Delegate from chat with:

```text
Use the <agent-name> subagent to <task>
```

## Agents

| Agent | When to use |
|-------|-------------|
| **implementator** | Build or change UI, hooks, screens, styling, navigation under `src/` |
| **frontend-reviewer** | Audit performance, architecture, flows, animations, FSD placement |
| **security-reviewer** | Find secrets leaks, storage, auth, networking, input risks |
| **test-writer** | Add tests, run `yarn test`, fix failures |
| **docs-writer** | Create or update `docs/` and README |

## Suggested flow

1. **implementator** — implement the feature
2. **test-writer** — add/run tests
3. **frontend-reviewer** — quality pass
4. **security-reviewer** — before merge (auth, env, storage)
5. **docs-writer** — update docs when behavior or setup changed

## Skills

Agents load project skills from `.cursor/skills/` (React, React Native, architecture). See [.cursor/skills/README.md](../.cursor/skills/README.md).
