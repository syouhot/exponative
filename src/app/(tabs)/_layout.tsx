import { colors, fontSize } from "@/constants/theme";
import { FontAwesome, FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

export default function TabsNavigation(){
 return <Tabs screenOptions={{
  tabBarActiveTintColor:colors.primary,
  tabBarLabelStyle:{
    fontSize:fontSize.xs,
    fontWeight:"bold"
  },
  headerShown:false,
  tabBarStyle:{
    position:"absolute",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    borderTopWidth:0,
    paddingTop:8
  },
  tabBarBackground:()=> <BlurView intensity={25} style={{
    ...StyleSheet.absoluteFillObject,
    overflow:"hidden",
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
  }}/>,
 }}>
    <Tabs.Screen name="favorites" options={{
      title:"Favorites",
      headerTitleAlign:"center",
      tabBarIcon:({color})=><FontAwesome name="heart" size={20} color={color} />
    }}/>
    <Tabs.Screen name="playlists" options={{
      title:"Playlists",
      headerTitleAlign:"center",
      tabBarIcon:({color})=><MaterialCommunityIcons name="playlist-music" size={24} color={color} />
    }}/>
    <Tabs.Screen name="(songs)" options={{
      title:"Songs",
      headerTitleAlign:"center",
      tabBarIcon:({color})=><Ionicons name="musical-notes-sharp" size={24} color={color} />
      }}/>
    <Tabs.Screen name="artists" options={{
      title:"Artists",
      headerTitleAlign:"center",
      tabBarIcon:({color})=><FontAwesome6 name="users-line" size={20} color={color} />
    }}/>
  </Tabs>
}