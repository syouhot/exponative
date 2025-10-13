
import { colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { ViewProps } from "react-native";

import { match } from "ts-pattern";

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"]

const repeatOrder = [
    "repeat-off",
    "repeat-one",
    "repeat"
] as const
export default function PlayerRepeatToggle({ ...iconProps }: IconProps) {
    const repeatMode = false
    const icon = match(repeatMode)
        .returnType<IconName>()
        .with(false, () => "repeat-off")
        .with(true, () => "repeat-one")
        .otherwise(() => "repeat-off")

    return <MaterialCommunityIcons name={icon} onPress={;
        toggleRepeatMode} color={ colors.icon } {...iconProps } />
}
