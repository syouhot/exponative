import { useGlobalContext } from "@/context"
import { useFavorites } from "@/store/library"
import { useQueue } from "@/store/queue"
import { MenuView } from "@react-native-menu/menu"
import { useRouter } from "expo-router"
import { PropsWithChildren } from "react"
import { Platform } from "react-native"
import { match } from "ts-pattern"
import { Track } from "./TrackListItem"

type TrackShortcutsMenuProps = PropsWithChildren<{ track: Track }>
export default function TrackShortcutsMenu({ track, children }: TrackShortcutsMenuProps) {
    const router = useRouter()
    const isFavorite = track.rating === 1
    const { toggleTrackFavorite } = useFavorites()
    const { activedQueueId } = useQueue()
    const { trackList, setTrackList } = useGlobalContext()
    const handlePressAction = (id: string) => {
        match(id)
            .with("add-to-favorites", async () => {
                toggleTrackFavorite(track)
                //当前播放的正好这个favorites列表
                if (activedQueueId?.startsWith("favorites")) {
                    await setTrackList([...trackList, track])
                }
            })
            .with("remove-from-favorites", async () => {
                toggleTrackFavorite(track)
                //当前播放的正好这个favorites列表
                if (activedQueueId?.startsWith("favorites")) {
                    let newTrackList = trackList.splice(trackList.findIndex(t => t.url === track.url), 1)
                    await setTrackList(newTrackList)
                }
            })
            .with("add-to-playlist", () => {
                router.push({
                    pathname: "(modals)/addToPlaylist",
                    params: { trackUrl: track.url }
                })
            })
            .otherwise(() => console.warn(`Unknow menu action ${id}`))

    }
    return <MenuView
        onPressAction={({ nativeEvent: { event } }) => handlePressAction(event)}
        actions={[
            {
                id: isFavorite ? "remove-from-favorites" : "add-to-favorites",
                title: isFavorite ? "Remove from favorites" : "Add to favorites",
                // image: isFavorite ? "heart" : "heart-outline",
                image: isFavorite ? Platform.select({
                    ios: "star.fill",
                    android: "star_on"
                }) : Platform.select({
                    ios: "star",
                    android: "star_off"
                })
            },
            {
                id: "add-to-playlist",
                title: "Add to playlist",
                image: Platform.select({
                    ios: "plus",
                    android: "ic_input_add"
                })
            }
        ]}
    >
        {children}
    </MenuView>
}
