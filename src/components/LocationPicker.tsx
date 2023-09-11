// LocationPicker.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { IconButton } from 'react-native-paper';
import Colors from '../constants/Colors';
import MapPreview from './MapPreview';

interface LocationPickerProps {
  navigation: any; // Define the types as per your navigation structure
  route: any; // Define the types as per your route structure
  onLocationPicked: (location: { lat: number; lng: number }) => void;
}

const LocationPicker: React.FC<LocationPickerProps> = (props) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState<{ lat: number; lng: number; } | null>(null);
  const mapPickedLocation = props.route?.params?.pickedLocation || null;
  const { onLocationPicked } = props;

  useEffect(() => {
    if (mapPickedLocation) {
      setPickedLocation(mapPickedLocation);
      onLocationPicked(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationPicked]);

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert('Insufficient permissions!', 'You need to grant locations permissions to use this app', [{ text: 'OK' }]);
      return false;
    }
    return true;
  }

  const onLocationPick = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setIsFetching(true);
      const location = await Location.getCurrentPositionAsync({ timeout: 5 * 1000 });
      setPickedLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
      props.onLocationPicked({ lat: location.coords.latitude, lng: location.coords.longitude });
    } catch (err) {
      Alert.alert('Could not fetch location', 'Try again later or pick a location on the map.', [{ text: 'OK' }]);
    }
    setIsFetching(false);
  };

  const onMapPick = () => {
    props.navigation.navigate('Map');
  };

  return (
    <View style={styles.locationPicker}>
      <MapPreview style={styles.mapPreview} location={pickedLocation} onPress={onMapPick}>
        {isFetching ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <Text>No location chosen yet!</Text>
        )}

      </MapPreview>
      <View style={styles.actions}>
        <IconButton icon="crosshairs-gps" size={45} onPress={onLocationPick} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    marginTop: 30
  },
  mapPreview: {
    marginBottom: 0,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1
  },
  iconButton: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor: 'white',
    borderRadius: 30
  },
  iconButtonInner: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  actions: {
    position: 'absolute',
    left: -1,
    bottom: -10,
    justifyContent: 'center',  // Added
    alignItems: 'center',  // Added
  },
});

export default LocationPicker;
