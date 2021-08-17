import AsyncStorage from '@react-native-async-storage/async-storage';

export const getCard = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue !== null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log(e)
    }
}

export const setCard = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log(e);
    }
};

export const setMultipleCards = async (card) => {
    try {
        await AsyncStorage.multiSet([card])
    } catch (e) {
        //save error
    }
}
export const getMultipleCards = async (cards) => {
    let values
    try {
        values = await AsyncStorage.multiGet(cards)
        return values
    } catch (e) {
        // read error
    }
}
export const getAllKeys = async () => {
    let keys = []
    try {
        keys = await AsyncStorage.getAllKeys()
        return keys
    } catch (e) {
        // read key error
    }
}
export const removeCard = async (card) => {
    try {
        await AsyncStorage.removeItem(card)
    } catch (e) {
        // remove error
    }
    console.log('Done.')
}




