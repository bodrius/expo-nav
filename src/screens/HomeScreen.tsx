import { StyleSheet, Text, SafeAreaView } from 'react-native';

export function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello Expo Navigation</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '600',
  },
});
