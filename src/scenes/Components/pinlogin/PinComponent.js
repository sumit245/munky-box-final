import Icon from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useRef, useState } from 'react';
import {
  ImageBackground,
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
} from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from '../../../scenes/Components/utility/BackButton';
import { height, width } from '../../styles/HomeStyles';
import Loader from '../utility/Loader';

const PinComponent = ({ navigation, entry, logintype, data }) => {
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [showCompletedButton, setShowCompletedButton] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [pin, setPin] = useState('');
  const [loading, setLoading] = useState(false);

  const getApiData = async (enteredPin) => {
    try {
      const response = await AsyncStorage.getItem('credential');
      const { pin } = JSON.parse(response);
      if (pin === enteredPin) {
        navigation.navigate('home');
      } else {
        alert('Wrong Pin');
      }
    } catch (error) {
      alert('Login for first time using otp');
    }
  };

  const unlock = () => {
    if (entry) {
      setConfirmation(true);
      if (confirmation) {
        if (pin === enteredPin) {
          const credential = {
            entry: false,
            pin: pin,
          };
          AsyncStorage.setItem('credential', JSON.stringify(credential)).then(
            () => {
              pinView.current.clearAll();
              navigation.navigate('home', {
                logintype: logintype,
                data,
              });
            }
          );
        } else {
          alert('Confirmation and Entered PIN code does not match');
        }
      } else {
        setPin(enteredPin);
        pinView.current.clearAll();
      }
    } else {
      getApiData(enteredPin);
    }
  };

  const resetPin = async () => {
    await AsyncStorage.clear();
    navigation.pop();
  };

  useEffect(() => {
    enteredPin.length > 0
      ? setShowRemoveButton(true)
      : setShowRemoveButton(false);

    enteredPin.length === 4
      ? setShowCompletedButton(true)
      : setShowCompletedButton(false);
  }, [enteredPin]);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (loading) {
    return (
      <ImageBackground
        source={require('../../../../assets/imagebackground.jpg')}
        style={styles.imageBackground}
      >
        <SafeAreaView style={styles.container}>
          {entry ? (
            <View
              style={{
                position: 'absolute',
                left: 10,
                top: 40,
                marginBottom: 40,
              }}
            >
              <BackButton />
            </View>
          ) : (
            <View style={{ marginBottom: 80 }} />
          )}

          <View style={styles.pinMsgView}>
            {confirmation ? (
              <>
                <Text style={styles.pinMsg}>Confirm PIN Code</Text>
              </>
            ) : (
              entry && (
                <>
                  <Text style={styles.pinMsg}>
                    Create a PIN code for your account.
                  </Text>
                </>
              )
            )}
            <Text style={styles.pinMsg}>Enter 4 Digits PIN</Text>
          </View>

          <ReactNativePinView
            inputSize={32}
            ref={pinView}
            pinLength={4}
            buttonSize={60}
            onValueChange={(value) => setEnteredPin(value)}
            buttonAreaStyle={{
              marginTop: 24,
            }}
            inputAreaStyle={styles.pinInputAreaStyle}
            inputViewEmptyStyle={{
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: '#FBECEC',
            }}
            inputViewFilledStyle={{
              backgroundColor: '#FFFFFF',
            }}
            buttonViewStyle={{
              borderWidth: 2,
              borderColor: '#F5EFEF',
            }}
            buttonTextStyle={{
              color: '#F5EFEF',
              fontWeight: 'bold',
            }}
            onButtonPress={(key) => {
              if (key === 'custom_left') {
                pinView.current.clear();
              }
              if (key === 'custom_right') {
                unlock();
              }
            }}
            customLeftButton={
              showRemoveButton ? (
                <Icon name={'ios-backspace'} size={36} color="#FBECEC" />
              ) : null
            }
            customRightButton={
              showCompletedButton ? (
                <Icon name={'ios-lock-open'} size={36} color="#FBECEC" />
              ) : null
            }
          />
          {/* </View> */}
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={styles.forgot_button}
              onPress={() => navigation.push('auth')}
            >
              Login with OTP
            </Text>
            <Text style={styles.forgot_button} onPress={() => resetPin()}>
              Forgot Pin? Reset Here
            </Text>
          </View>
        </SafeAreaView>
      </ImageBackground>
    );
  } else {
    return <Loader msg="Loading" />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(25,25,25,0.45)',
    width: width,
    alignItems: 'center',
  },
  image: {
    marginTop: 60,
    marginBottom: 120,
    height: 'auto',
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  TextInput: {
    textAlign: 'left',
    borderBottomWidth: 1,
    width: '90%',
    height: 45,
    marginBottom: 20,
  },
  forgot_button: {
    color: '#FFF',
    marginTop: 20,
    bottom: Platform.OS === 'ios' ? -120 : 0,
    fontWeight: 'bold',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  phoneContainer: {
    height: 50,
    width: '96%',
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 6,
  },
  loginBtn: {
    width: '96%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 6,
  },
  btnText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textTransform: 'uppercase',
  },
  errormsg: {
    color: '#cf6c22',
  },
  imageBackground: {
    width: width,
    flex: 1,
    alignItems: 'center',
  },
  mobin: {
    marginTop: height / 2 - 200,
    alignItems: 'center',
    flex: 1,
  },
  instructions: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginTop: 6,
  },
  textInputContainer: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roundedTextInput: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: '#fff',
    borderWidth: 0.1,
  },
  pinMsg: {
    fontWeight: 'bold',
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  pinMsgView: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'rgba(100,100,100,0.5)',
    paddingHorizontal: 20,
    width: 296,
    padding: 10,
  },
  pinInputAreaStyle: {
    marginBottom: 24,
    backgroundColor: 'rgba(100,100,100,0.5)',
    paddingHorizontal: 60,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingBottom: 10,
  },
});

export default PinComponent;
