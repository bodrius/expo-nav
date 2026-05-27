---
name: react-best-practices
description: React 19 hooks, state, effects, data fetching, custom hooks, memoization, and anti-patterns for TypeScript apps. Use automatically when writing or reviewing React components, hooks, context, forms, server state, or React 19 APIs in web or React Native codebases.
---

# React Best Practices & Anti-Patterns

Applies to React 19+ (this project uses React 19). For React Native-specific rules (lists, navigation, Reanimated), also follow [react-native-best-practices](../react-native-best-practices/SKILL.md).

## React 19 (HIGH)

- **Actions**: `useActionState`, `<form action={fn}>`, `useFormStatus`, `useOptimistic` for mutations (web; RN web where forms apply)
- **`use` hook**: `use(Context)` can be conditional; `use(Promise)` needs Suspense — never create the Promise during render
- **Context**: prefer `<Context value={...}>` over `<Context.Provider>`
- **Metadata** (web): `<title>`, `<meta>`, `<link>` hoist to `<head>` per route

## Hooks (CRITICAL)

### Rules

- Call hooks only at the top level of function components or custom hooks
- Never in loops, conditions, or nested functions

### useState / useReducer

- Functional updaters when next state depends on previous
- Never mutate state; return new references from reducers

### useEffect

- Escape hatch for **external systems** only (subscriptions, timers, DOM, native modules)
- Always return cleanup for subscriptions/listeners/timers
- Never derive state from props/state in effects — compute during render or `useMemo`
- Never `useEffect` + `fetch` + `useState` for server data in production
- Never suppress `exhaustive-deps` without fixing the design

### useRef

- DOM refs and mutable values that must not trigger re-renders
- Never read/write `ref.current` during render — only in effects and event handlers

### Memoization (React 19 Compiler)

- Prefer compiler auto-memoization; avoid manual `memo` / `useMemo` / `useCallback` by default
- Add manual memoization only after profiling: stable refs for libs, effect dep loops, truly expensive work

## Custom Hooks (HIGH)

- Extract when reused in 2+ places or to separate concerns; one responsibility per hook
- Name with `use` + clear intent; type inputs/outputs
- Production fetch hooks: `AbortController`, stale-response guards, cleanup, error states
- One hook per file; group by domain

## State & Data (HIGH)

- Split context by domain; never mutate context state in place
- Do not put navigators or API clients in Context — import where needed
- Push state down; reset child state with `key` when identity changes
- **Server state**: TanStack Query (preferred) — not `useEffect` + `useState` fetch
- Custom fetch without Query: always pass `signal`, guard stale `setState`

## Effect Alternatives

| Instead of | Do |
|------------|-----|
| Effect to derive state from props | Render-time compute or `useMemo` |
| Effect to reset on prop change | `key` on child to remount |
| Effect for analytics on action | Event handler |
| Effect to subscribe to store | `useSyncExternalStore` |
| Effect + fetch for data | TanStack Query or loader |

## Anti-Patterns To Flag

Giant context; fetch in `useEffect` for server data; derived state in effects; god-hooks; default exports; `any`; ignoring effect deps; reading refs during render; premature `useMemo` everywhere

## Additional Resources

Full rules, tables, and examples: [reference.md](reference.md)

Sources and bibliography: [README.md](README.md)
