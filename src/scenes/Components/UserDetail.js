import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  StatusBar,
} from 'react-native';
import { Button } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { getUser, saveUser } from '../../services/user/getuser';
import axios from 'axios';
import { USER_URL } from '../../services/EndPoints';
import BackButton from './utility/BackButton';

const { width, height } = Dimensions.get('window');
const Lang = {
  name: 'First Name',
  nameError: 'Please add a valid name',
  surname: 'Last Name',
  surnameError: 'Please add a valid surname',
  mobile: 'Mobile Number',
  mobileError: 'Please add a valid mobile phone',
  email: 'Email',
  emailError: 'Please add a valid email address',
  send: 'Send',
  headerTitle: 'Just A Few Clicks Away',
  lightText: 'We need some details to serve you better',
};

export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
    };
  }
  onChangeText = (id) => (e) => {
    this.setState({
      [id]: e,
    });
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });
    if (!result.cancelled) {
      this.setState({
        uri: result.uri,
        profile_picture: `data:image/jpg;base64,${result.base64}`,
      });
    }
  };
  _nextAction = () => {
    const { _id, phone } = this.state;
    const { first_name, last_name, profile_picture, email_id, uri } =
      this.state;
    if (!first_name) {
      alert('First name is required');
      return;
    }
    if (!last_name) {
      alert('Last name is required');
      return;
    }
    if (!email_id) {
      alert('Email id is required');
      return;
    }
    const dataToSend = {
      first_name,
      last_name,
      profile_picture,
      email_id,
      phone,
      uri,
    };
    axios
      .put(USER_URL + _id, { ...dataToSend })
      .then((res) => {
        const user = JSON.stringify(res.data);
        saveUser('user', user)
          .then((data) => {
            Actions.push('manageAddress', { data, entryMethod: true });
          })
          .catch((err) => {
            alert(err);
          });
      })
      .catch((err) => {
        alert(err);
      });
  };
  componentDidMount() {
    getUser('user').then((response) => {
      this.setState({ ...response.data });
    });
  }
  render() {
    const { uri, result } = this.state;
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
          marginTop: StatusBar.currentHeight,
        }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
        >
          <KeyboardAvoidingView>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 16,
              }}
            >
              <BackButton />
            </View>
            <Text style={styles.lightText}>{Lang.lightText}</Text>

            <View
              style={{
                flexDirection: 'row',
                width: width,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.profilepic}>
                  <Image
                    source={{
                      uri: uri,
                    }}
                    style={styles.profileimg}
                  />
                </View>
                <TouchableOpacity
                  style={styles.imagePicker}
                  onPress={this.pickImage}
                >
                  <Icon name="camera-outline" size={28} color="#444" />
                </TouchableOpacity>
              </View>

              <Button onPress={this._nextAction} color="#ff6600">
                Next
              </Button>
            </View>

            <View>
              <Text style={styles.label}>
                First Name
                <Text style={[styles.label, { color: '#f00' }]}>*</Text>
              </Text>
              <TextInput
                onChangeText={this.onChangeText('first_name')}
                selectionColor="#ff6600"
                value={this.state.first_name}
                style={styles.inputContainer}
                placeholder="John"
              />
            </View>

            <View>
              <Text style={styles.label}>
                Last Name
                <Text style={[styles.label, { color: '#f00' }]}>*</Text>
              </Text>

              <TextInput
                onChangeText={this.onChangeText('last_name')}
                value={this.state.last_name}
                selectionColor="#ff6600"
                style={styles.inputContainer}
                placeholder="Doe"
              />
            </View>

            {this.props.logintype !== 'mobile' && (
              <View>
                <Text style={styles.label}>
                  Mobile Number
                  <Text style={[styles.label, { color: '#f00' }]}>*</Text>
                </Text>

                <TextInput
                  onChangeText={this.onChangeText('phone')}
                  value={this.state.phone}
                  selectionColor="#ff6600"
                  keyboardType="numeric"
                  style={styles.inputContainer}
                  placeholder="+1 999-999-999"
                />
              </View>
            )}

            {this.props.logintype !== 'email' && (
              <View>
                <Text style={styles.label}>
                  Email <Text style={[styles.label, { color: '#f00' }]}>*</Text>
                </Text>

                <TextInput
                  onChangeText={this.onChangeText('email_id')}
                  value={this.state.email_id}
                  selectionColor="#ff6600"
                  style={styles.inputContainer}
                  placeholder="abc@mail.net"
                />
              </View>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'space-between',
  },
  lightText: {
    textAlign: 'justify',
    fontSize: 16,
    fontWeight: 'bold',
  },
  profilepic: {
    height: width / 3.8,
    width: width / 3.8,
    borderRadius: width / 7.6,
    borderWidth: 0.2,
    margin: 4,
    borderColor: '#CCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileimg: {
    height: width / 4,
    width: width / 4,
    borderRadius: width / 8,
  },
  imagePicker: {
    position: 'relative',
    right: 0,
    top: -40,
    backgroundColor: '#fff',
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: '#CCC',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    width: width - 40,
    borderBottomColor: '#ccc',
    borderBottomWidth: 0.5,
    height: 40,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - 40,
    paddingHorizontal: 6,
    alignItems: 'baseline',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 4,
  },
  label: {
    marginTop: 6,
    marginBottom: 2,
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    // justifyContent: "flex-start",
    padding: 10,
  },
});
