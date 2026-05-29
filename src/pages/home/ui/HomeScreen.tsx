import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/shared/ui';

export const HomeScreen = () => {
  const title = 'Hello Expo Navigation';

  return (
    <SafeAreaView style={styles.container}>
      <AppText testID="home-title" variant="title" color="primary">
        {title}
      </AppText>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
});
