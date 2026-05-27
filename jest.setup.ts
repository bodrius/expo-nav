import '@testing-library/react-native/matchers';

/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-return -- Jest factory must load the Reanimated mock synchronously */
jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
/* eslint-enable @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-return */
