import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, TextInput, TouchableOpacity, View, ViewProps } from 'react-native';
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    backgroundColor: 'black',
    zIndex: 2,
    height: 40,
    marginVertical:10
  },
  searchView: {
    height: 40,
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: '#1d1c1e',
    borderColor: '#1d1c1e',
    borderWidth: 1,
    borderRadius: 8,
    width:"90%"
  },
  searchInput: {
    height: 40,
    paddingLeft: 40, // 左侧留出图标空间
    paddingRight: 15,
    color: "#fff",
    width: "100%",
  },
  icon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
})
interface searchProp extends ViewProps{
  searchValue:string,
  setSearchValue:(v:string) => void,
}
export default function SearchIndex({ searchValue, setSearchValue ,style}: searchProp) {
  return (
    <View style={styles.container} >
      <View style={[styles.searchView,style]}>
        <Feather name="search" size={20} color="#89898d" style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          value={searchValue}
          placeholderTextColor={"#999"}
          placeholder='Find in songs'
          selectionColor={"#89898d"}
          onChangeText={setSearchValue}
          clearButtonMode='while-editing'
        >
        </TextInput>
        <TouchableOpacity onPress={() => setSearchValue("")} style={{ justifyContent: "center", alignItems: "center" }}>
          {searchValue.length > 0 && <Feather name="x" size={20} color="#89898d" style={styles.clearButton} />}
        </TouchableOpacity>
      </View>
    </View>
  );
}
