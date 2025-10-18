import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/theme'
import { useGlobalContext } from '@/context'
import { defaultStyle } from '@/styles'
import { Entypo, Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import Loaderkit from 'react-native-loader-kit'
import StopPropagation from './StopPropagation'
import TrackShortcutsMenu from './TrackShortcutsMenu'

export type Track = {
    title: string
    url: string
    artist?: string;
    artwork?: string;
    rating?: number,
    playlist?: string[]
}

export type TrackListItemProps = {
    track: Track,
    onTrackSelect: (track: Track) => void
}

export default function TrackListItem({ track, onTrackSelect }: TrackListItemProps) {
    const { activeTrack, setActiveTrack, player, setPlayer, status } = useGlobalContext()
    const isActiveTrack = activeTrack?.artwork === track.artwork && activeTrack?.title === track.title
    const handlerTrack = async () => {
        await setActiveTrack(track)
        onTrackSelect(track)
    }
    return (
        <TouchableHighlight onPress={handlerTrack}>
            <View style={styles.trackItemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', columnGap: 14 }}>
                    <View>
                        {/* 这里图像加载有问题，需要解决 */}
                        <Image source={{
                            uri: track.artwork ?? unknownTrackImageUri,
                        }}
                            style={{
                                ...styles.trackArtworkImage,
                                opacity: isActiveTrack ? 0.6 : 1
                            }}
                            onError={() => { }}
                        />
                        {isActiveTrack && (status?.playing ?
                            <Loaderkit name='LineScaleParty' color={colors.icon} style={styles.trackPlayingIconIndicator} /> :
                            <Ionicons name='play' size={24} color={colors.icon} style={styles.trackPausedIndicator} />
                        )}
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ width: '100%' }}>
                            <Text numberOfLines={1} style={{
                                ...styles.trackTitleText,
                                color: isActiveTrack ? colors.primary : colors.text
                            }}>{track.title}</Text>
                            {track.artist && <Text numberOfLines={1} style={styles.trackArtistText}>{track.artist}</Text>}
                        </View>
                        <StopPropagation>
                            <TrackShortcutsMenu track={track}>
                                <Entypo name='dots-three-horizontal' size={18} color={colors.icon} />
                            </TrackShortcutsMenu>
                        </StopPropagation>
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    trackArtworkImage: {
        borderRadius: 8,
        width: 50,
        height: 50,
    },
    trackTitleText: {
        ...defaultStyle.text,
        fontSize: fontSize.sm,
        fontWeight: "bold",
        maxWidth: '90%'
    },
    trackArtistText: {
        ...defaultStyle.text,
        color: colors.textMuted,
        fontSize: 14,
        marginTop: 4
    },
    trackItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        columnGap: 14
    },
    trackPlayingIconIndicator: {
        position: 'absolute',
        top: 18,
        left: 16,
        height: 16,
        width: 16
    },
    trackPausedIndicator: {
        position: 'absolute',
        top: 14,
        left: 14,
    }
})
