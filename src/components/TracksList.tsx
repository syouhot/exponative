

import { unknownTrackImageUri } from '@/constants/images'
import { useGlobalContext } from '@/context'
import { useQueue } from '@/store/queue'
import { utilsStyles } from '@/styles'
import { createAudioPlayer } from 'expo-audio'
import { Image } from 'expo-image'
import { useRef } from 'react'
import { FlatList, FlatListProps, Text, View } from 'react-native'
import TrackListItem, { Track } from './TrackListItem'

export type TrackListProps = Partial<FlatListProps<Track>> & {
  id: string
  tracks: Track[]
}

const ItemDivider = () => (
  <View style={{ ...utilsStyles.itemSeparator, marginVertical: 9, marginLeft: 60 }}></View>
)
export default function TracksList({ id, tracks, ...flatlistProps }: TrackListProps) {
  const queueOffset = useRef(0)
  const { activedQueueId, setActiveQueueId } = useQueue()
  const { player, setPlayer ,trackList,setTrackList} = useGlobalContext()
  const handleTrackSelect = async (selectTrack: Track) => {
    const trackIndex = tracks.findIndex(track => track.url === selectTrack.url)
    if (trackIndex === -1) return

    const isChangingQueue = id! == activedQueueId
    if(trackList.length<=0 && player){
      player.volume = 0.5
    }
    setTrackList(tracks)
    if (isChangingQueue) {
      const beforeTracks = tracks.slice(0, trackIndex)
      const afterTracks = tracks.slice(trackIndex + 1)
      if (player) {
        await player?.replace(selectTrack.url)
      } else {
        await setPlayer(createAudioPlayer(selectTrack.url))
      }
      await player?.play()
      queueOffset.current = trackIndex
      setActiveQueueId(id)
    } else {
      const nextTrackIndex = trackIndex - queueOffset.current < 0 ?
        tracks.length + trackIndex - queueOffset.current :
        trackIndex - queueOffset.current
      const nextTrack = tracks[nextTrackIndex]
      await player?.replace(nextTrack.url)
      await player?.play()
    }
    // if (player) {
    //   await player?.replace(track.url)
    // } else {
    //   await setPlayer(createAudioPlayer(track.url))
    // }
    // await player?.play()
  }
  return (
    <FlatList
      data={tracks}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 128, justifyContent: "flex-start", alignItems: "flex-start", flexGrow: 0 }}
      ItemSeparatorComponent={ItemDivider}
      ListFooterComponent={ItemDivider}
      ListEmptyComponent={<View style={{ width: "100%" }}>
        <Text style={utilsStyles.emptyComponentText}>No Songs found</Text>
        <Image source={{ uri: unknownTrackImageUri }} style={utilsStyles.emptyComponentImage} />
      </View>}
      renderItem={({ item: track }) => <TrackListItem track={track} onTrackSelect={handleTrackSelect} />}
      {...flatlistProps}
    />
  )
}
