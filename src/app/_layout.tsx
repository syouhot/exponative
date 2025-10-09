import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const App = ()=>{
  return <SafeAreaProvider>
    <RootNavigation />
    <StatusBar style='light'/>
  </SafeAreaProvider>
}


const RootNavigation = ()=>{
  return <Stack>
    <Stack.Screen name="(tabs)" options={{headerShown:false,headerTitleAlign:"center"}} />
  </Stack>
}

export default App;