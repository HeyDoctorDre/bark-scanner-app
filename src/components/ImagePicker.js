// ImgPicker.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getStyles, ThemeName } from '../globalSharedStyles';

const ImgPicker = props => {
    const [pickedImage, setPickedImage] = useState();
    const theme = useSelector((state: RootState) => state.theme.theme);
    const styles = getStyles(theme);

    const localStyles = StyleSheet.create({
        ...styles,
        iconButton: {
            position: 'absolute',
            left: 10,
            top: -11,
            justifyContent: 'center',  // Added
            alignItems: 'center',  // Added
        },
    });

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions!', 'You need to grant camera permissions to use this app.', [{ text: 'OK' }]);
            return false;
        }
        return true;
    };

    const onTakeImage = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5,
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <View style={{ alignContent: 'center', alignItems: 'center' }}>
                        <Text>No image picked yet</Text>
                    </View>
                ) : (
                    <Image style={styles.image} source={{ uri: pickedImage }} />
                )}
                <TouchableOpacity style={localStyles.iconButton} onPress={onTakeImage}>
                    <View style={localStyles.iconButtonInner}>
                        <MaterialCommunityIcons name="camera" size={48} color={styles.iconColor} />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ImgPicker;