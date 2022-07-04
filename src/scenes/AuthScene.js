import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import MobileLogin from './Components/mobilelogin/MobileLogin';
import EmailLogin from './Components/emaillogin/EmailLogin';
import Logo from './Components/Logo';
import styles from './styles/AuthStyle';
import { LinearGradient } from 'expo-linear-gradient';
import { Provider } from 'react-native-paper';
import Termsandconditions from './Components/mobilelogin/Termsandconditions';
import BackButton from './Components/utility/BackButton';

export default function AuthScene({ navigation }) {
  const [otpSent, setOtpSent] = useState(false);
  const [terms, setTerms] = useState(false);

  const displayHeader = (param) => {
    setOtpSent(param);
  };

  const hideModal = () => {
    setTerms(false);
  };
  return (
    <Provider>
      <ImageBackground
        source={require('../../assets/imagebackground.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        <SafeAreaView style={styles.container}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {otpSent ? <BackButton /> : <View />}
            <LinearGradient colors={['#ff9900', '#ff6600']} style={styles.skip}>
              <TouchableOpacity
                onPress={() => Actions.push('home', { logintype: '' })}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#fff',
                    textAlign: 'center',
                  }}
                >
                  Skip
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <Logo />
          <MobileLogin displayHeader={displayHeader} otpSent={otpSent} />
          <View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View style={styles.orLine} />
              <Text style={styles.orText}>OR</Text>
              <View style={styles.orLine} />
            </View>
            {/* Or */}
            <EmailLogin navigation={navigation} />
          </View>
          <Text style={styles.termsCondition}>
            By continuing, you agree to our{' '}
            <Text
              style={{ textDecorationLine: 'underline', color: '#226ccf' }}
              onPress={() => setTerms(true)}
            >
              terms and conditions
            </Text>
          </Text>
          <Termsandconditions visible={terms} hideModal={hideModal} />
        </SafeAreaView>
      </ImageBackground>
    </Provider>
  );
}
