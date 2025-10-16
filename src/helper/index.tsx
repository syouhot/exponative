import { Artist, Playlist } from "./type"

export const trackTitleFilter = (title: string) => (track: any) => {
    return track.title?.toLowerCase().includes(title.toLowerCase())
}
export const artistsNameFilter = (name: string) => (artist: Artist) => {
    return artist.name?.toLowerCase().includes(name.toLowerCase())
}
export const playlistsNameFilter = (name: string) => (playlist: Playlist) => {
    return playlist.name?.toLowerCase().includes(name.toLowerCase())
}

export const formatSecondToMinute = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    const formattedMinutes = String(minutes).padStart(2, "0")
    const formattedSeconds = String(remainingSeconds).padStart(2, "0")
    return `${formattedMinutes}:${formattedSeconds}`

}

export const generateTracksListId = (songListName: string, search?: string) => {
    return `${songListName}${`-${search}` || ""}`
}