import * as FileSystem from 'expo-file-system';
import { insertTree, fetchTrees } from '../helpers/db';
import { Alert } from 'react-native';

const googleApiKey = 'AIzaSyDcVdjaSqUNtAnuh9WSej_YoG3JUasgLLE';

export const ADD_TREE = 'ADD_TREE';
export const SET_TREES = 'SET_TREES';

export const addTree = (title, image, location) => {
    return async dispatch => {
        const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${googleApiKey}`
          );
      
          if (!response.ok) {
              
            throw new Error('Something went wrong!');
          }
      
          const resData = await response.json();
          if (!resData.results) {
            throw new Error('Something went wrong!');
          }
      
          let address = `Coordinates: ${location.lat},${location.lng}` ;
          if(resData.status === 'REQUEST_DENIED'){
            Alert.alert("Unauthorized", 
            "The Api is not authorized. This funtionality is disabled and the tree address cannot be resolved.", [{text: "OK"}])
          }
          else
          {
            address = resData.results[0].formatted_address;
          }
        
        const fileName = image.split('/').pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath
            });

            const dbResult = await insertTree(
                title,
                newPath,
                address,
                location.lat,
                location.lng
        );

            dispatch({
                type: ADD_TREE, treeData: {
                    id: dbResult.insertId,
                    title: title,
                    image: newPath,
                    address: address,
                    coords: {
                      lat: location.lat,
                      lng: location.lng
                    }
                } });
        }catch(err) {
            console.log(err);
            throw err;
        }
    };
};

export const loadTrees = () => {
    return async dispatch => {

        try {
            const dbResult = await fetchTrees();
            dispatch({ type: SET_TREES, trees: dbResult.rows._array });

        }catch(err) {
            throw err;
        }
    }
};