# Feature requirements

Product requirements (**WHAT** to build) live here. They are written by **requirements-planner** before implementation plans or code.

| Artifact | Folder | Focus | Owner agent |
|----------|--------|-------|-------------|
| Requirements | `docs/requirements/` | User-visible behavior, states, acceptance criteria | **requirements-planner** |
| Implementation plan | `docs/plans/` | FSD, files, phases, technical HOW | brainstorming / manual → **plan-verifier** |

## Naming

```text
docs/requirements/<feature-slug>.md
```

Example: `docs/requirements/profile-screen.md`

## Workflow

1. **requirements-planner** — conversational Q&A → approved requirements doc
2. Draft `docs/plans/<feature-slug>.md` from requirements (brainstorming skill or manual)
3. **plan-verifier** → **implementator** → tests & reviews (see [agents.md](../agents.md))

## Status

- **Draft** — work in progress; do not implement yet
- **Approved** — user confirmed Phase 3 summary; safe to plan and build against

## Minimal template

```markdown
# Feature: [Name]

**Status:** Draft

**Summary:** ...

**Scope:** Mobile client | API | Both

**References:**
- Design: ...

---

## 1. ...

- ...

---

## Acceptance criteria

### [Category]

- [ ] ...
```

See [.cursor/agents/requirements-planner.md](../../.cursor/agents/requirements-planner.md) for full question categories and rules.
