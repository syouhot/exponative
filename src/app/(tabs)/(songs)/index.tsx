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
    if (Platform.OS === "ios") return (
        <ScrollView style={defaultStyle.container} contentInsetAdjustmentBehavior="automatic">
            <SearchIndex searchValue={searchValue} setSearchValue={setSearchValueHander} />
            <View 
                style={{ paddingHorizontal: screenPadding.horizontal }}>
                <TracksList scrollEnabled={false} tracks={filteredTracks} />
            </View>
        </ScrollView>
    )
    return <View style={defaultStyle.container}>
        <SearchIndex searchValue={searchValue} setSearchValue={setSearchValueHander} />
        <ScrollView contentInsetAdjustmentBehavior="automatic"
            style={{ paddingHorizontal: screenPadding.horizontal }}>
            <TracksList scrollEnabled={false} tracks={filteredTracks} />
        </ScrollView>
    </View>
} 