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
import { ActivityIndicator, Button, TextInput } from "react-native-paper";
import axios from "axios";


const { width, height } = Dimensions.get("window");

export default class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      editable: false,
      loading: false,
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64:true,
      quality: 1,
    });
    if (!result.cancelled) {
      console.log(result.base64);
      this.setState({ uri: result.uri, editProfile: true,profile_picture:`data:image/jpg;base64,${result.base64}` });
    }
  };
  fetchUser = () => {
    getUser("user")
      .then((res) => {
        if (res !== null) {
          const {
            _id,
            first_name,
            last_name,
            phone,
            email_id,
            profile_picture,
          } = res.data;
          this.setState({
            id: _id,
            first_name: first_name,
            last_name: last_name,
            phone: phone,
            email_id: email_id,
            uri: profile_picture,
          });
        } else {
          alert("Please login first");
          Actions.jump("auth");
        }
      })
      .catch((err) => console.log(err));
  };
  _nextAction = async () => {
    this.setState({ loading: true });
    const { id, first_name, last_name, phone, email_id,profile_picture, uri } = this.state;
    if (!first_name) {
      alert("First name is required");
      this.setState({ loading: false })

      return;
    }
    if (!last_name) {
      alert("Last name is required");
      this.setState({ loading: false })

      return;
    }
    const dataToSend = {
      first_name: first_name,
      last_name: last_name,
      profile_picture: profile_picture,
      phone: phone,
      email_id: email_id,
    };
    const res = await axios.put(
      "http://54.146.133.108:5000/api/users/" + id,
      dataToSend
    );
    const response = await res.data;

    if (res.status === 200) {
      this.setState({ loading: false });
      saveUser("user", JSON.stringify(response)).then((res) => {
        Actions.push("Account");
      });
    }
  };

  componentDidMount() {
    this.fetchUser();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchUser();
    }
  }
  editState = () => {
    if (this.state.editable) {
      this._nextAction();
    }
    this.setState((prevState) => ({
      editable: !prevState.editable,
    }));
  };

  render() {
    const {
      uri,
      first_name,
      last_name,
      phone,
      email_id,
      editable,
      loading,
    } = this.state;

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
                        uri: uri,
                      }}
                      style={styles.profileimg}
                    />
                  </View>
                  <TouchableOpacity
                    style={styles.imagePicker}
                    onPress={this.pickImage}
                    disabled={!editable}
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
                  <Button onPress={this.editState} color="#ff6600" >
                    {editable ? "save" : "Edit"}
                  </Button>
                </View>
              </View>

              <View>
                <Text style={styles.label}>
                  First Name
                  {editable && (
                    <Text style={[styles.label, { color: "#f00" }]}>*</Text>
                  )}
                </Text>
                {!editable ? (
                  <View style={styles.textContainer}>
                    <Text style={styles.fields}>{first_name}</Text>
                  </View>
                ) : (
                  <TextInput
                    mode="flat"
                    outlineColor="#ff6600"
                    activeOutlineColor="#ff6600"
                    activeUnderlineColor="#ff6600"
                    onChangeText={this.onChangeText("first_name")}
                    value={first_name}
                    style={styles.inputContainer}
                  />
                )}
              </View>

              <View style={{ marginTop: 12 }}>
                <Text style={styles.label}>
                  Last Name
                  {editable && (
                    <Text style={[styles.label, { color: "#f00" }]}>*</Text>
                  )}
                </Text>
                {!editable ? (
                  <View style={styles.textContainer}>
                    <Text style={styles.fields}>{last_name}</Text>
                  </View>
                ) : (
                  <TextInput
                    mode="flat"
                    outlineColor="#ff6600"
                    activeOutlineColor="#ff6600"
                    activeUnderlineColor="#ff6600"
                    onChangeText={this.onChangeText("last_name")}
                    value={last_name}
                    style={styles.inputContainer}
                  />
                )}
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={styles.label}>
                  Mobile Number
                  {editable && (
                    <Text style={[styles.label, { color: "#f00" }]}>*</Text>
                  )}
                </Text>
                {!editable ? (
                  <View style={styles.textContainer}>
                    <Text style={styles.fields}>{phone}</Text>
                  </View>
                ) : (
                  <TextInput
                    mode="flat"
                    outlineColor="#ff6600"
                    activeOutlineColor="#ff6600"
                    activeUnderlineColor="#ff6600"
                    onChangeText={this.onChangeText("phone")}
                    value={phone}
                    keyboardType="numeric"
                    style={styles.inputContainer}
                    right={
                      <TextInput.Affix
                        
                        text="Verified"
                        textStyle={{
                          color: "#ff6600",
                          textDecorationLine: "underline",
                        }}
                        
                      />
                    }
                  />
                )}
              </View>
              <View style={{ marginTop: 12 }}>
                <Text style={styles.label}>
                  Email
                  {editable && (
                    <Text style={[styles.label, { color: "#f00" }]}>*</Text>
                  )}
                </Text>
                {!editable ? (
                  <View style={styles.textContainer}>
                    <Text style={styles.fields}>{email_id}</Text>
                  </View>
                ) : (
                  <TextInput
                      mode="flat"
                      outlineColor="#ff6600"
                      activeOutlineColor="#ff6600"
                      activeUnderlineColor="#ff6600"
                    onChangeText={this.onChangeText("email_id")}
                    value={email_id}
                    style={styles.inputContainer}
                    right={
                      <TextInput.Affix
                        text="Verify"
                        textStyle={{
                          color: "#ff6600",
                          textDecorationLine: "underline",
                        }}
                        onLayout={()=>console.log("Hello")}
                      />
                    }
                  />
                )}
              </View>
            </View>
            {loading && (
              <View style={styles.loading}>
                <ActivityIndicator size="large" color="#ff6600" />
              </View>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
    // } else {
    //   return <Loader msg="Please wait till we are updating!!!" />;
    // }
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
    borderBottomWidth: 0.5,
  },
  label: {
    marginVertical: 6,
    marginBottom: 4,
    fontWeight: "bold",
    fontSize: 14,
  },
  fields: {
    fontSize: 16,
    color: "#666",
  },
  formContainer: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
    width: width,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});
