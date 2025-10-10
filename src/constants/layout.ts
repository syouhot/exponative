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

    headerBlurEffect: "prominent",
    headerShadowVisible: false,
    ...(Platform.OS === 'ios' ? { headerTitle: "Songs", headerTitleAlign: "center", headerLargeTitle: true, headerTransparent: true, } : {headerShown:false}
    )
}