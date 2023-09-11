import React, { useState, useCallback } from 'react';
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';
import Colors from '../constants/Colors';
import { addTree } from '../store/trees-actions';
import { changeTheme } from '../store/theme-actions';
import CustomHeader from '../components/CustomHeader';
import { ThemeName, getStyles } from '../globalSharedStyles';
import { AppDispatch, RootState } from '../store/store';

interface Props {
  navigation: { goBack: () => void };
}

const AddTree: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [buttonPressed, setButtonPressed] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const dispatch: AppDispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const globalStyles = getStyles(theme);

  const handleTitleChange = (text: string) => setTitle(text);
  const handleImageTaken = (imageUri: string) => setImage(imageUri);
  const handleLocationPicked = useCallback(
    (pickedLocation: { lat: number; lng: number }) =>
      setLocation(pickedLocation),
    []
  );

  const handleSaveSample = () => {
    // Implementation for the Save Sample button
  };

  const handleRetakeSample = () => {
    // Implementation for the Retake Sample button
  };

  const handleSave = () => {
    if (!title || !image || !location) {
      // Handle error: show an error message to the user
      return;
    }
    setButtonPressed(false);
    console.log('Submit Pressed');
    dispatch(addTree(title, image, location));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <CustomHeader
        theme={theme}
        setTheme={(theme: ThemeName) => dispatch(changeTheme(theme))}
      />
      <View style={globalStyles.form}>
        <Text style={globalStyles.label}>Title</Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={handleTitleChange}
          value={title}
        />
        <ImagePicker onImageTaken={handleImageTaken} />
        <View style={{ marginTop: 0 }}>
          <LocationPicker
            onLocationPicked={handleLocationPicked}
            navigation={undefined}
            route={undefined}
          />
        </View>

        {/* Action Button Section */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity
            style={[
              globalStyles.button,
              { backgroundColor: globalStyles.success, flex: 1, marginRight: 10 },
            ]}
            onPress={handleSaveSample}
          >
            <Text style={globalStyles.buttonText}>Save Sample</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              globalStyles.button,
              { backgroundColor: globalStyles.error, flex: 1, marginLeft: 10 },
            ]}
            onPress={handleRetakeSample}
          >
            <Text style={globalStyles.buttonText}>Retake Sample</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={globalStyles.button}
          onPressIn={() => {
            setButtonPressed(true);
          }}
          onPressOut={handleSave}
        >
          <Text style={globalStyles.buttonText}>Save Tree</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddTree;
