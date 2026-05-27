# Project Skills

Cursor **Agent Skills** in this folder teach the agent project-specific engineering standards. They load automatically when the task matches each skill's `description` in `SKILL.md` frontmatter (no `@mention` required unless you set `disable-model-invocation: true` on a skill).

Skills complement [.cursor/rules/hard-execution-rules.mdc](../rules/hard-execution-rules.mdc) (always-on workspace rules). Rules enforce tooling and FSD conventions; skills add deeper React / React Native guidance and anti-patterns.

## Skills Index

| Skill | Use when | Entry point |
|-------|----------|-------------|
| [brainstorming-and-architecture](./brainstorming-and-architecture/SKILL.md) | Planning, design, trade-offs, FSD placement, feature scoping before code | [SKILL.md](./brainstorming-and-architecture/SKILL.md) |
| [react-best-practices](./react-best-practices/SKILL.md) | Components, hooks, effects, context, server state, React 19 APIs | [SKILL.md](./react-best-practices/SKILL.md) |
| [react-native-best-practices](./react-native-best-practices/SKILL.md) | Expo/RN screens, lists, gestures, navigation, video feeds, app architecture | [SKILL.md](./react-native-best-practices/SKILL.md) |

**Typical flow:** `brainstorming-and-architecture` → agree plan → implement with `react-best-practices` + `react-native-best-practices`.

## Folder Layout

Each skill is a directory with:

```txt
skill-name/
├── SKILL.md       # Required — concise rules + YAML frontmatter (keep under ~500 lines)
├── reference.md   # Optional — detailed examples and GOOD/BAD patterns
└── README.md      # Optional — bibliography and external source links
```

## brainstorming-and-architecture

**Scope:** Pre-implementation brainstorming, architecture options, trade-offs, FSD file mapping, phased delivery, ADR-style decisions.

| File | Purpose |
|------|---------|
| [SKILL.md](./brainstorming-and-architecture/SKILL.md) | Workflow, output template, FSD checklist |
| [reference.md](./brainstorming-and-architecture/reference.md) | ADR template, mermaid examples, phasing, placement examples |
| [README.md](./brainstorming-and-architecture/README.md) | [Sources](./brainstorming-and-architecture/README.md) — FSD, ADR, C4, Shape Up |

## react-best-practices

**Scope:** React 19 hooks, state, effects, custom hooks, memoization (Compiler), TanStack Query patterns, testing and security basics.

| File | Purpose |
|------|---------|
| [SKILL.md](./react-best-practices/SKILL.md) | Short checklist the agent loads first |
| [reference.md](./react-best-practices/reference.md) | Extended rules, effect-alternatives table, fetch hook checklist |
| [README.md](./react-best-practices/README.md) | [Sources](./react-best-practices/README.md) — react.dev, TanStack Query, Testing Library, etc. |

**Stack note:** This repo uses **React 19.2** (see root `package.json`).

## react-native-best-practices

**Scope:** Expo SDK 56, React Native performance, Feature-Sliced Design, FlashList, Reanimated, Gesture Handler, navigation lifecycle, video feed conventions, API/security/testing for mobile.

| File | Purpose |
|------|---------|
| [SKILL.md](./react-native-best-practices/SKILL.md) | Short checklist the agent loads first |
| [reference.md](./react-native-best-practices/reference.md) | Full GOOD/BAD examples per topic |
| [README.md](./react-native-best-practices/README.md) | [Sources](./react-native-best-practices/README.md) — Expo, RN, FlashList, Reanimated, FSD, etc. |

**Stack note:** Expo ~56, React Native 0.85, FlashList, Reanimated 4, React Native Navigation (see root `package.json`).

**Project-only conventions** (documented in the RN skill, not from a single external spec): `CachedVideo`, single active video playback, preload next two videos, skeleton placeholders while caching.

## How Auto-Apply Works

1. Cursor reads `name` and `description` from each `SKILL.md` frontmatter.
2. If the user task matches the description (e.g. "refactor this screen", "review hooks"), the skill is included in context.
3. The agent should read `reference.md` when it needs examples or edge-case detail.
4. Use `README.md` in each skill when verifying rules against official docs.

**Do not** put `globs` or `alwaysApply` in skill frontmatter — those belong in `.cursor/rules/*.mdc`.

**Optional:** Add `disable-model-invocation: true` to a skill's frontmatter to require explicit `@skill-name` invocation only.

## Adding a New Skill

1. Create `.cursor/skills/<skill-name>/SKILL.md` with valid YAML frontmatter (`name`, `description`).
2. Keep `SKILL.md` concise; move long examples to `reference.md`.
3. Add `README.md` with categorized source links.
4. Update this file's index table.

Use the Cursor **create-skill** skill or [Cursor Docs → Agent Skills](https://cursor.com/docs) when authoring new skills.

## Related Configuration

- [hard-execution-rules.mdc](../rules/hard-execution-rules.mdc) — TypeScript, FSD, Yarn, ESLint, commit format, security
- Root [package.json](../../package.json) — dependency versions for doc links
