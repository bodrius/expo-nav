# Environment & secrets

## Client environment variables

Expo exposes variables prefixed with `EXPO_PUBLIC_` to the JavaScript bundle. Treat every such value as **public**.

**Allowed:** non-sensitive config (e.g. public API base URL, feature flags safe to leak).

**Never put in `EXPO_PUBLIC_*` or committed `.env`:**

- API secrets, private keys, refresh tokens
- Admin credentials
- Signing secrets

## On-device storage

Use [`expo-secure-store`](https://docs.expo.dev/versions/v56.0.0/sdk/securestore/) for tokens and other sensitive local data.

Do **not** store credentials in AsyncStorage or plain files.

## Networking

- Use **HTTPS** for production APIs.
- Do not log tokens, passwords, or full auth responses.

## Local env files

- Keep `.env*.local` out of version control (see `.gitignore`).
- Document required variables here when the app starts using them (names only, no real values).

## Further reading

- [Expo security guide](https://docs.expo.dev/guides/security/)
- Root [README](../README.md#security)
