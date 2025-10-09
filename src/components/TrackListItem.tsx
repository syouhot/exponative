import { unknownTrackImageUri } from '@/constants/images'
import { colors, fontSize } from '@/constants/theme'
import { defaultStyle } from '@/styles'
import { Image } from 'expo-image'
import React from 'react'
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native'

export type TrackListItemProps = {
    track: { title: string, image?: string, artist?: string }
}

export default function TrackListItem({ track }: TrackListItemProps) {
    const isActiveTrack = false

    return (
        <TouchableHighlight>
            <View style={styles.trackItemContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center',columnGap:14 }}>
                    <View>
                        <Image source={{
                            uri: track.image || unknownTrackImageUri,
                        }}
                            style={{
                                ...styles.trackArtworkImage,
                                opacity: isActiveTrack ? 0.6 : 1
                            }} />
                    </View>
                    <View style={{ width: '100%' }}>
                        <Text numberOfLines={1} style={{
                            ...styles.trackTitleText,
                            color: isActiveTrack ? colors.primary : colors.text
                        }}>{track.title}</Text>
                        {track.artist && <Text numberOfLines={1} style={styles.trackArtistText}>{track.artist}</Text>}
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
    trackItemContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 20,
        columnGap:14
    }
})
