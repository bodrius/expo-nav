# App Text

## Status
Approved

## Goal
Deliver a reusable `AppText` component with centralized typography/color tokens and width- plus accessibility-aware font scaling, then adopt it on Home.

## Constraints & assumptions
- Expo SDK 56, React Native 0.85, no new runtime deps (use RN `Text`, `PixelRatio`, `Dimensions` / `useWindowDimensions`).
- System fonts only in v1 (no custom font loading).
- `success` / `warning` ship with real placeholder colors; structure allows future theme swap.
- Max system font scale multiplier: **2** (cap via `Math.min(PixelRatio.getFontScale(), 2)`).
- Reference width for adaptive scale: **390**.
- Scale factor bounds: **0.85** (min) – **1.15** (max) relative to reference width.
- Width scale formula: `widthFactor = clamp(windowWidth / 390, 0.85, 1.15)`; `scaledSize = round(baseSize * widthFactor * min(fontScale ?? PixelRatio.getFontScale(), 2))`.

## In scope / Out of scope
- In: `AppText`, typography config, color palette, scale helper, Home migration, unit tests.
- Out: custom fonts, dark mode theme provider, rich text, remote themes.

## FSD placement

| Layer  | Slice | Segments / files |
|--------|-------|------------------|
| shared | ui    | `AppText.tsx`, `AppText.test.tsx` |
| shared | config| `typography.ts`, `colors.ts` |
| shared | lib   | `scaleFontSize.ts`, `scaleFontSize.test.ts` |
| pages  | home  | migrate `HomeScreen.tsx` |

## File sketch

```text
src/shared/config/colors.ts          # text color tokens
src/shared/config/typography.ts      # variant presets (base sizes, weights, line heights)
src/shared/lib/scaleFontSize.ts      # width + fontScale scaling
src/shared/lib/scaleFontSize.test.ts
src/shared/ui/AppText.tsx            # component
src/shared/ui/AppText.test.tsx
src/shared/ui/index.ts               # barrel export
src/shared/config/index.ts           # barrel export (optional)
src/pages/home/ui/HomeScreen.tsx     # use AppText variant title
src/pages/home/ui/HomeScreen.test.tsx # update queries
```

## Implementation phases

### Phase 1 — Tokens and scaling
- [ ] Add `colors.ts` with `TextColorToken` type and `textColors` record (`primary`, `secondary`, `inverse`, `error`, `success`, `warning`, `disabled`).
- [ ] Add `typography.ts` with `TextVariant` type and `typographyVariants` record (base `fontSize`, `lineHeight`, `fontWeight`, optional `letterSpacing`).
- [ ] Add `scaleFontSize(baseSize, windowWidth, fontScale?)` using reference width 390, clamp width factor 0.85–1.15, multiply by capped font scale (max 2).

### Phase 2 — AppText component
- [ ] Create `export const AppText = React.memo(...)` wrapping RN `Text`.
- [ ] Type as `TextProps` + `variant?` / `color?`; spread `...rest` onto `Text` (`numberOfLines`, `accessibilityLabel`, `testID`, `onPress`, etc.).
- [ ] Resolve variant/color with dev-only `console.warn` on invalid keys; fallback `body` / `primary`.
- [ ] Use `useWindowDimensions()` for width; apply scaled `fontSize` and proportional `lineHeight`; apply `letterSpacing` when defined on preset.
- [ ] Set `allowFontScaling={false}` when font size is computed manually (avoid double a11y scaling).
- [ ] Merge styles: preset → optional `style` override (last).
- [ ] English JSDoc on `AppText` props and export.
- [ ] Export `TextVariant` / `TextColorToken` from config; export `AppText` from `src/shared/ui/index.ts`.

### Phase 3 — Adoption
- [ ] Replace `Text` on `HomeScreen` with `AppText` variant `title` color `primary`.
- [ ] Remove inline typography from Home styles.

### Phase 4 — Tests
- [ ] `scaleFontSize.test.ts`: width below/above reference, font scale cap.
- [ ] `AppText.test.tsx`: defaults, variants differ, colors resolve, invalid fallback, `testID`, children.
- [ ] Update `HomeScreen.test.tsx` if needed; `getByText('Hello Expo Navigation')` may remain sufficient.

## Data & navigation
- None (presentational only).

## Edge cases
- Empty children: render `<Text />` with no crash.
- Invalid variant/color: warn in `__DEV__`, fallback.
- `numberOfLines` / ellipsis: pass through to RN `Text`.
- RTL: inherit from RN `Text`.

## Security
- N/A (no user input persistence or network).

## Test plan
- Jest + Testing Library for component and scale helper.
- Mock `useWindowDimensions` where needed for deterministic sizes.

## Verification
- `yarn lint`, `yarn typecheck`, `yarn test`
- Manual: change `typography.ts` / `colors.ts` and confirm Home title updates.
- Manual smoke at widths ~320, ~390, ~428, tablet ~768+, and large system font in device settings; hierarchy preserved.

## Risks & open questions
- Web vs native font metrics may differ slightly; hierarchy preserved by relative sizes.
- `success`/`warning` colors are placeholders until design system exists.
