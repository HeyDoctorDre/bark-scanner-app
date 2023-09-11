import { StyleSheet, StatusBar } from 'react-native';

export const lightTheme = {
  background: '#F0F0F0',
  text: '#000000',
  switchThumb: '#000',
  switchTrack: 'lightgray',
  buttonBackground: '#000000',
  buttonText: '#FFFFFF',
  borderBottomColor: '#000000',
  inputBackground: '#FFFFFF',
  statusBarBackground: '#D0D0D0',
};

export const darkTheme = {
  background: '#343A40',
  text: '#F8F9FA',
  switchThumb: '#fff',
  switchTrack: '#666',
  buttonBackground: '#6C757D',
  buttonText: '#FFFFFF',
  borderBottomColor: '#FFFFFF',
  inputBackground: '#6C757D',
  statusBarBackground: '#000000',
  clockColor: '#FFFFFF',
  phoneControlsColor: '#FFFFFF',
  statusBarContentColor: 'white',
};

export const themeColors = {
  light: lightTheme,
  dark: darkTheme,
};

export const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors[theme].background,
    alignItems: 'center',
  },

  statusBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors[theme].statusBarBackground,
    height: StatusBar.currentHeight ? StatusBar.currentHeight * 2 : 80,
    paddingHorizontal: 10,
    paddingTop: 30,
    borderBottomWidth: 1,
    borderBottomColor: themeColors[theme].borderBottomColor,
  },

  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },

  baseText: {
    color: themeColors[theme].text,
    fontFamily: 'Roboto-Bold',
    fontSize: 30,
  },

  themeSwitcherLabelText: {
    color: themeColors[theme].text,
    fontFamily: 'Roboto-Bold',
    fontSize: 10,
  },

  input: {
    height: 50,
    width: '90%',
    borderColor: themeColors[theme].text,
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    paddingHorizontal: 10,
    backgroundColor: themeColors[theme].inputBackground,
    color: themeColors[theme].text,
    marginBottom: 20,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 60,
    margin: 20,
    backgroundColor: themeColors[theme].buttonBackground,
    borderColor: themeColors[theme].text,
    borderWidth: 1,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
  },

  buttonText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 27,
    color: themeColors[theme].buttonText,
  },

  modeSwitcher: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },

  form: {
    padding: 20,
    backgroundColor: themeColors[theme].background,
  },

  label: {
    fontSize: 20,
    color: themeColors[theme].text,
  },
});

export type ThemeName = 'light' | 'dark';
