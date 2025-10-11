import { StackScreenWithSeachBar } from "@/constants/layout";
import { Stack } from "expo-router";

export default function SongsScreenLayout({ children }: { children: React.ReactNode }){
    return <Stack>
            <Stack.Screen name="index" options={{...StackScreenWithSeachBar, headerTitle:"Songs",headerTitleAlign:"center"}}/>
        </Stack>
} 