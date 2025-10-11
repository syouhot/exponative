import { Track } from '@/components/TrackListItem'
import { useGlobalContext } from '@/context'
import React, { useEffect } from 'react'

export default function useLastActiveTrack() {
    const { activeTrack, setActiveTrack } = useGlobalContext()
    const [lastActiveTrack, setLastActiveTrack] = React.useState<Track>()
    useEffect(() => { 
        if(!activeTrack) return
        setLastActiveTrack(activeTrack)
    }, [activeTrack])
    
    return lastActiveTrack
}
