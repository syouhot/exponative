import { colors } from '@/constants/theme';
import ContextProvider from '@/context';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// SplashScreen.preventAutoHideAsync()

const App = () => {

  const handleTrackPlayerLoaded = useCallback(() => {
    SplashScreen.hideAsync()
  }, [])

  return <SafeAreaProvider>
    <ContextProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigation />
        <StatusBar style='light' />
      </GestureHandlerRootView>
    </ContextProvider>
  </SafeAreaProvider>
}


const RootNavigation = () => {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitleAlign: "center" }} />
    <Stack.Screen name="player"  options={{
      headerShown: false,
      headerTitleAlign: "center",
      presentation: "card",
      gestureEnabled: true,
      gestureDirection: "vertical",
      animationDuration:400,
    }} />
    <Stack.Screen name="(modals)/addToPlaylist" options={{
      headerTitleAlign: "center",
      presentation: "modal",
      headerStyle: {
        backgroundColor:colors.background,
      },
      headerTitle: "Add to playlist",
      headerTitleStyle: {
        color:colors.text
      },
    }} />
  </Stack>
}

export default App;