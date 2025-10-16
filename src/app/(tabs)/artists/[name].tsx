import ArtistTracksList from '@/components/ArtistTracksList'
import { useArtists } from '@/store/library'
import { defaultStyle } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { Platform, ScrollView, View } from 'react-native'

export default function ArtistDetailScreen() {
  const { name: artistName } = useLocalSearchParams<{ name: string }>()
  const artists = useArtists()
  const artist = artists.find(artist => artist.name === artistName)
  if (!artist) return <Redirect href={`/(tabs)/artists`} />
  if (Platform.OS === "ios") return (
    <ScrollView style={defaultStyle.container} contentInsetAdjustmentBehavior="automatic">
      <ArtistTracksList artist={artist} />
    </ScrollView>
  )

  return (
    <View style={defaultStyle.container}>
        <ArtistTracksList artist={artist} />
    </View>
  )
}
