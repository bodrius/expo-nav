# Implementation plans

Store feature **implementation plans** (HOW) here. Product requirements (WHAT) live in [`../requirements/`](../requirements/) — create those with **requirements-planner** first.

Run **plan-verifier** on a plan before coding.

## Naming

```text
docs/plans/<feature-slug>.md
```

Example: `docs/plans/profile-screen.md`

## Required sections

Use this structure so **plan-verifier** and **implementator** can work without ambiguity:

```markdown
# [Feature name]

## Status
Draft | Approved | Implemented

## Goal
One sentence.

## Constraints & assumptions
- ...

## In scope / Out of scope
- In: ...
- Out: ...

## FSD placement
| Layer | Slice | Segments / files |
|-------|-------|------------------|
| ...   | ...   | ...              |

## File sketch
Concrete paths under `src/` (create / edit).

## Implementation phases
### Phase 1 — [name]
- [ ] Task 1 — ...
- [ ] Task 2 — ...

### Phase 2 — [name]
- [ ] ...

## Data & navigation
- Server state: ...
- Routes / params: ...

## Edge cases
- Loading / empty / error / offline / unmount: ...

## Security
- Storage, auth, env, input (if applicable): ...

## Test plan
- What to test (paths or behaviors): ...

## Verification
- `yarn lint`, `yarn typecheck`, `yarn test`, manual steps: ...

## Risks & open questions
- ...
```

## Workflow

1. **requirements-planner** — approved doc in `docs/requirements/`.
2. Draft plan from requirements (brainstorming or manually).
3. **plan-verifier** — pre-implementation review → fix blockers → mark **Approved**.
4. **implementator** — follow phases task-by-task.
5. **plan-verifier** (optional) — post-implementation drift check.
6. **test-writer** → **frontend-reviewer** → **security-reviewer** → **docs-writer**.

See [agents.md](../agents.md).
