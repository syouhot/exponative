import { Track } from '@/components/TrackListItem'
import { AudioPlayer, AudioStatus } from 'expo-audio'
import React, { useState } from 'react'

type GlobalContext = {
    activeTrack: Track | undefined
    setActiveTrack: (track: Track | undefined) => void
    player: AudioPlayer | undefined
    setPlayer: (player: AudioPlayer | undefined) => void,
    status: AudioStatus | undefined,
    setStatus: (status: AudioStatus | undefined) => void,
    trackList: Track[]
    setTrackList: (trackList: Track[]) => void
}

const context = React.createContext<GlobalContext>({
    activeTrack: undefined,
    setActiveTrack: () => { },
    player: undefined,
    setPlayer: () => { },
    status: undefined,
    setStatus: () => { },
    trackList: [],
    setTrackList: () => { }
})
export default function ContextProvider({ children }: { children: React.ReactNode }) {
    const [activeTrack, setActiveTrack] = useState<Track>()
    const [player, setPlayer] = useState<AudioPlayer>()
    const [status, setStatus] = useState<AudioStatus>()
    const [trackList, setTrackList] = useState<Track[]>([])
    return <context.Provider value={{ activeTrack, setActiveTrack, player, setPlayer, status, setStatus, trackList, setTrackList }}>
        {children}
    </context.Provider>
}


export const useGlobalContext = () => React.useContext(context)
