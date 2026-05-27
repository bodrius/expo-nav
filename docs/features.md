# Features

## Product summary

**expo-nav** is a mobile app foundation focused on navigation-ready Expo development. The current build is intentionally small: a single home screen and shared app shell so new flows can be added using FSD slices.

## Screens

### Home

- **Path:** `src/pages/home/ui/HomeScreen.tsx`
- **Behavior:** Shows a centered welcome title inside a safe area layout.
- **Entry:** Rendered as the root screen from `src/app/App.tsx`.

## Planned extension points

When adding features, prefer:

1. New slice under `features/` or `entities/` for domain logic.
2. New `pages/` slice for route-level composition only.
3. Navigation registration in `app/` when routes grow beyond a single screen.

Document new screens and flows in this file when they ship.
