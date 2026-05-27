import { StatusBar } from 'expo-status-bar';

import { HomeScreen } from '@/pages/home';

import { AppProviders } from './providers/AppProviders';

export const App = () => {
  return (
    <AppProviders>
      <HomeScreen />
      <StatusBar style="auto" />
    </AppProviders>
  );
};
