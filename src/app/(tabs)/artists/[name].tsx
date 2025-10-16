import ArtistTracksList from '@/components/ArtistTracksList'
import { useArtists } from '@/store/library'
import { defaultStyle } from '@/styles'
import { Redirect, useLocalSearchParams } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

export default function ArtistDetailScreen() {
  const { name: artistName } = useLocalSearchParams<{ name: string }>()
  const artists = useArtists()
  const artist = artists.find(artist => artist.name === artistName)
  if (!artist) return <Redirect href={`/(tabs)/artists`} />
  return (
    <View style={defaultStyle.container}>
        <ArtistTracksList artist={artist} />
    </View>
  )
}
