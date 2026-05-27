# React Best Practices — Detailed Reference

React 19+ patterns for components, hooks, state, and data fetching. Read when implementing non-trivial UI logic.

---

## React 19 Features (HIGH)

### Actions & Form Handling

- **`useActionState`**: manages form submission state (`error`, `submitAction`, `isPending`) — replaces manual `useState` + `try/catch` for mutations
- **`<form action={fn}>`**: pass an Action function to `action`; React handles `FormData` extraction and can reset the form on success
- **`useFormStatus`**: read parent `<form>` pending state from child components (submit buttons, spinners) without prop drilling
- **`useOptimistic`**: show optimistic UI while the async Action runs; reverts on error

> React Native: Actions and forms apply primarily to **web** / `react-native-web`. Use platform-appropriate patterns on native.

### The `use` Hook

- `use(Context)` replaces `useContext(Context)` — unlike `useContext`, it can be called conditionally (inside `if` / loops)
- `use(Promise)` reads a Promise value during render — must be inside a **Suspense** boundary
- **Rule:** NEVER create the Promise during render — pass it from a parent, loader, or cache

### Document Metadata (web)

- React 19 hoists `<title>`, `<meta>`, and `<link>` rendered inside components into `<head>`
- Use for per-page SEO without external libraries

### Other React 19 Changes

- **ref cleanup**: effects that set refs can return a cleanup function
- **Context provider**: `<Context value={...}>` replaces `<Context.Provider value={...}>`
- **Stylesheet precedence**: `<link rel="stylesheet" precedence="..." />` for CSS load order (web)

---

## Hooks (CRITICAL)

### Rules of Hooks

- Only call hooks at the top level of React functions
- Only call hooks from React function components or custom hooks
- Do not call hooks inside loops, conditions, or nested functions

### useState

- Use functional updaters when the next state depends on the previous state
- Do not mutate state objects or arrays — always produce new references
- Colocate state with the smallest subtree that needs it

### useReducer

- Prefer for complex state with multiple related transitions
- Keep reducers pure — no side effects inside the reducer function
- Co-locate action types and reducer with the feature that owns the state

### useEffect

`useEffect` is an escape hatch for synchronizing with **external systems**, not a lifecycle method.

- Before writing `useEffect`, ask: is there an external system involved? If no, you probably do not need it
- ALWAYS return a cleanup function for subscriptions, listeners, and timers
- NEVER use `useEffect` to derive state from props/state — compute during render instead
- NEVER use `useEffect` + `useState` to transform data on render — use `useMemo` or compute inline
- NEVER ignore the dependency array — include all reactive values used inside
- NEVER suppress `eslint-disable react-hooks/exhaustive-deps` without fixing the underlying design issue

#### "You Might Not Need an Effect" — Common Traps

| Instead of... | Do this |
|---------------|---------|
| `useEffect` to derive/transform state from props | Compute inline during render or use `useMemo` |
| `useEffect` to reset state when a prop changes | Use `key` on the component to force a remount |
| `useEffect` to send analytics/POST on user action | Put it in the event handler, not an effect |
| `useEffect` to share logic between handlers | Extract a plain helper function, call from each handler |
| `useEffect` to subscribe to an external store | Use `useSyncExternalStore` |
| `useEffect` + `fetch` for data loading | Use TanStack Query (or a framework data loader) |

### useRef

- Use for DOM element access and mutable values that do not trigger re-renders
- NEVER read or write `ref.current` during render — only in effects and event handlers

### React 19: The Compiler & Memoization

- The React Compiler auto-memoizes in most cases — avoid manual `useMemo`, `useCallback`, and `memo` by default
- Only add manual memoization when profiling identifies an actual bottleneck
- Manual memoization is still needed for:
  - third-party libs requiring stable refs
  - effect dependencies that cause infinite loops
  - truly expensive computations with fast-changing external data
- If not using the React Compiler yet, `useMemo` is still valuable for genuinely expensive computations — but profile first

---

## Custom Hooks (HIGH)

- Extract to a custom hook when logic is reused across 2+ components OR when it improves readability by separating concerns
- One hook = one responsibility; avoid giant `useAppMagic` hooks
- Name with `use` prefix + clear description: `useDebounce`, `useLocalStorage`, `useOnlineStatus`
- Type all inputs and outputs (TypeScript) or document with JSDoc
- Return explicit objects for 3+ values; arrays are fine for simple `[value, setter]` pairs
- Handle production concerns: request cancellation (`AbortController`), stale request protection, cleanup, error states
- Keep one hook per file; group files by domain, not by hook type

### Data Fetching Hooks — Production Checklist

If building custom fetch hooks (instead of TanStack Query), they MUST handle:

- **AbortController** for request cancellation on unmount or dependency change
- **Stale closure protection** — check if the component is still mounted before `setState`

---

## State Management (HIGH)

### State Anti-Patterns

- NEVER use a single giant context; split by domain (auth, theme, UI state)
- NEVER mutate state objects directly; always produce new references
- NEVER put navigation functions or API instances into Context; import them where needed

### Push State Down, Lift Content Up

- Move state consumption as close as possible to components that render based on it
- If a parent does not influence child rendering, pass children as `children`
- Use the `key` prop to reset a child's entire state when its identity changes (e.g. `<Form key={selectedItemId} />`)

---

## Data Fetching (HIGH)

### TanStack Query (React Query)

- Use for all server state: caching, deduping, request cancellation
- NEVER fetch in `useEffect` + `useState` for production server data
- Use `useSuspenseQuery` with Suspense boundaries when appropriate
- Prefetch data (on hover, route transition) to avoid waterfalls
- Separate query key factories into a dedicated file
- Use the `select` option for data transformation

### Custom Fetch Hooks (without TanStack Query)

- ALWAYS use `AbortController` and pass the `signal` to fetch/axios
- Use a `cancelled` flag or `AbortController.signal.aborted` to prevent `setState` on stale responses
- NEVER return a value from a mutation hook that depends on async state (state will not be updated yet in the same cycle)

---

## Component Patterns

### Composition

- Prefer composition (`children`, render props, slots) over prop drilling
- Keep presentational components free of data-fetching logic
- Split large components by responsibility, not by line count alone

### Anti-Patterns

- Prop drilling through 4+ levels without composition or context split
- Components that both fetch and render complex UI
- Inline object/array/function props on memoized children without need

---

## TypeScript

- Strict typing for props, hooks, and public APIs
- Use `interface` for component props
- Narrow `unknown` from APIs safely
- Avoid `any` and unsafe double assertions

---

## Testing

- Test behavior and user-visible outcomes, not implementation details
- Cover loading, empty, and error states for async UI
- Test custom hooks with `@testing-library/react` hook utilities or dedicated hook tests
- Avoid snapshot spam for large trees

---

## AI Behavior

When generating React code:

- Prefer derived state and event handlers over effects
- Reuse existing hooks and query patterns before inventing new ones
- Match project export style (named exports)
- Do not add TanStack Query or other deps without justification
- For React Native, defer platform-specific rules to react-native-best-practices
