import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveUser = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        return value;
    }
};
