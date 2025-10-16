import library from "@/assets/data/library.json";
import { Track } from "@/components/TrackListItem";
import { unknownTrackImageUri } from "@/constants/images";
import { Artist, Playlist, TrackWithPaylist } from "@/helper/type";
import { create } from "zustand";

interface LibraryState {
    tracks: TrackWithPaylist[]
    toggleTrackFavorite: (track: Track) => void
    addToPlaylist: (track: Track, playlistName: string) => void
    // removeFromPlaylist: (track: Track, playlistName: string) => void
}


export const useLibraryStore = create<LibraryState>((set) => ({
    tracks: library,
    toggleTrackFavorite: () => { },
    addToPlaylist: () => { }
}))


export const useTracks = () => useLibraryStore(state => state.tracks)

export const useFavorites = () => {
    const favorites = useLibraryStore(state => state.tracks).filter(track => track.rating === 1)
    const toggleTrackFavorite = useLibraryStore((state) => state.toggleTrackFavorite)

    return {
        favorites,
        toggleTrackFavorite,
    }
}
export const useArtists = () => {
    const artists = useLibraryStore(state => state.tracks)
    const result = artists.reduce((acc, track) => { 
        const existingArtist = acc.find((artist) => artist.name === track.artist)
        if (existingArtist) {
            existingArtist.tracks.push(track)
        } else {
            acc.push({
                name: track.artist ?? "unknown",
                tracks: [track]
            })
        }
        return acc
    }, [] as Artist[])

    return result
}

export const usePlaylist = () => {
    const playlist = useLibraryStore(state => state.tracks)
    const playlists = playlist.reduce((acc, track) => {
        track.playlist?.forEach(playlistName => {
            const existingPlaylist = acc.find((playlist) => playlist.name === playlistName)
            if (existingPlaylist) {
                existingPlaylist.tracks.push(track)
            } else {
                acc.push({
                    name: playlistName ?? "unknown",
                    tracks: [track],
                    artworkPreview: track.artwork ?? unknownTrackImageUri
                })
            }
        })
        return acc
    },[] as Playlist[])

    const addToPlaylist = useLibraryStore((state) => state.addToPlaylist)
    return {playlists}
}