import React, { Component } from "react";
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
} from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { StatusBar } from "react-native";
import { getUser } from "../../services/user/getuser";

const { width, height } = Dimensions.get("window");
const Lang = {
  name: "First Name",
  nameError: "Please add a valid name",
  surname: "Last Name",
  surnameError: "Please add a valid surname",
  mobile: "Mobile Number",
  mobileError: "Please add a valid mobile phone",
  email: "Email",
  emailError: "Please add a valid email address",
  send: "Send",
  headerTitle: "Just A Few Clicks Away",
  lightText: "We need some details to serve you better",
};
export default class RegistrationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png",
    };
  }

  onChangeText = (id) => (e) => {
    this.setState({
      [id]: e,
    });
  };
  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      this.setState({ uri: result.uri });
    }
  };
  _nextAction = () => {
    const { _id,phone } = this.state.data.data;
    console.log(_id);
    const { first_name, last_name, profile_picture, email_id, uri } =
      this.state;
    const dataToSend = {
      first_name,
      last_name,
      profile_picture,
      email_id,
      phone,
      uri,
    };
    console.log(dataToSend);
    // let user1 = {
    //     first_name, last_name, phone, profile_picture, email_id, uri
    // }
    // const user = JSON.stringify(user1)
    // // saveUser('user', user)
    // Actions.push("manageAddress", { ...this.state });
  };
  componentDidMount() {
    if (this.props.logintype === "email") {
      this.setState({ first_name: this.props.first_name });
    }
    getUser('user').then(data=>{
        console.log(data);
        this.setState(data)
    })
  }
  render() {
    const { uri, result } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <StatusBar />
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
        >
          <KeyboardAvoidingView>
            <Text style={styles.lightText}>{Lang.lightText}</Text>
            <View style={styles.formContainer}>
              <View
                style={{
                  flexDirection: "row",
                  width: width,
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <View style={styles.profilepic}>
                    <Image source={{ uri: uri }} style={styles.profileimg} />
                  </View>
                  <TouchableOpacity
                    style={styles.imagePicker}
                    onPress={this.pickImage}
                  >
                    <Icon name="camera-outline" size={28} color="#444" />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    justifyContent: "center",
                    paddingHorizontal: 10,
                  }}
                >
                  <Button
                    color="red"
                    onPress={() => {
                      Actions.push("manageAddress", { ...this.state });
                    }}
                  >
                    Skip
                  </Button>
                  <Button onPress={this._nextAction}>Next</Button>
                </View>
              </View>
              <View>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  mode="outlined"
                  onChangeText={this.onChangeText("first_name")}
                  value={this.state.first_name}
                  style={styles.inputContainer}
                />
              </View>
              <View>
                <Text style={styles.label}>Last Name</Text>
                <TextInput
                  mode="outlined"
                  onChangeText={this.onChangeText("last_name")}
                  value={this.state.last_name}
                  style={styles.inputContainer}
                />
              </View>
              {this.props.logintype !== "mobile" && (
                <View>
                  <Text style={styles.label}>Mobile Number</Text>
                  <TextInput
                    mode="outlined"
                    onChangeText={this.onChangeText("phone")}
                    value={this.state.phone}
                    keyboardType="numeric"
                    style={styles.inputContainer}
                  />
                </View>
              )}

              {this.props.logintype !== "email" && (
                <View>
                  <Text style={styles.label}>Email</Text>
                  <TextInput
                    mode="outlined"
                    onChangeText={this.onChangeText("email_id")}
                    value={this.state.email_id}
                    style={styles.inputContainer}
                  />
                </View>
              )}
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },
  lightText: {
    textAlign: "center",
    padding: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#777",
  },
  profilepic: {
    height: width / 3.8,
    width: width / 3.8,
    borderRadius: width / 7.6,
    borderWidth: 0.2,
    margin: 4,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
  },
  profileimg: {
    height: width / 4,
    width: width / 4,
    borderRadius: width / 8,
  },
  imagePicker: {
    position: "relative",
    right: width / 8,
    top: -40,
    backgroundColor: "#fff",
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: "#CCC",
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingVertical: 0,
    marginHorizontal: 2,
    width: width - 40,
    height: 40,
    textAlignVertical: "center",
  },
  textContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width - 40,
    paddingHorizontal: 6,
    alignItems: "baseline",
    borderColor: "#ccc",
    borderWidth: 0.5,
    borderRadius: 4,
  },
  label: {
    marginVertical: 6,
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 16,
  },
  fields: {
    fontSize: 16,
    textTransform: "capitalize",
  },
  formContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    width: width,
  },
});
