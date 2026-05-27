import type { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return <GestureHandlerRootView style={styles.container}>{children}</GestureHandlerRootView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
