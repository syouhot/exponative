import SearchIndex from "@/app/search";
import library from '@/assets/data/library.json';
import TracksList from "@/components/TracksList";
import { screenPadding } from "@/constants/theme";
import { trackTitleFilter } from "@/helper";
import { defaultStyle } from "@/styles";
import { useMemo, useState } from "react";
import { Platform, ScrollView, View } from "react-native";
export default function SongsScreen() {
    const [searchValue, setSearchValue] = useState("")
    const setSearchValueHander = (value: string) => {
        setSearchValue(value)
        console.log(value);
    }
    const filteredTracks = useMemo(() => {
        if (!searchValue) return library
        return library.filter(trackTitleFilter(searchValue))
    }, [searchValue])
    return <View style={defaultStyle.container}>
        {Platform.OS === "ios" ? null : <SearchIndex searchValue={searchValue} setSearchValue={setSearchValueHander} />}
        <ScrollView contentInsetAdjustmentBehavior="automatic"
            style={{ paddingHorizontal: screenPadding.horizontal }}>
            {Platform.OS === "ios" ? <SearchIndex searchValue={searchValue} setSearchValue={setSearchValueHander} /> : null}
            <TracksList scrollEnabled={false} tracks={filteredTracks} />
        </ScrollView>
    </View>
} 