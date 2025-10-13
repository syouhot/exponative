
import { colors } from "@/constants/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";

import { match } from "ts-pattern";

type IconProps = Omit<ComponentProps<typeof MaterialCommunityIcons>, "name">
type IconName = ComponentProps<typeof MaterialCommunityIcons>["name"]

const repeatOrder = [
    "repeat-off",
    "repeat-once",
    "repeat"
] as const
export default function PlayerRepeatToggle({ ...iconProps }: IconProps) {
    const repeatMode = useTrackPlayerRepeatMode()
    const icon = match(repeatMode)
        .returnType<IconName>()
        .with(0, () => "repeat-off")
        .with(1, () => "repeat-once")
        .with(2, () => "repeat")
        .otherwise(() => "repeat-off")

    return <MaterialCommunityIcons
        name={icon}
        onPress={toggleRepeatMode}
        color={colors.icon}
        {...iconProps}
    />
}
