import React from 'react';
import { TouchableOpacity, Text, View, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getStyles, themeColors, ThemeName } from '../globalSharedStyles';
interface Props {
theme: ThemeName;
setTheme: (theme: ThemeName) => void;
}
const CustomHeader: React.FC<Props> = ({ theme, setTheme }) => {
const navigation = useNavigation();
const styles = getStyles(theme);
return (
<View style={{ ...styles.statusBar, flexDirection: 'row', justifyContent: 'space-between' }}>
<View style={styles.titleContainer}>
<Text style={styles.baseText}>Bark Scanner</Text>
</View>
<View style={{ flex: 1, alignItems: 'flex-end', position: 'absolute', right: 0, top: 0 }}>
<TouchableOpacity onPress={() => {
setTheme(theme === 'light' ? 'dark' : 'light');
if (theme === 'dark') {
console.log('Light Theme');
StatusBar.setBarStyle('dark-content');
} else {
console.log('Dark Theme');
StatusBar.setBarStyle('light-content');
}
}} style={styles.themeSwitcher}>
<MaterialCommunityIcons name={theme === 'light' ? 'weather-night' : 'white-balance-sunny'} size={40} color={themeColors[theme].phoneControlsColor} />
</TouchableOpacity>
</View>
</View>
);
};
export default CustomHeader;