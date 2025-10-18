import { useGlobalContext } from "@/context";
import { useFavorites } from "@/store/library";
import { useCallback } from "react";

export default function useTrackPlayerFavorite() {

    const { activeTrack } = useGlobalContext()
    const { favorites, toggleTrackFavorite } = useFavorites()
    const isFavorite = favorites.find(track => track.url === activeTrack?.url)?.rating === 1
    const toggleFavorite = useCallback(() => {
        if (activeTrack) {
            activeTrack.rating = isFavorite ? 0 : 1
            toggleTrackFavorite(activeTrack)
        }
    }, [isFavorite,toggleTrackFavorite,activeTrack])

    return {toggleFavorite,isFavorite}
}
