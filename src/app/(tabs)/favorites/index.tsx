import SearchIndex from '@/app/search';
import library from '@/assets/data/library.json';
import TracksList from "@/components/TracksList";
import { screenPadding } from '@/constants/theme';
import { defaultStyle } from "@/styles";
import { useMemo, useState } from 'react';
import { Platform, ScrollView, View } from "react-native";

export default function FavoritesScreen() {
    const [searchValue, setSearchValue] = useState("")
    const favoritesTracks = useMemo(() => {
        return library.filter(track => track.rating === 1)
    }, [])
    if (Platform.OS === "ios") return <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={[{ paddingHorizontal: screenPadding.horizontal }, defaultStyle.container]}>
        <SearchIndex searchValue={searchValue} setSearchValue={(v) => setSearchValue(v)} />
        <TracksList tracks={favoritesTracks} scrollEnabled={false} />
    </ScrollView>

    return <View style={defaultStyle.container}>
        <SearchIndex searchValue={searchValue} setSearchValue={(v) => setSearchValue(v)} />
        <ScrollView contentInsetAdjustmentBehavior="automatic"
            style={{ paddingHorizontal: screenPadding.horizontal }}>
            <TracksList tracks={favoritesTracks} scrollEnabled={false} />
        </ScrollView>
    </View >

}