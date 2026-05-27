---
name: brainstorming-and-architecture
description: Helps generate ideas, architectures, UX flows, feature concepts, naming, product improvements, and implementation strategies for React Native, Expo, SaaS, and startup work. Guides trade-off analysis and FSD planning before coding. Use when brainstorming, designing systems, comparing approaches, planning features, validating technical decisions, or mapping code to src layers.
---

# Brainstorming & Architecture

Use this skill **before** large implementations. Prefer planning over coding until the approach is agreed (or the user explicitly asks to implement).

After a plan is chosen, follow [react-best-practices](../react-best-practices/SKILL.md) and [react-native-best-practices](../react-native-best-practices/SKILL.md) for implementation.

## When To Use

- Brainstorming features or product ideas
- Planning architecture or designing systems
- Improving UX, onboarding, or flows
- Comparing approaches or validating technical decisions
- Naming features, slices, or APIs
- Exploring implementation options for React Native / Expo apps
- Scoping MVPs, phases, or PRs
- "Where does this go in FSD?" or "How should we build X?"

## Core Thinking Principles

Always optimize for:

1. Simplicity
2. Scalability
3. Developer Experience
4. User Experience
5. Maintainability
6. Performance
7. Fast Iteration

Prefer practical production-ready solutions over theoretical perfection.

## Workflow

1. **Clarify** — goal, users, constraints, non-goals, existing code to reuse
2. **Constraints** — Expo SDK 56, FSD layers, Yarn, no new deps without justification
3. **Options** — multiple viable approaches (not one false choice)
4. **Trade-offs** — pros, cons, risks, effort, maintenance, scalability, DX
5. **Recommend** — one clear default with rationale (after exploring alternatives)
6. **Map to FSD** — slices, segments (`ui`, `api`, `model`, `lib`, `config`), file sketch
7. **Phases** — ordered steps; what can ship independently (MVP-first)
8. **Confirm** — implement, refine, or switch to Plan mode

## Brainstorming Rules

### ALWAYS

- Generate multiple approaches; explain tradeoffs
- Start with the simplest viable solution; think about scaling later
- Reuse existing ecosystem and project patterns first
- Consider developer ergonomics and mobile UX constraints
- Think in systems, not isolated screens
- Suggest reusable patterns
- Consider offline, loading, and error states early
- Think about edge cases and future maintainability
- Read nearby code and `package.json` before proposing structure
- Align with FSD: `app` → `pages` → `widgets` → `features` → `entities` → `shared`
- Prefer extending existing slices over new parallel abstractions
- State assumptions explicitly when requirements are incomplete

### NEVER

- Jump straight to code for ambiguous architecture asks
- Lock into one solution before listing alternatives
- Propose god components, god services, god-hooks, or giant contexts
- Add dependencies without why and what alternative was rejected
- Invent slices named `utils`, `helpers`, `common`, or `misc`
- Over-engineer for hypothetical future problems

## Product Thinking

When brainstorming features, think about:

- User pain points, onboarding friction, retention, engagement loops
- Empty states, loading experience, perceived performance
- Simplicity, discoverability, monetization opportunities
- Mobile-first UX and accessibility

Avoid: feature bloat, overengineering, unnecessary complexity, enterprise patterns for early-stage apps, settings for everything, forcing users to think too much.

## Architecture Thinking

### Prefer

- Modular, feature-based structure (FSD in this repo)
- Reusable business logic outside UI
- Typed APIs, scalable navigation, isolated domains
- Predictable state management (local / TanStack Query / Zustand)

### Avoid

- God components and god services
- Tightly coupled features
- Premature microservices
- Deeply nested dependencies
- Unnecessary abstractions

## React Native / Expo Thinking

### Prefer

- Expo SDK solutions (SDK 56 in this project)
- Native-feeling UX, smooth animations (Reanimated + Gesture Handler)
- Lightweight dependencies; FlashList for large lists
- Optimistic UI, skeleton loading, server-state separation
- Thin screens; business logic in `features` / `entities`

### Avoid

- Web-first UX patterns on native
- Unnecessary native modules
- Blocking renders, giant screens, heavy navigation nesting

## UI/UX Brainstorming

### Prioritize

- Clarity, visual hierarchy, touch ergonomics, accessibility
- Thumb-friendly interactions, low cognitive load
- Fast interactions and perceived speed

### Suggest

- Microinteractions, gesture improvements, purposeful animations
- Loading placeholders, onboarding improvements
- Empty state and retention ideas

## Technical Decision Rules

When comparing approaches, **always include**:

- Pros and cons
- Scalability impact
- Developer complexity
- Performance implications
- Maintenance cost
- Implementation difficulty

Prefer boring stable solutions, ecosystem-standard libraries, predictable patterns, maintainable code.

## Naming

### Prefer

- Short, memorable, easy-to-pronounce names
- Scalable naming systems and consistent patterns (FSD slices by domain)

### Avoid

- Generic, overly technical, or hard-to-spell names
- Trendy buzzwords

## Startup / Product Mindset

Prefer: MVP-first thinking, fast iteration, shipping quickly, validating assumptions early, reducing engineering overhead, maximizing learning speed.

Avoid: premature scaling, over-architecting MVPs, building infrastructure too early, unnecessary optimization.

## AI Response Style

Responses should be structured, actionable, and concrete — with realistic tradeoffs, not vague advice.

When brainstorming:

- Generate multiple ideas first, then narrow to the best recommendation
- Avoid immediately locking into one solution
- Think creatively but realistically
- Ask clarifying questions only if necessary; otherwise propose assumptions
- Suggest alternatives proactively; identify hidden risks and simpler paths
- Think like a senior product engineer

## Output Template

Use unless the user requests another format:

```markdown
## Goal
[One sentence]

## Constraints & assumptions
- ...

## Options
### Option A — [name]
- Pros: ...
- Cons: ...
- Risk: ...

### Option B — [name]
...

## Recommendation
[Chosen option + why]

## FSD placement
| Layer | Slice | Segments / files |
|-------|-------|------------------|
| ...   | ...   | ...              |

## Implementation phases
1. ...
2. ...

## Open questions
- ...
```

## FSD Quick Reference

| Layer | Put here |
|-------|----------|
| `app` | Providers, navigation shell, bootstrap |
| `pages` | Route screens — compose only |
| `widgets` | Large reusable UI blocks |
| `features` | User actions and flows |
| `entities` | Domain models, entity UI/API |
| `shared` | Cross-cutting UI kit, libs, config |

Import rule: `@/` alias for `src/**`; no deep `../../../` into `src`.

## Decision Checklist

- [ ] Fits existing slices and naming?
- [ ] Screens stay thin (no fetch/business logic in `pages`)?
- [ ] Server state strategy clear (TanStack Query vs local)?
- [ ] Navigation params serializable (IDs, not large objects)?
- [ ] Lists/video/gestures need RN performance rules?
- [ ] Secrets only via `expo-secure-store`, never `EXPO_PUBLIC_*`?
- [ ] Test plan for critical paths?

## Anti-Patterns To Flag

- Feature creep, overengineering, unnecessary abstractions
- Complex onboarding, unclear UX, duplicated systems
- Tightly coupled architecture, poor mobile ergonomics
- Too many dependencies, solving hypothetical future problems
- Premature optimization, vague advice without tradeoffs

## Additional Resources

Templates, ADR format, FSD examples, diagrams: [reference.md](reference.md)

Sources: [README.md](README.md)
