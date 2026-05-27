# React Native Best Practices Skill — Sources

This skill combines Expo/React Native official guidance, library docs used in this repo, Feature-Sliced Design, and performance patterns from the React Native community. See [SKILL.md](SKILL.md) and [reference.md](reference.md) for the condensed rules.

**Project stack (for versioned docs):** Expo SDK 56, React 19, React Native 0.85, FlashList, Reanimated 4, Gesture Handler, React Native Navigation.

## Expo & React Native Core

- [Expo documentation (SDK 56)](https://docs.expo.dev/versions/v56.0.0/)
- [React Native – Environment setup](https://reactnative.dev/docs/environment-setup)
- [React Native – Performance](https://reactnative.dev/docs/performance)
- [React Native – Style](https://reactnative.dev/docs/style)
- [React Native – Threading model](https://reactnative.dev/architecture/threading-model)
- [React Native – Optimizing FlatList configuration](https://reactnative.dev/docs/optimizing-flatlist-configuration)
- [Expo – Security guide](https://docs.expo.dev/guides/security/)
- [Expo – Environment variables](https://docs.expo.dev/guides/environment-variables/)

## Architecture (FSD)

- [Feature-Sliced Design – Overview](https://feature-sliced.design/docs/get-started/overview)
- [Feature-Sliced Design – Layers](https://feature-sliced.design/docs/reference/layers)
- [Feature-Sliced Design – Slices and segments](https://feature-sliced.design/docs/reference/slices-segments)

## Lists & Scrolling

- [Shopify FlashList – Documentation](https://shopify.github.io/flash-list/docs/)
- [Shopify FlashList – Performance](https://shopify.github.io/flash-list/docs/fundamentals/performant-components)
- [Shopify FlashList – Estimated item size](https://shopify.github.io/flash-list/docs/fundamentals/estimated-item-size)

## Gestures & Animations

- [React Native Reanimated – Docs](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/)
- [React Native Reanimated – Shared values](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/glossary/#shared-value)
- [React Native Reanimated – runOnJS](https://docs.swmansion.com/react-native-reanimated/docs/threading/runOnJS/)
- [React Native Gesture Handler – Docs](https://docs.swmansion.com/react-native-gesture-handler/docs/)
- [React Native – Animations](https://reactnative.dev/docs/animations)

## Navigation

- [React Navigation – Getting started](https://reactnavigation.org/docs/getting-started)
- [React Navigation – TypeScript](https://reactnavigation.org/docs/typescript)
- [React Navigation – Screen lifecycle](https://reactnavigation.org/docs/navigation-lifecycle)
- [React Navigation – `useFocusEffect`](https://reactnavigation.org/docs/use-focus-effect)
- [React Navigation – Deep linking](https://reactnavigation.org/docs/deep-linking)
- [React Native Navigation – Docs](https://wix.github.io/react-native-navigation/docs/before-you-start/) *(this repo lists `react-native-navigation`)*

## State & Data

- [TanStack Query – React Native](https://tanstack.com/query/latest/docs/framework/react/react-native)
- [Zustand – Documentation](https://zustand.docs.pmnd.rs/getting-started/introduction)
- [Expo – `expo-secure-store`](https://docs.expo.dev/versions/v56.0.0/sdk/securestore/)

## Styling & UI

- [React Native – StyleSheet](https://reactnative.dev/docs/stylesheet)
- [React Native – Safe areas](https://reactnative.dev/docs/safeareaview)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)

## Performance & Profiling

- [React Native – Profiling](https://reactnative.dev/docs/profiling)
- [React – `memo`](https://react.dev/reference/react/memo) *(use with RN profiling, not by default on every component)*
- [React Compiler – React Learn](https://react.dev/learn/react-compiler)

## Testing

- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/docs/start/intro)
- [Expo – Unit testing](https://docs.expo.dev/develop/unit-testing/)
- [Testing Library – Guiding Principles](https://testing-library.com/docs/guiding-principles)

## Security

- [Expo – Security](https://docs.expo.dev/guides/security/)
- [OWASP Mobile Top 10](https://owasp.org/www-project-mobile-top-10/)
- [React Native – Security considerations](https://reactnative.dev/docs/security)

## Video & Media (community / product patterns)

- [Expo AV / Video – SDK docs](https://docs.expo.dev/versions/v56.0.0/sdk/video/) *(check installed module in project)*
- [React Native – Image](https://reactnative.dev/docs/image)

> Rules for `CachedVideo`, single active playback, and preload count come from this project's product conventions (see workspace user rules), not from a single external spec.

## Related Project Skills

- [react-best-practices](../react-best-practices/README.md) — React 19 hooks, effects, server state, memoization

## Internal Project References

- [.cursor/rules/hard-execution-rules.mdc](../../rules/hard-execution-rules.mdc) — FSD, TypeScript, Yarn, commit conventions
- [package.json](../../../package.json) — dependency versions for doc links
