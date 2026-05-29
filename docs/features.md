# Features

## Product summary

**expo-nav** is a mobile app foundation focused on navigation-ready Expo development. The current build is intentionally small: a single home screen and shared app shell so new flows can be added using FSD slices.

## Screens

### Home

- **Path:** `src/pages/home/ui/HomeScreen.tsx`
- **Behavior:** Shows a centered welcome title inside a safe area layout. The title uses `AppText` with variant `title` and color `primary`.
- **Entry:** Rendered as the root screen from `src/app/App.tsx`.

## Shared UI: AppText

Centralized semantic text for screens and features. Import from `@/shared/ui`.

| Concern | Location |
|---------|----------|
| Component | `src/shared/ui/AppText.tsx` |
| Typography presets | `src/shared/config/typography.ts` |
| Text color tokens | `src/shared/config/colors.ts` |
| Width + a11y scaling | `src/shared/lib/scaleFontSize.ts` |

### Variants

`display`, `title`, `subtitle`, `body` (default), `caption`, `label` — each preset defines base `fontSize`, `lineHeight`, `fontWeight`, and optional `letterSpacing` at reference width ~390pt.

### Colors

`primary` (default), `secondary`, `inverse`, `error`, `success`, `warning`, `disabled` — edit `textColors` in `colors.ts` for app-wide text color changes.

### Scaling and accessibility

- **Width:** `scaleFontSize` clamps `windowWidth / 390` between **0.85** and **1.15**, then applies to preset sizes.
- **System font scale:** Uses `PixelRatio.getFontScale()` capped at **2** so large accessibility settings still scale text without runaway sizes.
- **Double scaling:** `AppText` sets `allowFontScaling={false}` because sizes are computed manually.

Invalid `variant` or `color` props log a dev-only warning and fall back to `body` / `primary`.

### Usage

```tsx
import { AppText } from '@/shared/ui';

<AppText variant="title" color="primary" testID="home-title">
  Hello Expo Navigation
</AppText>
```

Standard React Native `Text` props (`numberOfLines`, `accessibilityLabel`, `onPress`, etc.) pass through. Optional `style` merges after the preset (overrides win).

### Adoption

Use `AppText` instead of raw `Text` for user-facing copy so typography and colors stay consistent. Home is the first migrated screen.

## Planned extension points

When adding features, prefer:

1. New slice under `features/` or `entities/` for domain logic.
2. New `pages/` slice for route-level composition only.
3. Navigation registration in `app/` when routes grow beyond a single screen.

Document new screens and flows in this file when they ship.
