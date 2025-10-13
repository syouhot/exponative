import MovingText from "@/components/MovingText";
import { PlayerControls } from "@/components/PlayControls";
import PlayerProgressBar from "@/components/PlayerProgressBar";
import PlayerRepeatToggle from "@/components/PlayerRepeatToggle";
import PlayerVolumeBar from "@/components/PlayerVolumeBar";
import { unknownTrackImageUri } from "@/constants/images";
import { colors, fontSize, screenPadding } from "@/constants/theme";
import { useGlobalContext } from "@/context";
import { defaultStyle, utilsStyles } from "@/styles";
import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function PlayerScreen() {
    const { activeTrack } = useGlobalContext()
    const { top, bottom } = useSafeAreaInsets()
    const isFavorite = false

    const toggleFavorite = () => {

    }
    if (!activeTrack) {
        return <View style={[defaultStyle.container, { justifyContent: "center" }]}>
            <ActivityIndicator color={colors.icon} />
        </View>
    }

    return <View style={styles.overlayContainer}>
        <DismissPlayerSymbol />
        <View style={{ flex: 1, marginTop: top + 70, marginBottom: bottom + 20 }}>
            <View style={styles.artworkImageContainer}>
                <Image source={activeTrack.artwork ?? unknownTrackImageUri} style={styles.artworkImage} />
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ marginTop: "auto" }}>
                    <View style={{ height: 60 }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center"
                        }}>
                            <View style={styles.trackTitleContainer}>
                                <MovingText text={activeTrack.title ?? ""} style={styles.trackTitleText} animationThreshold={30} />
                            </View>
                            <FontAwesome
                                name={isFavorite ? "heart" : "heart-o"}
                                size={20}
                                color={isFavorite ? colors.primary : colors.icon}
                                style={{ marginHorizontal: 14 }}
                                onPress={toggleFavorite} />
                        </View>
                        {activeTrack.artist && (
                            <Text numberOfLines={1} style={[styles.artckArtistText, { marginTop: 6 }]}>{activeTrack.artist}</Text>
                        )}
                    </View>
                    <PlayerProgressBar style={{ marginTop: 32 }} />
                    <PlayerControls style={{ marginTop: 40 }} />
                </View>
                <PlayerVolumeBar style={{ marginTop: "auto", marginBottom: 30 }} />
                <View style={utilsStyles.centeredRow}>
                    <PlayerRepeatToggle size={30} style={{ marginBottom: 6 }} />
                </View>
            </View>
        </View>
    </View>
}

const DismissPlayerSymbol = () => {
    const { top } = useSafeAreaInsets()
    return <View style={{
        position: 'absolute',
        top: top + 8,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center"

    }}>
        <View accessible={false} style={{
            width: 50,
            height: 8,
            borderRadius: 8,
            backgroundColor: "white",
            opacity: 0.7
        }}></View>
    </View>
}

const styles = StyleSheet.create({
    overlayContainer: {
        ...defaultStyle.container,
        paddingHorizontal: screenPadding.horizontal,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    artworkImageContainer: {
        shadowOffset: {
            width: 0,
            height: 8
        },
        shadowOpacity: 0.44,
        shadowRadius: 11.0,
        flexDirection: "row",
        justifyContent: "center",
        height: "45%"
    },
    artworkImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 12
    },
    trackTitleText: {
        ...defaultStyle.text,
        fontSize: 22,
        fontWeight: "700"
    },
    trackTitleContainer: {
        flex: 1,
        overflow: "hidden"
    },
    artckArtistText: {
        ...defaultStyle.text,
        fontSize: fontSize.base,
        opacity: 0.8,
        maxWidth: "90%"
    }
})