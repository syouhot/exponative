import { ExtendedStackNavigationOptions } from "expo-router/build/layouts/StackClient"
import { Platform } from "react-native"
import { colors } from "./theme"
export const StackScreenWithSeachBar: ExtendedStackNavigationOptions = {

    headerLargeStyle: {
        // backgroundColor: colors.background,//如果使用大标题,这里如果添加了背景颜色,则大标题失效
    },
    headerLargeTitleStyle: {
        color: colors.text,
    },
    headerTintColor: colors.text,
    headerTitleStyle:{
        color:"white"
    },
    headerShadowVisible: false,
    headerBlurEffect: "none",//添加效果后大标题失效
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