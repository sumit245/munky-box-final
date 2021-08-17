import React,{ Component } from 'react';
import { View, Text, Dimensions } from 'react-native'
const { width, height } = Dimensions.get('window');
export default class Logo extends Component {
    render() {
        return (
            <>
                <View style={{ flexDirection: 'row',alignSelf:'center',justifyContent:'center',top:-150 }}>
                    <Text style={{ color: "#F15050", fontSize: 30, fontWeight: 'bold' }}>Munky</Text>
                    <Text style={{ color: "#155ef6", fontSize: 29, fontWeight: 'bold' }}>Box</Text>
                </View>

            </>
        )
    }
}
