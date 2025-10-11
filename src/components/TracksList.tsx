

import { unknownTrackImageUri } from '@/constants/images'
import { utilsStyles } from '@/styles'
import { Image } from 'expo-image'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackListItem, { Track } from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<Track>> & {
  tracks: Track[]
}

const ItemDivider = () => (
  <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}></View>
)
export default function TracksList({ tracks, ...flatlistProps }: TrackListProps) {

  const handleTrackSelect =async (track: Track) => {
    console.log(track);
  }
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 128, justifyContent: "flex-start", alignItems: "flex-start", flexGrow: 0 }}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={<View style={{width:"100%"} }>
        <Text style={utilsStyles.emptyComponentText}>No Songs found</Text>
        <Image source={{ uri: unknownTrackImageUri }} style={utilsStyles.emptyComponentImage } />
      </View>}
      renderItem={({ item: track }) => <TrackListItem track={track} onTrackSelect={handleTrackSelect} />}
      {...flatlistProps}
    />
  )
}
