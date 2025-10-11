import ContextProvider from '@/context';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// SplashScreen.preventAutoHideAsync()

const App = () => {

  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  return <SafeAreaProvider>
    <ContextProvider>
      <RootNavigation />
      <StatusBar style='light' />
    </ContextProvider>
  </SafeAreaProvider>
}


const RootNavigation = () => {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitleAlign: "center" }} />
  </Stack>
}

export default App;