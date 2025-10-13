import { useGlobalContext } from "@/context";
import { useCallback, useEffect, useState } from "react";

export default function useTrackPlayerRepeatMode() {
    const { player } = useGlobalContext()
    const [repeatMode, setRepeatMode] = useState<number|undefined>(undefined)
    const changeRepeatMode = useCallback(async (repeatMode: number) => {
        if (player) {
            switch (repeatMode) {
                case 0:
                    player.loop = false
                    break
                case 1:
                    player.loop = true
                    break
                default:
                    player.loop = false
                    break
            }
            setRepeatMode(repeatMode)
        }
    }, [])
    useEffect(() => {
        setRepeatMode(player?.loop ? 1 : 0)
    }, [])

    return { repeatMode,changeRepeatMode }
}
