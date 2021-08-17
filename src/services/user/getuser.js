import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}
export const removeUser = async (key) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log('you are not logged in')
    }
}
export const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        // clear error
    }
}
export const saveUser = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};


