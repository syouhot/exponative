import SearchIndex from '@/app/search';
import TracksList from "@/components/TracksList";
import { screenPadding } from '@/constants/theme';
import { generateTracksListId, trackTitleFilter } from '@/helper';
import { useFavorites } from '@/store/library';
import { defaultStyle } from "@/styles";
import { useMemo, useState } from 'react';
import { Platform, ScrollView, View } from "react-native";

export default function FavoritesScreen() {
    const [searchValue, setSearchValue] = useState("")
    // const filteredFavoritesTracks = useMemo(() => {
    //     let list = library.filter(track => track.rating === 1)
    //     if (searchValue)
    //         return list.filter(trackTitleFilter(searchValue))
    //     return list
    // }, [searchValue])
    const favoritesTracks = useFavorites().favorites
    const filteredFavoritesTracks = useMemo(() => {
        return searchValue ? favoritesTracks.filter(trackTitleFilter(searchValue)) : favoritesTracks
    }, [searchValue, favoritesTracks])
    if (Platform.OS === "ios") return <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={[{ paddingHorizontal: screenPadding.horizontal }, defaultStyle.container]}>
        <SearchIndex searchValue={searchValue} setSearchValue={(v) => setSearchValue(v)} />
        <TracksList tracks={filteredFavoritesTracks} scrollEnabled={false} id={generateTracksListId("favorites", searchValue)}/>
    </ScrollView>

    return <View style={defaultStyle.container}>
        <SearchIndex searchValue={searchValue} setSearchValue={(v) => setSearchValue(v)} />
        <ScrollView contentInsetAdjustmentBehavior="automatic"
            style={{ paddingHorizontal: screenPadding.horizontal }}>
            <TracksList tracks={filteredFavoritesTracks} scrollEnabled={false} id={generateTracksListId("favorites", searchValue)} />
        </ScrollView>
    </View >

}