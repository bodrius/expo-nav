---
name: react-native-best-practices
description: Advanced React Native and Expo engineering standards for architecture, performance, navigation, animations, gestures, lists, server state, testing, styling, and anti-patterns. Use automatically when implementing, reviewing, refactoring, or planning React Native screens, components, hooks, navigation, animations, video feeds, or app architecture.
---

# React Native + Expo Best Practices

## Core Principles

Prioritize readability, predictability, performance, maintainability, and type safety. Optimize for long-term maintainability.

## Mandatory Rules

### ALWAYS

- TypeScript strict typing; interfaces for props and public APIs
- Named exports only; functional components and hooks only
- Absolute imports via `@/`; early returns; thin screens
- Business logic outside UI; composition over configuration
- Derived state over duplicated state; reuse nearby patterns before new abstractions

### NEVER

- `any`, default exports, class components
- Fetch directly in screens; giant hooks, services, or components
- Deeply nested ternaries; index as list key
- React state for animations; secrets in `EXPO_PUBLIC_*`
- Speculative abstractions or dependencies without clear justification

## Architecture (FSD)

Layers: `app` (bootstrap, providers, navigation) → `pages` (route composition) → `widgets` → `features` → `entities` → `shared`.

One component per file; prefer files under ~200 lines; domain-specific folder names (not `helpers`, `misc`, `common`).

## Components & Screens

- Named arrow exports with `React.memo` when appropriate; `useCallback` for list rows and memoized children
- Screens: compose UI, connect hooks, navigate — no direct fetch, heavy transforms, or animation logic in screens

## State, Effects, Lists

- Local: `useState` / `useReducer`; server: TanStack Query; global: Zustand
- Do not use `useEffect` for filtering, sorting, or derived state — use `useMemo` during render
- FlashList for large feeds; stable `keyExtractor` and `renderItem`; `estimatedItemSize`; memoize rows

## Video Feeds

- One playing video at a time; pause on unfocus and during swipes
- Use `CachedVideo`; preload next videos intentionally; skeleton placeholders; cleanup on unmount

## Gestures, Styling, Navigation

- Reanimated + Gesture Handler; shared values on UI thread; avoid `PanResponder` unless requested
- `StyleSheet.create` or project styling system; avoid magic numbers and excessive inline styles
- Typed serializable route params; pass IDs not large objects; `useFocusEffect` for lifecycle

## Performance, API, Security, Testing

- Measure before broad optimization; avoid unstable inline props/callbacks and heavy render work
- `async/await` in services; explicit error handling; no silent catch blocks
- `expo-secure-store` for sensitive data; sanitize input; HTTPS for APIs
- Test business logic, hooks, loading/error/empty states, navigation contracts, video pause/resume

## Anti-Patterns To Flag

Class components; giant screens/hooks; fetch in screens; inline `renderItem`; unstable keys; multiple simultaneous videos; `useEffect` for derived state; deep relative imports into `src`; animation state in React state; generic `utils` / `helpers` folders.

## AI Behavior

Preserve architecture and contracts; reuse nearby abstractions; avoid overengineering and unnecessary dependencies; prefer editing existing files; keep implementations production-ready.

## Related Skills

Planning before implementation: [brainstorming-and-architecture](../brainstorming-and-architecture/SKILL.md)

Shared React 19 hooks, effects, state, and data fetching: [react-best-practices](../react-best-practices/SKILL.md)

## Additional Resources

Section-by-section GOOD/BAD examples and extended rules: [reference.md](reference.md)

Sources and bibliography: [README.md](README.md)
