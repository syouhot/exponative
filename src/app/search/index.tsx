import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, TextInput, View } from 'react-native';
const styles = StyleSheet.create({
  searchView: {
    height: 60, width: "100%",position:"relative"
  },
  searchInput: {
height: 40,
    borderColor: '#1d1c1e',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 40, // 左侧留出图标空间
    paddingRight: 15,
    backgroundColor: '#1d1c1e',
    marginVertical:10,
    color:"#fff"
  },
  icon: {
    position: 'absolute',
    left: 12,
    top: 20,
    zIndex: 1, // 确保图标在输入框上方
  }
})

export default function SearchIndex({ searchValue }: { searchValue: string }) {
  return (
    <View style={styles.searchView}>
      <Feather name="search" size={20} color="#89898d" style={styles.icon}/>
      <TextInput style={styles.searchInput} value={searchValue} placeholderTextColor={"#999"} placeholder='Find in songs' selectionColor={"#89898d"}></TextInput>
    </View>
  );
}
