import SearchIndex from "@/app/search";
import { Track } from "@/components/TrackListItem";
import TracksList from "@/components/TracksList";
import { screenPadding } from "@/constants/theme";
import { useGlobalContext } from "@/context";
import { generateTracksListId, trackTitleFilter } from "@/helper";
import { useTracks } from "@/store/library";
import { defaultStyle } from "@/styles";
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import { useEffect, useMemo, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
export default function SongsScreen() {
    const { player, setPlayer, status, setStatus } = useGlobalContext()
    const tracks = useTracks()
    //初始化播放器
    const firstPlayer = useAudioPlayer(tracks[0].url)
    const firstStatus = useAudioPlayerStatus(firstPlayer)
    useEffect(() => {
        setStatus(firstStatus)
        setPlayer(firstPlayer)
    }, [firstStatus])
    const [searchValue, setSearchValue] = useState("")
    const setSearchValueHander = (value: string) => {
        setSearchValue(value)
    }
    const filteredTracks: Track[] = useMemo(() => {
        if (!searchValue) return tracks
        return tracks.filter(trackTitleFilter(searchValue))
    }, [searchValue, tracks])
    if (Platform.OS === "ios") return (
        <ScrollView style={defaultStyle.container} contentInsetAdjustmentBehavior="automatic">
            <SearchIndex searchValue={searchValue} setSearchValue={setSearchValueHander} />
            {/* <View
                style={{ paddingHorizontal: screenPadding.horizontal }}>
            </View> */}
            <TracksList scrollEnabled={false} tracks={filteredTracks} id="song"/>
        </ScrollView>
    )
    return <View style={defaultStyle.container}>
        <SearchIndex searchValue={searchValue} setSearchValue={setSearchValueHander} />
        <ScrollView contentInsetAdjustmentBehavior="automatic"
            style={{ paddingHorizontal: screenPadding.horizontal }}>
            <TracksList scrollEnabled={false} tracks={filteredTracks} id={generateTracksListId("songs", searchValue)} />
        </ScrollView>
    </View>
} 