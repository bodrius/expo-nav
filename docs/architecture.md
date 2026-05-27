# Architecture

## Overview

**expo-nav** uses [Feature-Sliced Design (FSD)](https://feature-sliced.design/) under `src/`. Business logic stays out of UI where possible; screens compose features and shared building blocks.

## Layer map

```text
src/
  app/        # Bootstrap, providers, global setup
  pages/      # Route-level screens (thin composition)
  widgets/    # Large reusable UI blocks
  features/   # User-facing actions and flows
  entities/   # Domain models and entities
  shared/     # Reusable UI, hooks, libs, config
```

**Dependency rule:** A layer may import only from layers **below** it (e.g. `pages` → `features` → `entities` → `shared`). Do not import upward across layers.

## Segments

Use conventional segment names inside slices:

| Segment | Purpose |
|---------|---------|
| `ui` | React components |
| `api` | HTTP clients, fetchers, DTO mapping |
| `model` | State, types, domain logic |
| `lib` | Pure helpers |
| `config` | Constants, feature flags |

Avoid generic folder names: `helpers`, `utils`, `misc`, `common`.

## Imports

- Use the `@/` alias for anything under `src/` (see `tsconfig.json` paths).
- Import order: React/RN → third-party → `@/` → relative (siblings only).

## App entry

- `index.ts` registers the root component with Expo.
- `src/app/App.tsx` wraps the tree in `AppProviders` and renders the current page (`HomeScreen`).
- `AppProviders` includes `GestureHandlerRootView` for gesture-handler support.

## Key libraries

| Library | Role |
|---------|---------|
| React Native Navigation | Native navigation (project dependency; wire-up evolves with features) |
| Reanimated + Gesture Handler | Animations and gestures (UI thread) |
| FlashList | High-performance lists |
| Expo SecureStore | Encrypted local storage for sensitive values |
| Safe Area Context | Safe area insets for screens |

## Testing layout

- Unit/component tests: co-located `*.test.tsx` next to source (e.g. `HomeScreen.test.tsx`).
- Jest preset: `jest-expo`; setup in `jest.setup.ts` at repo root.

## Further reading

- Project rules: `.cursor/rules/hard-execution-rules.mdc`
- RN patterns: `.cursor/skills/react-native-best-practices/`
