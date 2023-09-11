import React, { useState, useEffect } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { IconButton } from 'react-native-paper';
import { syncWithCloud } from '../helpers/SyncHelper';
import { Provider, useSelector } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { StatusBar, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { init } from '../helpers/db';
import treesReducer from '../store/trees-reducer';
import * as Font from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getStyles, themeColors, ThemeName } from '../globalSharedStyles';
import CustomHeader from '../components/CustomHeader';
import { themeReducer } from '../store/theme-reducer';
import { changeTheme } from '../store/theme-actions';
import { useDispatch } from 'react-redux';
import store from '../store/store';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [fontLoaded, setFontLoaded] = useState(false);
  const [text, setText] = useState('');
  const [textarea, setTextarea] = useState(''); // Added new state for textarea
  const [buttonPressed, setButtonPressed] = useState(false);
  const navigation = useNavigation();
  const theme = useSelector(state => state.theme.theme);
  const styles = getStyles(theme);

  useEffect(() => {
      async function loadFont() {
          await Font.loadAsync({
              'Roboto-Bold': require('../../assets/fonts/Roboto-Bold.ttf'),
              'Roboto-Regular': require('../../assets/fonts/Roboto-Regular.ttf'),
          });
          setFontLoaded(true);
      }
      loadFont();
  }, []);

  if (!fontLoaded) {
      return null;
  }

  return (
      <Provider store={store}>
          <View style={styles.container}>
          <CustomHeader theme={theme} setTheme={(theme: ThemeName) => dispatch(changeTheme(theme))} />

              <View style={styles.contentContainer}>
                  {/* <TextInput 
                      style={styles.input}
                      onChangeText={setText}
                      value={text}
                      placeholder="Enter Text..."
                      placeholderTextColor={themeColors[theme].text}
                  /> */}
                  {/* <TextInput 
                      style={[styles.input, { height: 200 }]} // Added new TextInput for textarea with a larger height
                      onChangeText={setTextarea}
                      value={textarea}
                      placeholder="Enter more Text..."
                      placeholderTextColor={themeColors[theme].text}
                      multiline={true}
                  /> */}
                  <TouchableOpacity 
                      style={styles.button} 
                      onPressIn={() => { 
                          setButtonPressed(true); 
                          console.log(text); 
                      }}
                      onPressOut={() => { 
                          setButtonPressed(false); 
                          navigation.navigate('AddTree'); 
                      }}
                  >
                      <Text style={styles.buttonText}>Add Tree</Text>
                  </TouchableOpacity>
              </View>
          </View>
          <View style={{ backgroundColor: themeColors[theme].background, padding: 10, alignItems: 'left', }}>
              <IconButton 
                  icon='sync' 
                  onPress={syncWithCloud}
                  iconColor={themeColors[theme].buttonText} // Changed from iconColor to color
                  style={{ backgroundColor: themeColors[theme].buttonBackground }}
              />
          </View>
      </Provider>
  );
}
