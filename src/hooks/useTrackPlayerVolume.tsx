import { useGlobalContext } from "@/context";
import { useCallback, useEffect, useState } from "react";

export default function useTrackPlayerVolume() {
    const { player } = useGlobalContext()
    const [volume, setVolume] = useState<number | undefined>(undefined)
    const getVolume = useCallback(async () => {
        const currentVolume = await player?.volume ?? undefined
        setVolume(currentVolume)
    }, [])

    const updateVolume = useCallback(async (newVolume: number) => {
        if (newVolume < 0 || newVolume > 1) return
        setVolume(newVolume)
        if (player) {
            player.volume = newVolume
        }

    }, [])
    useEffect(() => {
        getVolume()
    }, [getVolume])


    return { volume, updateVolume }
}
