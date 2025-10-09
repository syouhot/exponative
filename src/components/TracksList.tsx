
import library from '@/assets/data/library.json'
import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import TrackListItem from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<unknown>>

const ItemDivider = ()=>(
  <View style={{...utilsStyles.itemSeparator,marginVertical:9,marginLeft:60}}></View>
)

export default function ({...flatlistProps}:TrackListProps) {
 return (
    <FlatList 
    data={library} 
    ItemSeparatorComponent={ItemDivider}
    renderItem={({item:track})=><TrackListItem track={{
        title:track.title,
        image:track.artwork,
        artist:track.artist
    }}/>}
    {...flatlistProps}
    />
  )
}
