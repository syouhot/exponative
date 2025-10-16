import SearchIndex from "@/app/search";
import { unknownArtistImageUri } from "@/constants/images";
import { screenPadding } from "@/constants/theme";
import { artistsNameFilter } from "@/helper";
import { Artist } from "@/helper/type";
import { useArtists } from "@/store/library";
import { defaultStyle, utilsStyles } from "@/styles";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Platform, ScrollView, StyleSheet, Text, TouchableHighlight, View } from "react-native";
export default function ArtistsScreen() {
    const [searchValue, setSearchValue] = useState("")

    const artists = useArtists()

    const ItemSeparatorComponent = () => <View style={
        [utilsStyles.itemSeparator,
        { marginLeft: 50, marginVertical: 12 }]
    } />
    const filteredArtists = useMemo(() => {
        if (searchValue) return artists.filter(artistsNameFilter(searchValue))
        return artists
    }, [searchValue])
    if (Platform.OS === "ios") return (
        <ScrollView style={defaultStyle.container}>
            <SearchIndex searchValue={searchValue} setSearchValue={setSearchValue} />
            <FlatList
                data={filteredArtists}
                scrollEnabled={false}
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
                ItemSeparatorComponent={ItemSeparatorComponent}
                ListFooterComponent={ItemSeparatorComponent}
                ListEmptyComponent={
                    <View>
                        <Text>No Artists found</Text>
                        <Image source={unknownArtistImageUri} />
                    </View>
                }
                renderItem={({ item: artist }: { item: Artist }) => {
                    return <Link href={`/artists/${artist.name}`} asChild>
                        <TouchableHighlight activeOpacity={0.8}>
                            <View style={styles.artistItemContainer}>
                                <View>
                                    <Image source={unknownArtistImageUri} style={styles.artistImage} />
                                </View>
                                <View style={{ width: "100%" }}>
                                    <Text numberOfLines={1} style={styles.artistNameText}>{artist.name}</Text>
                                </View>
                            </View>
                        </TouchableHighlight>
                    </Link>
                }}
            />
        </ScrollView>
    )
    return (
        <View style={defaultStyle.container}>
            <SearchIndex searchValue={searchValue} setSearchValue={setSearchValue} />
            <ScrollView contentInsetAdjustmentBehavior="automatic"
                style={{ paddingHorizontal: screenPadding.horizontal }}>
                <FlatList
                    data={filteredArtists}
                    scrollEnabled={false}
                    contentContainerStyle={{ paddingTop: 10, paddingBottom: 20 }}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    ListFooterComponent={ItemSeparatorComponent}
                    ListEmptyComponent={
                        <View>
                            <Text>No Artists found</Text>
                            <Image source={unknownArtistImageUri} />
                        </View>
                    }
                    renderItem={({ item: artist }: { item: Artist }) => {
                        return <Link href={`/artists/${artist.name}`} asChild>
                            <TouchableHighlight activeOpacity={0.8}>
                                <View style={styles.artistItemContainer}>
                                    <View>
                                        <Image source={unknownArtistImageUri} style={styles.artistImage} />
                                    </View>
                                    <View style={{ width: "100%" }}>
                                        <Text numberOfLines={1} style={styles.artistNameText}>{artist.name}</Text>
                                    </View>
                                </View>
                            </TouchableHighlight>
                        </Link>
                    }}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    artistItemContainer: {
        flexDirection: "row",
        columnGap: 14,
        alignItems: "center"
    },
    artistImage: {
        borderRadius: 32,
        width: 40,
        height: 40
    },
    artistNameText: {
        ...defaultStyle.text,
        fontSize: 17,
        maxWidth: "80%"
    }
})