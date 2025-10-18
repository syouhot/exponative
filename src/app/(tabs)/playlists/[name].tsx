import PlaylistTracksList from '@/components/PlaylistTracksList'
import { screenPadding } from '@/constants/theme'
import { usePlaylist } from '@/store/library'
import { defaultStyle } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, View } from 'react-native'

export default function PlaylistScreen() {

    const { name: playlistName } = useLocalSearchParams<{ name: string }>()

    const { playlists } = usePlaylist()
    const playlist = playlists.find(playlist => playlist.name === playlistName)
    if (!playlist) {
        return <Redirect href={`/(tabs)/playlists`} />
    }
  return (
      <View style={defaultStyle.container}>
          <ScrollView style={{paddingHorizontal:screenPadding.horizontal}}>
              <PlaylistTracksList playlist={playlist } />
          </ScrollView>
    </View>
  )
}
