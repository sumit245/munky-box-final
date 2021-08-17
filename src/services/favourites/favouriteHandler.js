import AsyncStorage from '@react-native-async-storage/async-storage';

export const getFavourite = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}
export const setFavourite = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log(e);
    }
};

export const updateFavourite = (key, value) => {
    AsyncStorage.getItem(key, (err, result) => {
        if (result !== null) {
            var newIds = JSON.parse(result)//.concat(value);
            console.log('Data Found', typeof newIds);
            // AsyncStorage.setItem(key, JSON.stringify(newIds));
        } else {
            console.log('Data Not Found');
            AsyncStorage.setItem(key, JSON.stringify(value));
        }
    });
}
export const removeFavourite = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
    }
    console.log('Done.')
}


