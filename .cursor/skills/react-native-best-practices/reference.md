# React Native + Expo — Detailed Reference

Extended rules and GOOD/BAD examples. Read when implementing or reviewing non-trivial changes.

---

# Project Architecture

Use Feature-Sliced Design:

```txt
src/
  app/
  pages/
  widgets/
  features/
  entities/
  shared/
```

## Layer Responsibilities

### app

- app bootstrap
- providers
- navigation
- app configuration

### pages

- route-level composition
- screen orchestration only

### widgets

- large reusable UI blocks

### features

- business interactions
- user flows

### entities

- business models/entities

### shared

- reusable infrastructure
- reusable hooks
- UI kit
- utilities

---

# File Organization

## Preferred Structure

```txt
feature/
  components/
  hooks/
  services/
  model/
  lib/
  types/
```

## Rules

- One component per file
- Prefer files under ~200 lines
- Keep hooks focused
- Avoid giant folders like:
  - helpers
  - misc
  - common
  - stuff

Prefer domain-specific naming.

---

# Imports

## Import Order

1. React / React Native
2. Expo
3. Third-party libraries
4. Internal shared imports
5. Relative imports

## GOOD

```tsx
import React from 'react'
import { View } from 'react-native'

import { router } from 'expo-router'
import { useQuery } from '@tanstack/react-query'

import { Button } from '@/shared/ui/Button'

import './styles'
```

## BAD

```tsx
import Button from '../../../components/Button'
```

Avoid deep relative imports.

---

# Components

## Rules

- Use named arrow exports
- Use interfaces for props
- Destructure props in function signature
- Keep JSX readable
- Extract repeated UI
- Keep components presentation-focused
- Memoize reusable expensive components

## GOOD

```tsx
interface Props {
  title: string
  onPress: () => void
}

export const ProfileButton = React.memo(
  ({ title, onPress }: Props) => {
    return (
      <Pressable onPress={onPress}>
        <Text>{title}</Text>
      </Pressable>
    )
  }
)
```

## BAD

```tsx
export default function(props:any){
  return (
    <TouchableOpacity
      onPress={() => props.onPress()}
    >
      <Text>{props.title}</Text>
    </TouchableOpacity>
  )
}
```

Problems:
- default export
- any
- inline callback
- poor readability

---

# Screens

## Screens SHOULD ONLY

- compose UI
- connect hooks
- orchestrate state
- handle navigation

## Screens SHOULD NOT

- fetch directly
- contain heavy business logic
- transform large datasets
- contain animation logic

## GOOD

```tsx
export const ProfileScreen = () => {
  const { user, isLoading } = useProfile()

  if (isLoading) {
    return <Loader />
  }

  return <ProfileView user={user} />
}
```

## BAD

```tsx
export const ProfileScreen = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    fetch('/profile')
      .then(r => r.json())
      .then(setUser)
  }, [])

  return (...)
}
```

---

# Hooks

## Rules

- One responsibility per hook
- Avoid god-hooks
- Keep effects minimal
- Prefer derived values during render
- Prefer composition over giant hooks

## GOOD

```tsx
export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: profileService.getProfile,
  })
}
```

## BAD

```tsx
export const useEverything = () => {
  // auth
  // analytics
  // websocket
  // payments
}
```

---

# State Management

## Use

### Local UI State

- useState
- useReducer

### Server State

- TanStack Query

### Global State

- Zustand

## Avoid

- duplicated state
- syncing props into state
- giant global stores
- storing derived values

---

# Effects

## DO NOT USE useEffect FOR

- filtering
- sorting
- derived state
- syncing computed values

## BAD

```tsx
useEffect(() => {
  setFiltered(items.filter(Boolean))
}, [items])
```

## GOOD

```tsx
const filtered = useMemo(
  () => items.filter(Boolean),
  [items]
)
```

---

# Lists

## Rules

- Use FlashList for large feeds
- Stable keyExtractor required
- Stable renderItem required
- Memoize list rows
- Provide estimatedItemSize

## GOOD

```tsx
const renderItem = useCallback(
  ({ item }) => <VideoCard item={item} />,
  []
)
```

## BAD

```tsx
renderItem={({ item }) => (
  <VideoCard item={item} />
)}
```

## NEVER

- use index as key
- nest large FlatLists
- create inline renderItem callbacks
- render huge lists inside ScrollView

---

# Video Feed Rules

## MUST

- only one video plays at a time
- pause video on unfocus
- preload next videos intentionally
- clean up resources on unmount
- use CachedVideo component
- show loading placeholders

## NEVER

- autoplay multiple videos
- preload unlimited videos
- keep hidden videos mounted

---

# Gestures & Animations

## Use

- react-native-reanimated
- react-native-gesture-handler

## Avoid

- PanResponder
- animation loops via React state
- excessive runOnJS

## GOOD

```tsx
const translateX = useSharedValue(0)
```

## BAD

```tsx
const [translateX, setTranslateX] = useState(0)
```

for gesture animation state.

---

# Styling

## Preferred

- StyleSheet.create
- NativeWind
- theme tokens
- centralized spacing/colors

## Avoid

- magic numbers
- random spacing
- excessive inline styles
- mixed styling systems

## BAD

```tsx
<View style={{ marginTop: 17 }}>
```

## GOOD

```tsx
<View className="mt-4" />
```

---

# Navigation

## Rules

- typed route params required
- params must be serializable
- pass IDs instead of large objects
- use focus-aware lifecycle handling

## Use

- useFocusEffect
- typed navigation helpers

## Avoid

- non-serializable params
- business logic inside navigation layer

---

# Performance Rules

## MUST CHECK

- unnecessary re-renders
- unstable props
- unstable callbacks
- excessive effects
- oversized render trees
- heavy work during render

## BEFORE OPTIMIZING

Measure first.

Avoid premature optimization.

---

# React Rendering Rules

## Avoid Re-Renders From

- inline objects
- inline arrays
- inline callbacks
- unstable context values

## BAD

```tsx
<Component style={{ marginTop: 12 }} />
```

## GOOD

```tsx
const styles = useMemo(
  () => ({ marginTop: 12 }),
  []
)
```

---

# API & Networking

## Rules

- use async/await
- centralize API clients
- handle request failures explicitly
- validate responses
- keep API logic inside services

## NEVER

- fetch inside screens
- silently ignore API failures
- expose backend errors directly to users

## GOOD

```tsx
export const profileService = {
  async getProfile() {
    const response = await api.get('/profile')
    return response.data
  },
}
```

---

# Error Handling

## Always

- handle loading states
- handle empty states
- handle error states
- show user-friendly errors
- log useful diagnostics safely

## Never

- silent catch blocks
- raw backend error messages
- ignored async failures

---

# Expo Rules

## Prefer

- Expo SDK APIs
- expo install
- Expo Router
- EAS Build
- expo-image
- expo-secure-store

## Avoid

- unnecessary native modules
- direct ios/android edits
- incompatible community packages

---

# Security

## Rules

- use expo-secure-store for sensitive local data
- sanitize user input where appropriate
- keep secrets outside client code

## NEVER

- commit secrets
- expose private tokens
- store credentials in AsyncStorage

---

# TypeScript Rules

## MUST

- strict typing
- explicit interfaces for public APIs
- typed navigation
- typed hooks/services
- narrow unknown safely

## NEVER

```ts
const data: any
```

---

# Testing

## Test

- business logic
- hooks
- edge cases
- loading/error states
- navigation contracts
- pause/resume flows

## Avoid

- snapshot spam
- implementation-detail testing

---

# Anti-Patterns To Flag

Immediately flag:

- class components
- giant screens
- giant hooks
- fetch in screens
- inline renderItem
- unstable keys
- multiple simultaneous videos
- useEffect for derived state
- deep relative imports
- excessive prop drilling
- nested ternaries
- animation state in React
- generic folders:
  - utils
  - helpers
  - misc
  - common

Prefer domain-oriented naming.

---

# AI Behavior Rules

When generating code:

- preserve architecture consistency
- reuse nearby abstractions
- avoid unnecessary dependencies
- avoid overengineering
- keep implementations production-ready
- prefer editing existing files over creating new abstractions
- avoid breaking public contracts unless requested
- preserve persisted data formats unless explicitly changed
- follow existing project conventions first
