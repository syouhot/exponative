import { colors, fontSize } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const defaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    text: {
        fontSize: fontSize.base,
        color: colors.text
    }
})

export const utilsStyles = StyleSheet.create({
    itemSeparator: {
        borderColor: colors.textMuted,
        borderWidth: StyleSheet.hairlineWidth,
        opacity: 0.3
    },
    emptyComponentText: {
        ...defaultStyle.text,
        color: colors.textMuted,
        textAlign: 'center',
        marginTop: 20
    },
    emptyComponentImage: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 40,
        opacity: 0.3
    }
})