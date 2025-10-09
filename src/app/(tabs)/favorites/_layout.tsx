import { StackScreenWithSeachBar } from "@/constants/layout";
import { defaultStyle } from "@/styles";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function FavoritesScreenLayout({ children }: { children: React.ReactNode }){
    return <View style={defaultStyle.container}>
        <Stack>
            <Stack.Screen name="index" options={{...StackScreenWithSeachBar, headerTitle:"favorites",headerTitleAlign:"center"}}/>
        </Stack>
    </View>
} 