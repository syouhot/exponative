import library from "@/assets/data/library.json"
import { colors } from "@/constants/theme"
import { useGlobalContext } from "@/context"
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons"
import { TouchableOpacity, View, ViewStyle } from "react-native"
import { Track } from "./TrackListItem"
type PlayControlsProps = {
  style?: ViewStyle
}
type PlayerButtonProps = {
  style?: ViewStyle
  iconSize?: number
}
export function PlayPauseButton({ style, iconSize }: PlayerButtonProps) {
  const { player, status } = useGlobalContext()

  const handlerPlay = async () => {
    player?.playing ?await player?.pause() :await player?.play()
  }
  return (
    <View style={[{ height: iconSize }, style]}>
      <TouchableOpacity activeOpacity={0.85} onPress={handlerPlay}>
        <FontAwesome name={status?.playing ? 'pause' : 'play'} size={iconSize} color={colors.text} />
      </TouchableOpacity>
    </View>
  )
}


export function SkipToNextButton({ iconSize = 30 }: PlayerButtonProps) {
  const { player, activeTrack, setActiveTrack } = useGlobalContext()
  const handleNextTrack = () => {
    const currentTrackIndex = library.findIndex(track => track.artwork === activeTrack?.artwork && track.title === activeTrack?.title)
    const nextTrackIndex = currentTrackIndex + 1
    const track = nextTrackIndex > library?.length - 1 ? library[0] as Track : library[nextTrackIndex] as Track
    setActiveTrack(track)
    player?.replace(track?.url)
    player?.play()
  }
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handleNextTrack}>
      <FontAwesome6 name="forward" size={iconSize} color={colors.text} />
    </TouchableOpacity>
  )
}

export function SkipToPreviousButton({ iconSize = 30 }: PlayerButtonProps) {
  const { player, activeTrack, setActiveTrack } = useGlobalContext()
  const handlePreviousTrack = () => {
    const currentTrackIndex = library.findIndex(track => track.artwork === activeTrack?.artwork && track.title === activeTrack?.title)
    const previousTrackIndex = currentTrackIndex - 1
    const track = previousTrackIndex < 0 ? library[0] as Track : library[previousTrackIndex] as Track
    setActiveTrack(track)
    player?.replace(track?.url)
    player?.play()
  }
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePreviousTrack}>
      <FontAwesome6 name="backward" size={iconSize} color={colors.text} />
    </TouchableOpacity>
  )
}