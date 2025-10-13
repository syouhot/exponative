import { colors, fontSize } from "@/constants/theme";
import { useGlobalContext } from "@/context";
import { formatSecondToMinute } from "@/helper";
import { defaultStyle, utilsStyles } from "@/styles";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";
import { Slider } from "react-native-awesome-slider";
import { useSharedValue } from "react-native-reanimated";
export default function PlayerProgressBar({ style }: ViewProps) {
    const { status, player } = useGlobalContext()
    const isSliding = useSharedValue(false)
    const progress = useSharedValue(0)
    const min = useSharedValue(0)
    const max = useSharedValue(1)
    const [trackElapsedTime, setTrackElapsedTime] = useState("0")
    const [trackRemainingTime, setTrackRemainingTime] = useState("0")

    useEffect(()=>{
        if (status?.duration) {
            setTrackElapsedTime(formatSecondToMinute(status.currentTime))
            setTrackRemainingTime(formatSecondToMinute(status.duration - status.currentTime))
        }
        if (!isSliding.value && status?.duration) {
            progress.value = status?.duration > 0 ? status.currentTime / status.duration  : 0
        }
    },[status?.currentTime,status?.duration,isSliding.value])
    return <View style={style}>
        <Slider progress={progress} minimumValue={min} maximumValue={max} theme={{
            maximumTrackTintColor: colors.maximumTrackTintColor,
            minimumTrackTintColor: colors.minimumTrackTintColor
        }}
            containerStyle={utilsStyles.slider}
            thumbWidth={0}
            renderBubble={() => null}
            onSlidingStart={() => (isSliding.value = true)}
            onValueChange={async (value) => {
                if (status?.duration)
                    await player?.seekTo(value * status.duration)
            }}
            onSlidingComplete={async (value) => {
                if (!isSliding.value || !status?.duration) return
                isSliding.value = false
                await player?.seekTo(value * status.duration)
            }} />
        <View style={styles.timeRow}>
            <Text style={styles.timeText}>{trackElapsedTime}</Text>
            <Text style={styles.timeText}>
                {"-"} {trackRemainingTime}
            </Text>
        </View>
    </View>
}


const styles = StyleSheet.create({
    timeRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginTop: 20
    },
    timeText: {
        ...defaultStyle.text,
        color: colors.text,
        opacity: 0.75,
        fontSize: fontSize.xs,
        letterSpacing: 0.7,
        fontWeight: "500"
    }
})