import  React,{ Component } from 'react';
import { Text, StyleSheet, Dimensions, Animated, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import * as Facebook from 'expo-facebook';
import { Actions } from 'react-native-router-flux';

const { width, height } = Dimensions.get('window');
export default class FBLogin extends Component {
    logIn = async () => {
        try {
            await Facebook.initializeAsync({
                appId: '152464760030696',
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });
            if (type === 'success') {
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                const first_name = (await response.json()).name
                Actions.push('userdetails', { logintype: 'email', first_name: first_name })
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }
    render() {
        return (
            <>
                <TouchableOpacity onPress={this.logIn}>
                    <Animated.View style={styles.buttonFacebook}>
                        <Icon
                            name="facebook"
                            color="#4267B2"
                            size={26}
                        />
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {' '}
                  Facebook{' '}
                        </Text>
                    </Animated.View>
                </TouchableOpacity>


            </>
        )
    }
}
const styles = StyleSheet.create({
    buttonFacebook: {
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row',
        width: width / 2 - 30,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: 5,
        paddingHorizontal: 5,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: 'black'
    },
})