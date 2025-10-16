import { StackScreenWithSeachBar } from "@/constants/layout";
import { colors } from "@/constants/theme";
import { Stack } from "expo-router";

export default function PlaylistsScreenLayout({ children }: { children: React.ReactNode }) {
    return <Stack>
        <Stack.Screen name="index" options={{ ...StackScreenWithSeachBar, headerTitle: "playlists", headerTitleAlign: "center" }} />
        <Stack.Screen name="[name]" options={{
            headerTitle: "", headerBackVisible: true, headerStyle: {
                backgroundColor: colors.background
            }, headerTintColor: colors.primary, headerTitleStyle: {
                fontSize: 16
            }
        }} />
    </Stack>

} 