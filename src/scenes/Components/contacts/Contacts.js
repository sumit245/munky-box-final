import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  AsyncStorage,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { IconButton, Provider } from "react-native-paper";
import axios from "axios";
import SuccessDialog from "../utility/SuccessDialog";
import { getUser } from "../../../services/user/getuser";
import CustomDialog from "../utility/CustomDialog";

const DARKGRAY = "#777";
const { width, height } = Dimensions.get("window");

export default function Contacts({ navigation }) {
  const [info, setInfo] = useState({
    receipient: "support@munkybox.com",
    subject: "",
    user_name: "",
    user_id: "",
    email_id: "",
    phone: "",
    body: "",
  });
  const [discard, setDiscard] = useState(false);
  const [msgTitle, setmsgTitle] = useState("");
  const [msgContent, setmsgContent] = useState("");
  async function fetchUser() {
    const response = await getUser("user");
    const { data } = await response;
    setInfo({
      ...info,
      user_name: data.first_name + data.last_name,
      phone: data.phone,
      user_id: data.user_id,
      email_id: data.email_id,
    });
  }
  useEffect(() => {
    fetchUser();
  }, []);

  const sendEmail = async () => {
    const mail = {
      sender: info.email_id,
      receipient: info.receipient,
      subject: info.subject,
      body: info.body,
      sender_name: info.user_name,
      phone: info.phone,
      label: "user",
    };
    const response = await axios.post(
      "http://munkybox-admin.herokuapp.com/api/contacts/",
      mail
    );
    const { status } = await response.data;
    if (status === 200) {
      setDiscard(true);
      setmsgTitle("Delivered!!!");
      setmsgContent(
        "Your message has been sent to the admin. They will contact you soon!!"
      );
    }
  };
  const doneHandler = () => {
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.navigate("contacts")
  }
  const deleteMsg = () => {
    setDiscard(true);
    setmsgTitle("Are you sure?");
    setmsgContent("Your message will be discarded!!!");
  };
  if (!discard) {
    return (
      <SafeAreaView style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
            elevation: 1,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <Icon name="chevron-back" size={24} />
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>Compose</Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              padding: 4,
            }}
          >
            <IconButton icon="attachment" color="#e61272" />
            <IconButton icon="send" color="#126e72" onPress={sendEmail} />
            <IconButton icon="delete" color="#ef2145" onPress={deleteMsg} />
          </View>
          {/* buttons */}
        </View>

        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            <View style={{ marginVertical: 4 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>From:</Text>
                <Text
                  style={[styles.inputContainer, { flex: 1, color: "#777" }]}
                >
                  {info.email_id}
                </Text>
              </View>
            </View>
            {/* From */}

            <View style={{ marginVertical: 4 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>To:</Text>
                <Text
                  style={[
                    styles.inputContainer,
                    { flex: 1, marginLeft: "10%", color: "#777" },
                  ]}
                >
                  {info.receipient}
                </Text>
              </View>
            </View>
            {/* To */}

            <View style={{ marginVertical: 16 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Subject</Text>
              </View>
              <TextInput
                value={info.subject}
                style={[styles.inputContainer, { marginTop: 12 }]}
                onChangeText={(text) => setInfo({ ...info, subject: text })}
              />
            </View>
            {/* Subject */}

            <View style={{ marginVertical: 16 }}>
              <View style={styles.labelContainer}>
                <Text style={styles.label}>Desciption</Text>
              </View>
              <TextInput
                value={info.body}
                placeholder="Write a description in maximum 250 characters"
                placeholderTextColor="#777"
                multiline
                textAlignVertical="top"
                style={[
                  styles.inputContainer,
                  {
                    textAlignVertical: "bottom",
                    borderColor: "#777",
                    borderWidth: 0.5,
                    borderRadius: 2,
                    height: 250,
                    padding: 4,
                  },
                ]}
                numberOfLines={10}
                onChangeText={(text) => setInfo({ ...info, body: text })}
              />
            </View>
            {/* Body */}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <Provider>
        <CustomDialog
          title={msgTitle}
          text={msgContent}
          showDialog={true}
          doneHandler={doneHandler}
          cancelHandler={cancelHandler}
        />
      </Provider>
    );
  }
}
const styles = StyleSheet.create({
  card: {
    marginHorizontal: 4,
    borderColor: "#777",
    borderWidth: 0.2,
    marginVertical: 2,
    padding: 4,
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  row: {
    width: "98%",
    marginHorizontal: "1%",
    borderBottomWidth: 0.5,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    backgroundColor: "#FFF",
    padding: 2,
    justifyContent: "space-between",
  },
  restaurant: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  detailsContainer: {
    borderRadius: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 4,
  },
  headerImage: {
    width: width - 0.01 * width,
    height: 0.5 * width,
    margin: "0.5%",
  },
  avatarImage: {
    width: 0.3 * width,
    height: 0.3 * width,
    borderRadius: 0.15 * width,
    borderWidth: 2,
    borderColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -0.14 * width,
  },
  navLink: {
    fontSize: 18,
    padding: 4,
    color: "#444",
    marginVertical: 5,
    paddingLeft: 10,
  },
  collapsibleButton: {
    justifyContent: "center",
    marginVertical: 2,
    borderLeftWidth: 1,
    borderLeftColor: "#777",
    height: 20,
    alignSelf: "center",
  },
  container: {
    backgroundColor: "#FFF",
    padding: 2,
    flex: 1,
    justifyContent: "space-between",
  },
  inputContainer: {
    borderBottomWidth: 0.2,
    borderBottomColor: DARKGRAY,
    fontSize: 16,
    marginHorizontal: "4%",
  },
  planContainer: {
    flexDirection: "row",
    marginHorizontal: "4%",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: "4%",
    marginTop: 8,
    marginVertical: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 2,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 3,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
