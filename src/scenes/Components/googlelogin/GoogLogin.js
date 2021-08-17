import  React, { Component } from 'react';
import {
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import * as GoogleSignIn from 'expo-google-sign-in';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');
export default class GoogLogin extends Component {
    state = { user: null };
    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        this.setState({ user });
    };
    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                this._syncUserWithStateAsync();
                Actions.replace('userdetails',{logintype:'email'})
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };
    render() {
        return (
            <>
                <TouchableOpacity onPress={this.signInAsync}>
                    <Animated.View style={styles.buttonGoogle}>
                        <Icon
                            name="google"
                            color="red"
                            size={26}
                        />
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}> Google </Text>
                    </Animated.View>
                </TouchableOpacity>

            </>
        )
    }
}
const styles = StyleSheet.create({
    buttonGoogle: {
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row',
        width: width / 2 - 30,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 10,
        paddingHorizontal: 5,
        marginVertical: 5,
    },
});
