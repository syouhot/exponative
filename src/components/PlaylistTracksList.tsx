import SearchIndex from "@/app/search";
import { fontSize } from "@/constants/theme";
import { generateTracksListId, trackTitleFilter } from "@/helper";
import { Playlist } from "@/helper/type";
import { defaultStyle } from "@/styles";
import { Image } from "expo-image";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TracksList from "./TracksList";

export default function PlaylistTracksList({ playlist }: { playlist: Playlist }) {

    const [searchValue, setSearchValue] = useState("")
    const filteredPlaylistTracks = useMemo(() => {
        return playlist.tracks.filter(trackTitleFilter(searchValue))
    }, [searchValue, playlist.tracks])
    return (
        <>
            <SearchIndex searchValue={searchValue} setSearchValue={setSearchValue} style={{ width: "100%" }} />
            <TracksList
                id={generateTracksListId(playlist.name, searchValue)}
                tracks={filteredPlaylistTracks}
                scrollEnabled={false}
                ListHeaderComponentStyle={styles.playlistHeaderContainer}
                ListHeaderComponent={<View>
                    <View style={styles.artworkImageContainer}>
                        <Image source={playlist.artworkPreview} style={styles.artworkImage} />
                    </View>
                    <Text numberOfLines={1} style={styles.playlistNameText}>{playlist.name}</Text>
                </View>}
            />
        </>
    )
}


const styles = StyleSheet.create({
    playlistHeaderContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 12,
        width: "100%"
    },
    artworkImageContainer: {
        flexDirection: "row",
        justifyContent: "center",
        height: 300
    },
    artworkImage: {
        width: "85%",
        height: "100%",
        resizeMode: "cover",
        borderRadius: 12
    },
    playlistNameText: {
        ...defaultStyle.text,
        marginTop: 22,
        textAlign: "center",
        fontWeight: "800",
        fontSize: fontSize.lg
    }
})