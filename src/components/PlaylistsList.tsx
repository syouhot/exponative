import { unknownArtistImageUri } from "@/constants/images"
import { playlistsNameFilter } from "@/helper"
import { Playlist } from "@/helper/type"
import { utilsStyles } from "@/styles"
import { Image } from "expo-image"
import { useMemo, useState } from "react"
import { FlatList, FlatListProps, Text, View } from "react-native"
import PlaylistListItem from "./PlaylistListItem"


type PlaylistsListProps = {
    playlists: Playlist[],
    onPlaylistPress: (playlist: Playlist) => void
} & Partial<FlatListProps<Playlist>>

const Itemdivider = ()=><View style={[utilsStyles.itemSeparator,{marginLeft:80,marginVertical:12}]}/>
export default function PlaylistsList({ playlists, onPlaylistPress, ...flatListProps }: PlaylistsListProps) {
    const [searchValue, setSearchValue] = useState("")
    const filteredPlaylists = useMemo(() => {
        if (searchValue) return playlists.filter(playlistsNameFilter(searchValue))
        return playlists
    },[searchValue,playlists])
    return (
        <FlatList
        contentContainerStyle={{paddingTop:10,paddingBottom:128}}
        data={filteredPlaylists}
        {...flatListProps}
        ItemSeparatorComponent={Itemdivider}
        ListFooterComponent={Itemdivider}
        ListEmptyComponent={()=><View style={{height:12}}>
            <Text style={utilsStyles.emptyComponentText}>No Playlists found</Text>
            <Image style={utilsStyles.emptyComponentImage} source={unknownArtistImageUri} />
        </View>}
        renderItem={({item:playlist})=><PlaylistListItem playlist={playlist} onPress={()=>onPlaylistPress(playlist)}/>}
        ></FlatList>
    )
}
