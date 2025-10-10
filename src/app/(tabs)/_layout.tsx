import { colors, fontSize } from "@/constants/theme";
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { Platform, StyleSheet } from "react-native";
const androidHeaderStyle = {
  headerStyle: {
    backgroundColor: colors.background,
  },
  headerTitleStyle: {
    color: colors.text
  },
}
export default function TabsNavigation() {
  return <Tabs screenOptions={{
    tabBarActiveTintColor: colors.primary,
    tabBarLabelStyle: {
      fontSize: fontSize.xs,
      fontWeight: "bold"
    },
    headerShown: Platform.OS === "ios" ? false : true,
    ...(Platform.OS === "ios" ? {} : androidHeaderStyle),
    tabBarStyle: {
      position: "absolute",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      borderTopWidth: 0,
      paddingTop: 8,
      height: 70,
    },
    tabBarBackground: () => <BlurView intensity={40} style={{
      ...StyleSheet.absoluteFillObject,
      overflow: "hidden",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      ...Platform.select({
        android:{
          backgroundColor: "#1c1c1c"

        }
      })
    }} />,
  }}>
    <Tabs.Screen name="favorites" options={{
      title: "Favorites",
      headerTitleAlign: "center",
      tabBarIcon: ({ color }) => <FontAwesome name="heart" size={20} color={color} />
    }} />
    <Tabs.Screen name="playlists" options={{
      title: "Playlists",
      headerTitleAlign: "center",
      tabBarIcon: ({ color }) => <MaterialCommunityIcons name="playlist-music" size={24} color={color} />
    }} />
    <Tabs.Screen name="(songs)" options={{
      title: "Songs",
      headerTitleAlign: "center",
      tabBarIcon: ({ color }) => <Ionicons name="musical-notes-sharp" size={24} color={color} />
    }} />
    <Tabs.Screen name="artists" options={{
      title: "Artists",
      headerTitleAlign: "center",
      tabBarIcon: ({ color }) => <FontAwesome6 name="users-line" size={20} color={color} />
    }} />
  </Tabs>
}