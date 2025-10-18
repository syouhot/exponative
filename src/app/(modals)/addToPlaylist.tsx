import PlaylistsList from "@/components/PlaylistsList";
import { Track } from "@/components/TrackListItem";
import { screenPadding } from "@/constants/theme";
import { useGlobalContext } from "@/context";
import { Playlist } from "@/helper/type";
import { usePlaylist, useTracks } from "@/store/library";
import { useQueue } from "@/store/queue";
import { defaultStyle } from "@/styles";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function addToPlaylist() {
    const  headerHeight  = useHeaderHeight()
    const router = useRouter()
    const { setTrackList, trackList } = useGlobalContext()
    const { activedQueueId } = useQueue()
    const { trackUrl } = useLocalSearchParams<{ trackUrl: Track["url"] }>()
    const { playlists, addToPlaylist } = usePlaylist()
    const tracks = useTracks()

    const track = tracks.find(track => track.url === trackUrl)
    if (!track) {
        return null
    }

    const availablePlaylists = playlists.filter(
        playlist => !playlist.tracks.some(
            playlistTrack => playlistTrack.url === track.url))
    
    const handlePlaylistPress = async (playlist: Playlist) => { 
        addToPlaylist(track, playlist.name)
        router.dismiss()
        if (activedQueueId?.startsWith(playlist.name)) { 
            await setTrackList([...trackList, track])
        }
    }
    return (
        <SafeAreaView style={[styles.modalConatiner, { paddingTop: Platform.OS === "ios" ? headerHeight : 0}]}>
            <PlaylistsList playlists={ availablePlaylists } onPlaylistPress={handlePlaylistPress } />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    modalConatiner: {
        ...defaultStyle.container,
        paddingHorizontal:screenPadding.horizontal
    }
})