import { ExtendedStackNavigationOptions } from "expo-router/build/layouts/StackClient"
import { colors } from "./theme"
export const StackScreenWithSeachBar:ExtendedStackNavigationOptions = {
    headerLargeTitle:true,
    headerLargeStyle:{
        backgroundColor:colors.background,
    },
    headerLargeTitleStyle:{
        color:colors.text,
    },
    headerTintColor:colors.text,
    headerTransparent:true,
    headerBlurEffect:"prominent",
    headerShadowVisible:false,
}