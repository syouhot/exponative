
import { colors } from "@/constants/theme";
import useTrackPlayerRepeatMode from "@/hooks/useTrackPlayerRepeatMode";
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
    const {repeatMode ,changeRepeatMode } = useTrackPlayerRepeatMode()

    const toggleRepeatMode = () => {
        if(repeatMode === undefined) return
        changeRepeatMode(repeatMode?0:1)
    }
    const icon = match(repeatMode)
        .returnType<IconName>()
        .with(0, () => "repeat-off")
        .with(1, () => "repeat-once")
        .otherwise(() => "repeat-off")

    return <MaterialCommunityIcons
        name={icon}
        onPress={toggleRepeatMode}
        color={colors.icon}
        {...iconProps}
    />
}
