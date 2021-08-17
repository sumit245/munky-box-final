import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAddress = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};
export const getAddress = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}
export const removeAddress = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        // remove error
    }
    console.log('Done.')
}

