import SearchIndex from "@/app/search";
import PlaylistsList from "@/components/PlaylistsList";
import { screenPadding } from "@/constants/theme";
import { playlistsNameFilter } from "@/helper";
import { Playlist } from "@/helper/type";
import { usePlaylist } from "@/store/library";
import { defaultStyle } from "@/styles";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Platform, ScrollView, View } from "react-native";

export default function PlaylistsScreen() {
    const router = useRouter()
    const [searchValue, setSearchValue] = useState("")
    const { playlists } = usePlaylist()
    const filteredPlaylists = useMemo(() => {
        return playlists.filter(playlistsNameFilter(searchValue))
    }, [searchValue])
    const handlePlaylistPress = (playlist: Playlist) => {
        router.push(`/(tabs)/playlists/${playlist.name}`)
    }
    if (Platform.OS === "ios") return (
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={[{ paddingHorizontal: screenPadding.horizontal }, defaultStyle.container]}>
            <SearchIndex searchValue={searchValue} setSearchValue={setSearchValue} style={{width:"100%"}}/>
            <PlaylistsList scrollEnabled={false} playlists={filteredPlaylists} onPlaylistPress={handlePlaylistPress} />
        </ScrollView>
    )
    return <View style={defaultStyle.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={{ paddingHorizontal: screenPadding.horizontal }}>
            <SearchIndex searchValue={searchValue} setSearchValue={setSearchValue} />
            <PlaylistsList scrollEnabled={false} playlists={filteredPlaylists} onPlaylistPress={handlePlaylistPress} />
        </ScrollView>
    </View>
}