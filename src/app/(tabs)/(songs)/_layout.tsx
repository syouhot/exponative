import { StackScreenWithSeachBar } from "@/constants/layout";
import { defaultStyle } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function SongsScreenLayout({ children }: { children: React.ReactNode }){
    return <View style={defaultStyle.container}>
        <Stack>
            <Stack.Screen name="index" options={{...StackScreenWithSeachBar}}/>
        </Stack>
    </View>
} 