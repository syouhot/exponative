import { colors } from "@/constants/theme";
import useTrackPlayerVolume from "@/hooks/useTrackPlayerVolume";
import { utilsStyles } from "@/styles";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";

export default function PlayerVolumeBar({ style }: ViewProps) {

    const { volume, updateVolume } = useTrackPlayerVolume()

    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)

    useEffect(()=>{
        progress.value = volume ?? 0
    },[volume])

    return <View style={style}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="volume-low" size={20} color={colors.icon} style={{ opacity: 0.8 }} />

            <Slider
                progress={progress}
                minimumValue={min}
                maximumValue={max}
                theme={{
                    maximumTrackTintColor: colors.maximumTrackTintColor,
                    minimumTrackTintColor: colors.minimumTrackTintColor
                }}
                containerStyle={utilsStyles.slider}
                thumbWidth={0}
                renderBubble={() => null}
                onValueChange={(value) => {
                   updateVolume(value)
                }}
            />

            <Ionicons name="volume-high" size={20} color={colors.icon} style={{ opacity: 0.8 }} />
        </View>
    </View>
}