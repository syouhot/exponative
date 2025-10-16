import { StackScreenWithSeachBar } from "@/constants/layout";
import { colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function ArtistsScreenLayout({ children }: { children: React.ReactNode }){
    return <Stack>
        <Stack.Screen name="index" options={{ ...StackScreenWithSeachBar, headerTitle: "artists", headerTitleAlign: "center" }} />
        <Stack.Screen name="[name]" options={{
            headerTitle: "", headerBackVisible: true, headerStyle: {
            backgroundColor:colors.background
            },
            headerTintColor: colors.primary
        }} />
        </Stack>

} 