import { unknownTrackImageUri } from "@/constants/images"
import { useGlobalContext } from "@/context"
import useLastActiveTrack from "@/hooks/useLastActiveTrack"
import { defaultStyle } from "@/styles"
import { Image } from "expo-image"
import { useRouter } from "expo-router"
import { StyleSheet, TouchableOpacity, View, ViewProps } from "react-native"
import MovingText from "./MovingText"
import { PlayPauseButton, SkipToNextButton } from "./PlayControls"

export default function FloatingPlayer({ style }: ViewProps) {
    const router = useRouter()
    const { activeTrack } = useGlobalContext()
    const lastActiveTrack = useLastActiveTrack()
    const displayedTrack = activeTrack ?? lastActiveTrack
    const handlePress = () => { 
        router.navigate("/player")
    }
    if (!displayedTrack) return null
    return (
        <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]} onPress={handlePress}>
            <>
                <Image
                    source={displayedTrack?.artwork ?? unknownTrackImageUri}
                    style={styles.trackArtworkImage}
                />
                <View style={styles.titleContainer}>
                    <MovingText
                        text={displayedTrack?.title ?? ""}
                        animationThreshold={25}
                        style={styles.title} />
                </View>
                <View style={styles.controlsContainer}>
                    <PlayPauseButton iconSize={24} />
                    <SkipToNextButton iconSize={22} />
                </View>
            </>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#252525",
        padding: 8,
        borderRadius: 12,
        paddingVertical: 10
    },
    trackArtworkImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
    title: {
        ...defaultStyle.text,
        fontSize: 18,
        fontWeight: "600",
        paddingLeft: 10
    },
    titleContainer: {
        flex: 1,
        overflow: "hidden",
        marginLeft: 10
    },
    controlsContainer: {
        flexDirection: "row",
        alignItems: "center",
        columnGap: 20,
        marginRight: 16,
        paddingLeft: 16
    }
})