import SearchIndex from '@/app/search'
import { fontSize, screenPadding } from '@/constants/theme'
import { generateTracksListId, trackTitleFilter } from '@/helper'
import { Artist } from '@/helper/type'
import { defaultStyle } from '@/styles'
import React, { useMemo, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import TracksList from './TracksList'

export default function ArtistTracksList({ artist }: { artist: Artist }) {
    const [searchValue, setSearchValue] = useState("")
    const filteredArtistTracks = useMemo(() => {
        if (searchValue) return artist.tracks.filter(trackTitleFilter(searchValue))
        return artist.tracks
    }, [searchValue, artist.tracks])

    return (
        <View>
            <SearchIndex searchValue={searchValue} setSearchValue={setSearchValue} />
            <View >
                {/* <View style={styles.artistImageContainer}>
                    <Image
                        source={unknownTrackImageUri}
                        style={styles.artistImage}
                    />
                </View> */}
                <Text numberOfLines={1} style={styles.artistNameText}>{artist.name}</Text>
            </View>
            <ScrollView
                style={{ paddingHorizontal: screenPadding.horizontal }}
                contentInsetAdjustmentBehavior="automatic">
                <TracksList
                    tracks={filteredArtistTracks}
                    id={generateTracksListId(artist.name, searchValue)}
                    scrollEnabled={false}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    artistHeaderContainer: {
        flex: 1,
        marginBottom: 32
    },
    artistImageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        height: 200
    },
    artistImage: {
        width: "60%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 128
    },
    artistNameText: {
        ...defaultStyle.text,
        fontSize: fontSize.lg,
        marginTop: 22,
        textAlign: "center",
        fontWeight: "800"
    }
})
