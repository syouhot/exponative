import { StackScreenWithSeachBar } from "@/constants/layout";
import { Stack } from "expo-router";

export default function ArtistsScreenLayout({ children }: { children: React.ReactNode }){
    return <Stack>
            <Stack.Screen name="index" options={{...StackScreenWithSeachBar, headerTitle:"artists",headerTitleAlign:"center"}}/>
        </Stack>

} 