import { ExtendedStackNavigationOptions } from "expo-router/build/layouts/StackClient"
import { Platform } from "react-native"
import { colors } from "./theme"
export const StackScreenWithSeachBar: ExtendedStackNavigationOptions = {

    headerLargeStyle: {
        backgroundColor: colors.background,
    },
    headerLargeTitleStyle: {
        color: colors.text,
    },
    headerTintColor: colors.text,
    headerTitleStyle:{
        color:"white"
    },
    headerShadowVisible: false,
    headerBlurEffect: "dark",
    ...Platform.select({
        ios: {
            headerLargeTitle: true, 
            headerTransparent: true,
        },
        android: {
            headerShown: false
        }
    })

}