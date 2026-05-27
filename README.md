# Expo Nav

Expo Nav is an Expo SDK 56 React Native application built with TypeScript and organized with Feature-Sliced Design (FSD).

The current app is a lightweight foundation for navigation-focused mobile development. It includes an app provider layer, a home page, gesture handler setup, safe area handling, Reanimated support, FlashList, and Expo SecureStore for secure local data storage.

## Tech Stack

- Expo SDK 56
- React 19
- React Native 0.85
- TypeScript
- React Native Gesture Handler
- React Native Reanimated
- React Native Safe Area Context
- FlashList
- Expo SecureStore

## Project Structure

```text
src/
  app/        # App entry, providers, global setup
  pages/      # Route-level screens
  widgets/    # Composed UI blocks
  features/   # User-facing actions and flows
  entities/   # Domain models and business entities
  shared/     # Reusable infrastructure, UI, libs, and config
```

The project follows FSD naming conventions. Use business-domain names for slices and purpose-based segment names such as `ui`, `api`, `model`, `lib`, and `config`.

## Getting Started

Install dependencies:

```sh
yarn install
```

Start the Expo development server:

```sh
yarn start
```

Run on a specific platform:

```sh
yarn ios
yarn android
yarn web
```

## Quality Checks

Run ESLint:

```sh
yarn lint
```

Run TypeScript checks:

```sh
yarn typecheck
```

Run the combined project check:

```sh
yarn check
```

## Environment Variables

Expo automatically exposes variables prefixed with `EXPO_PUBLIC_` to the client bundle.

Use `EXPO_PUBLIC_*` only for non-sensitive client configuration, such as public API base URLs. Do not store secrets, private keys, tokens, or credentials in bundled environment variables.

## Security

Use `expo-secure-store` for sensitive local values that must be stored on device. Communicate with APIs over HTTPS and keep authentication logic explicit and validated.
