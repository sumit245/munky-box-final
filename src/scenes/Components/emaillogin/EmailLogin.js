import React, { Component } from 'react';
import { Text, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import styles from "../../styles/AuthStyle"

const { width, height } = Dimensions.get('window');

export default class EmailLogin extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.btnOTP, { marginLeft: 16, top: -40 }]}>
                <Icon
                    name="email"
                    color="#4267B2"
                    size={26}
                />
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Continue with Email
                </Text>
            </TouchableOpacity>

        )
    }
}