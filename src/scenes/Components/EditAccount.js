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

import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from "expo-image-picker";
import { getUser, saveUser } from "../../services/user/getuser";
import { Button, IconButton, TextInput } from "react-native-paper";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      editFname: false,
      editProfile:false,
      editLname: false,
      editMobile: false,
      editEmail: false,
      uri: "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
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
      this.setState({ uri: result.uri, editProfile: true });
    }
  };
  _nextAction = () => {
    const id = this.state.user._id;
    const { first_name, last_name, phone, email_id, uri } = this.state;
    const dataToSend = {
      first_name: first_name,
      last_name: last_name,
      profile_picture: uri,
      phone: phone,
      email_id: email_id,
    };
    axios
      .put("http://munkybox-admin.herokuapp.com/api/users/" + id, dataToSend)
      .then((res) => {
        if (res.status === 200) {
          saveUser("user", JSON.stringify(res.data)).then((res) => {
            Actions.push("home");
          });
        }
      })
      .catch((err) => console.error(err));
  };
  componentDidMount() {
    getUser("user")
      .then((res) => {
        if(res!==null){
          this.setState({ user: res.data });
        }else{
          alert("Please login first")
          Actions.jump('auth')
        }
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { uri, user, editFname, editLname, editMobile, editEmail } =
      this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <KeyboardAvoidingView>
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
                    <Image
                      source={{
                        uri: user.hasOwnProperty("profile_picture")
                          ? user.profile_picture
                          : uri,
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
                {editFname || editLname || editMobile || editEmail ? (
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
                        this.setState({
                          editFname: false,
                          editLname: false,
                          editMobile: false,
                          editEmail: false,
                        });
                      }}
                    >
                      Cancel
                    </Button>
                    <Button onPress={this._nextAction}>Save</Button>
                  </View>
                ) : null}
              </View>
              <View>
                <Text style={styles.label}>First Name</Text>
                {typeof user.first_name !== undefined && !editFname ? (
                  <View style={styles.textContainer}>
                    <Text style={styles.fields}>{user.first_name}</Text>
                    <IconButton
                      icon="lead-pencil"
                      color="#777"
                      onPress={() =>
                        this.setState((previousState) => ({
                          editFname: !previousState.editFname,
                        }))
                      }
                    />
                  </View>
                ) : (
                  <TextInput
                    mode="outlined"
                    onChangeText={this.onChangeText("first_name")}
                    value={this.state.first_name}
                    style={styles.inputContainer}
                  />
                )}
              </View>
              <View>
                <Text style={styles.label}>Last Name</Text>
                {typeof user.last_name !== undefined && !editLname ? (
                  <View style={styles.textContainer}>
                    <Text style={styles.fields}>{user.last_name}</Text>
                    <IconButton
                      icon="lead-pencil"
                      color="#777"
                      onPress={() =>
                        this.setState((previousState) => ({
                          editLname: !previousState.editLname,
                        }))
                      }
                    />
                  </View>
                ) : (
                  <TextInput
                    mode="outlined"
                    onChangeText={this.onChangeText("last_name")}
                    value={this.state.last_name}
                    style={styles.inputContainer}
                  />
                )}
              </View>
              <View>
                <Text style={styles.label}>Mobile Number</Text>
                {typeof user.phone !== undefined && !editMobile ? (
                  <View style={styles.textContainer}>
                    <Text style={styles.fields}>{user.phone}</Text>
                    <IconButton
                      icon="lead-pencil"
                      color="#777"
                      onPress={() =>
                        this.setState((previousState) => ({
                          editMobile: !previousState.editMobile,
                        }))
                      }
                    />
                  </View>
                ) : (
                  <TextInput
                    mode="outlined"
                    onChangeText={this.onChangeText("phone")}
                    value={this.state.phone}
                    keyboardType="numeric"
                    style={styles.inputContainer}
                  />
                )}
              </View>
              <View>
                <Text style={styles.label}>Email</Text>
                {typeof user.email_id !== undefined && !editEmail ? (
                  <View style={styles.textContainer}>
                    <Text style={styles.fields}>{user.email_id}</Text>
                    <IconButton
                      icon="lead-pencil"
                      color="#777"
                      onPress={() =>
                        this.setState((previousState) => ({
                          editEmail: !previousState.editEmail,
                        }))
                      }
                    />
                  </View>
                ) : (
                  <TextInput
                    mode="outlined"
                    onChangeText={this.onChangeText("email_id")}
                    value={this.state.email_id}
                    style={styles.inputContainer}
                  />
                )}
              </View>
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
    height: height / 1.1,
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
