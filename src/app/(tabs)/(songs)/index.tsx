import SearchIndex from "@/app/search";
import TracksList from "@/components/TracksList";
import { screenPadding } from "@/constants/theme";
import { defaultStyle } from "@/styles";
import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function SongsScreen(){
    const [searchValue,setSearchValue] = useState("")
    return <View style={defaultStyle.container}>
        <ScrollView contentInsetAdjustmentBehavior="automatic"
        style={{paddingHorizontal:screenPadding.horizontal}}>
             <SearchIndex searchValue={searchValue}/>
            <TracksList scrollEnabled={false} />
        </ScrollView>
    </View>
} 