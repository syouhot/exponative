

import { utilsStyles } from '@/styles'
import { FlatList, FlatListProps, View } from 'react-native'
import { Track } from 'react-native-track-player'
import TrackListItem from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[]
}

const ItemDivider = () => (
  <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}></View>
)
export default function TracksList({ tracks, ...flatlistProps }: TrackListProps) {

  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 128 ,justifyContent:"flex-start",alignItems:"flex-start",flexGrow:0}}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      renderItem={({ item: track }) => <TrackListItem track={track} />}
      {...flatlistProps}
    />
  )
}
