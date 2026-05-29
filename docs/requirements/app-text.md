# Feature: App Text

**Status:** Approved

**Summary:** A reusable text component and centralized typography/color system so all screens use consistent, adaptive text that can be updated globally from one place.

**Scope:** Mobile client

**References:**
- Design: None provided; sensible defaults for a greenfield Expo app
- Existing usage: Home screen welcome title uses raw platform text with inline color and size
- User request: Reusable text, quick global font/color changes, adaptive sizing across screen sizes

---

## 1. Purpose and placement

### 1.1 Why this exists

- All user-visible text in the app should look consistent without repeating raw size, weight, color, or font values on every screen.
- Designers and developers must be able to change typography and text colors app-wide by editing a single configuration, not hunting through individual screens.
- Text must remain readable on phones and tablets of different widths and when the user changes system accessibility settings.

### 1.2 Where it is used

- Any screen, modal, list item, button label, empty state, error message, or other surface that shows readable text.
- The Home welcome title is the first known consumer; future screens should use this component instead of raw platform text for standard copy.

### 1.3 Out of scope (for this feature)

- Rich text (mixed styles in one line), markdown rendering, or HTML.
- Icon-only labels, images of text, or text inside custom canvas/SVG.
- Server-driven typography or remote theme fetch.
- Dark mode / theme switching beyond defining tokens that a future theme can swap (tokens must be structured so a second theme can be added later without rewriting screens).

---

## 2. Typography variants (semantic presets)

### 2.1 Variant catalog

The app exposes a fixed set of **semantic variants**. Each variant maps to a preset combination of font family role, size, weight, line height, and default letter spacing. Screens choose meaning (e.g. “this is a page title”), not raw numbers.

| Variant   | Intended use (user-visible role)                          |
|-----------|-----------------------------------------------------------|
| `display` | Hero or marketing headline; largest emphasis              |
| `title`   | Screen or section title                                   |
| `subtitle`| Secondary heading under a title                           |
| `body`    | Default paragraph and general UI copy                     |
| `caption` | Supporting, de-emphasized copy (metadata, hints)          |
| `label`   | Short UI labels (tabs, chips, form field labels, buttons) |

### 2.2 Default appearance (baseline)

Until design tokens are customized, presets should read clearly on a typical phone (e.g. ~390pt width) with a sensible visual hierarchy:

- **display** — largest size, boldest weight in the scale.
- **title** — clearly smaller than display; suitable for one primary heading per screen.
- **subtitle** — between title and body; medium weight.
- **body** — comfortable reading size for multi-line text.
- **caption** — smaller than body; regular weight.
- **label** — compact, often single line; medium or semibold weight for legibility at small sizes.

Exact pixel values live in the central configuration (see §4), not on individual screens.

### 2.3 Variant selection behavior

- Every text instance has exactly one variant (explicit or default).
- **Default variant** when none is specified: `body`.
- Unknown or invalid variant values must not render broken text: fall back to `body` in development with a clear diagnostic, and to `body` silently in production if diagnostics are disabled.

---

## 3. Color tokens

### 3.1 Token catalog

Text color is chosen by **semantic color token**, not raw hex on each screen. Tokens are defined once and referenced by name.

| Token       | Intended use                                              |
|-------------|-----------------------------------------------------------|
| `primary`   | Default body and headings on standard backgrounds       |
| `secondary` | De-emphasized copy (captions, hints, metadata)            |
| `inverse`   | Text on dark or tinted backgrounds (e.g. buttons, banners)|
| `error`     | Validation and failure messages                           |
| `success`   | Positive confirmation copy (optional but reserved)        |
| `warning`   | Cautionary copy (optional but reserved)                     |
| `disabled`  | Non-interactive or inactive labels                        |

### 3.2 Default colors (baseline)

- **primary** — dark neutral suitable on white/light backgrounds (aligned with current home title feel).
- **secondary** — medium neutral gray.
- **inverse** — light neutral on dark surfaces.
- **error** — clearly distinguishable red tone accessible against light backgrounds.
- **success** / **warning** — distinct green and amber tones if used.
- **disabled** — reduced contrast vs secondary, still readable where required by platform guidelines.

### 3.3 Color selection behavior

- **Default color** when none is specified: `primary`.
- Color token resolves to a concrete value from the central palette (see §4).
- Unknown token: same fallback rules as unknown variant (`primary` + dev diagnostic).
- Token colors apply to the text glyph color only unless overridden by an allowed style override (§5).

---

## 4. Central configuration (fonts and colors)

### 4.1 Single source of truth

- **Font tokens** — family name(s) or roles (e.g. regular, medium, bold), base size steps per variant, weight per variant, line height, and letter spacing.
- **Color tokens** — hex or platform color values for each semantic text color in §3.
- **Scale factors** — parameters that drive adaptive sizing (§6).

Changing any token or scale parameter updates every screen that uses the component without editing individual files.

### 4.2 Font family behavior

- The app supports at least one default system or bundled font family for all variants.
- If custom fonts are added later, family names are defined only in the central configuration; screens continue to pass variants, not font file names.
- If a requested font fails to load, text falls back to the platform default family without crashing.

### 4.3 Customization workflow (developer-facing outcome)

- A developer can change “all titles are 2pt larger” or “primary text is brand blue” by editing the central config once.
- No screen should hardcode `fontSize`, `fontWeight`, `fontFamily`, or default text `color` for standard copy when this component is available.

---

## 5. Component behavior and props

### 5.1 Public controls (conceptual API)

Consumers can configure each text instance with:

| Control            | Required | Behavior |
|--------------------|----------|----------|
| `children`         | Yes      | Text content (string or nested text rules per platform) |
| `variant`          | No       | Semantic preset from §2; default `body` |
| `color`            | No       | Semantic color token from §3; default `primary` |
| `style`            | No       | Optional additional styles merged **after** preset styles; use sparingly for layout-only needs (margin, textAlign), not to redefine typography |
| Standard text props| No       | All supported platform text props pass through (e.g. `numberOfLines`, `ellipsizeMode`, `accessibilityRole`, `accessibilityLabel`, `onPress`, `selectable`, `testID`) |

### 5.2 Style merge rules

- Preset styles from variant + color apply first.
- Optional `style` override may adjust layout and non-typography properties freely.
- If `style` sets typography fields (`fontSize`, `fontWeight`, `fontFamily`, `color`, `lineHeight`), they override the preset for that instance only — this is an escape hatch, not the default pattern.
- Preset merge must not strip accessibility or interaction props from the underlying platform text.

### 5.3 Accessibility

- Component respects system **font scale** (Dynamic Type on iOS, font scale on Android): user-chosen text size increases or decreases rendered size on top of the adaptive base scale (§6).
- Text remains legible at maximum system font scale: lines wrap; clipping is avoided where `numberOfLines` is not set.
- When `numberOfLines` is set, truncation follows platform ellipsis behavior.
- `accessibilityLabel` and related props pass through unchanged.

### 5.4 Platform parity

- Same variant names and color token names on iOS, Android, and web.
- Visual weight may differ slightly per platform font metrics; hierarchy (display > title > … > caption) must remain obvious on all targets.

---

## 6. Adaptive / responsive sizing

### 6.1 Base adaptive scale (screen size)

- Font sizes for each variant are derived from a **base size** plus a **width-based scale factor** (e.g. reference width ~390pt).
- On narrower devices, sizes trend slightly smaller; on wider phones and tablets, slightly larger, within bounded min/max so copy does not become tiny or oversized.
- Scale curve should be smooth (no jumps at common breakpoints) and testable at representative widths (320, 390, 428, 768+).

### 6.2 Accessibility scale

- Final rendered size = adaptive base size × **system font scale** (capped at a reasonable maximum multiplier so layouts do not break catastrophically; document cap in implementation plan).
- Changing system text size in device settings updates text on next render without app restart.

### 6.3 Layout interaction

- Adaptive sizing applies to font size (and related line height where tied to variant preset).
- Horizontal margins and alignment remain the responsibility of parent layouts, not the text component.

### 6.4 Expected user-visible outcomes

| Condition              | Expected behavior                                      |
|------------------------|--------------------------------------------------------|
| Small phone            | Slightly smaller but readable hierarchy                |
| Large phone / tablet   | Slightly larger; hierarchy preserved                   |
| Large system font      | Text grows; multi-line content wraps                   |
| `numberOfLines={1}`    | Ellipsis when content exceeds width at any scale       |

---

## 7. States and edge cases

### 7.1 Content edge cases

- **Empty children** — renders nothing (no placeholder); no crash.
- **Very long unbroken strings** — wraps or truncates per `numberOfLines` / width.
- **Very long normal paragraphs** — wrap within parent width.
- **RTL locales** — text direction follows platform/locale when supported by underlying text.

### 7.2 Loading, error, empty feature states

- This component does not fetch data. Loading/error/empty **screens** use the same variants (`body`, `caption`, `error` color token) for their copy.
- No spinner or skeleton is part of this feature.

### 7.3 Offline and backgrounding

- No network dependency; appearance unchanged offline or when app returns from background.

---

## 8. Migration and adoption

- Home screen welcome title should use the new component with variant `title` (or `display` if product prefers stronger emphasis) and color `primary`, replacing inline styles.
- New screens should default to this component for static and dynamic text.
- Document new variants or color tokens in this requirements file before adding them to the catalog.

---

## Acceptance criteria

### Reuse and API

- [ ] A single shared text component is available for import across all FSD layers that need UI copy.
- [ ] Supports variants: `display`, `title`, `subtitle`, `body`, `caption`, `label` with default `body`.
- [ ] Supports color tokens: `primary`, `secondary`, `inverse`, `error`, `success`, `warning`, `disabled` with default `primary`.
- [ ] Passes through standard platform text props (`numberOfLines`, `accessibilityLabel`, `testID`, `onPress`, etc.) without loss.
- [ ] Optional `style` merges after presets; typography overrides are possible but documented as escape hatch only.

### Theming and global changes

- [ ] Font family, sizes, weights, and line heights for all variants are defined in one central configuration.
- [ ] Text colors for all tokens are defined in one central configuration.
- [ ] Changing a token value updates appearance on every screen using that token/variant without per-screen edits.
- [ ] Invalid variant or color falls back safely (`body` / `primary`) with developer-visible warning in dev builds.

### Adaptive behavior

- [ ] Font sizes scale with screen width within documented min/max bounds.
- [ ] System font scale (accessibility) multiplies rendered size and remains readable with wrapping.
- [ ] Visual hierarchy remains clear at 320pt width, ~390pt width, and tablet-width viewports.

### Accessibility and platforms

- [ ] Works on iOS, Android, and web targets supported by the Expo app.
- [ ] Respects system font scaling and accessibility props on underlying text.

### Adoption and tests

- [ ] Home screen title uses the component instead of raw platform text with inline typography/color.
- [ ] Unit tests cover: default variant/color, each major variant applies distinct styles, color token resolves correctly, invalid token/variant fallback, and that `testID` / children render.
- [ ] At least one test asserts adaptive or font-scale behavior (e.g. scaled size differs from base when scale factor ≠ 1) or documents snapshot/manual QA step in test plan if purely visual.

### Non-regression

- [ ] Existing Home screen test(s) updated to query the new component while still finding welcome copy.
- [ ] No new runtime dependency required solely for this feature unless justified in the implementation plan.

---

## Open questions (deferred to planning)

- Exact pixel values and font files (system vs bundled custom font).
- Maximum cap for system font scale multiplier.
- Whether `success` / `warning` tokens ship with real colors in v1 or as aliases to `primary` until designs exist.
- Dark mode token set (structure only in v1 vs full light/dark palettes).

---

## Suggested next steps

1. Draft `docs/plans/app-text.md` (FSD placement under `shared/`, config file shape, scaling formula).
2. Run **plan-verifier** on the plan.
3. Run **implementator** to build component, tokens, Home migration, and tests.
