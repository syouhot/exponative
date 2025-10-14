import { Track } from "@/components/TrackListItem";

export type TrackWithPaylist = Track & { playlist?: string[] }

export type Playlist = {
    name: string
    tracks: Track[]
    artworkPreview: string
}

export type Artist = {
    name: string
    tracks: Track[]
}