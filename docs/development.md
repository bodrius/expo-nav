# Development

## Prerequisites

- Node.js (LTS recommended)
- Yarn
- Expo Go or a simulator/emulator for iOS/Android

## Setup

```bash
yarn install
```

## Run the app

```bash
yarn start          # Expo dev server
yarn ios            # iOS
yarn android        # Android
yarn web            # Web
```

## Quality checks

| Command | Purpose |
|---------|---------|
| `yarn lint` | ESLint |
| `yarn typecheck` | TypeScript (`tsc --noEmit`) |
| `yarn test` | Jest unit/component tests |
| `yarn test:watch` | Jest watch mode |
| `yarn check` | `check:diff` + lint + typecheck + test |

Run a single test file:

```bash
yarn test src/pages/home/ui/HomeScreen.test.tsx
```

## Cursor agents

See [agents.md](./agents.md) for the full agent pipeline. Requirements: [requirements/](./requirements/). Plans: [plans/](./plans/).

## Project conventions

- TypeScript strict mode
- Named exports; functional components only
- Yarn for all scripts (not npm/npx unless explicitly required)
