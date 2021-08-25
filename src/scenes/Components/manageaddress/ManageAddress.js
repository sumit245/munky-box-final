import React, { Component } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import MaterialMapView from "./MaterialMapView";
import ManualEntry from "./ManualEntry";
import { Actions } from "react-native-router-flux";
import axios from "axios";
import { USER_URL } from "../../../services/EndPoints";
import { getUser } from "../../../services/user/getuser";

const { width, height } = Dimensions.get("window");
export default class ManageAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
    };
  }
  _getData = (e) => {
    this.setState(e);
  };
  _confirmLocation = () => {
    let data = this.state;
    let address = {
      flat_num: data.flat_num,
      locality: data.locality,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country,
      address_type: data.address_type,
    };
    let user = {
      first_name: data.first_name,
      last_name: data.last_name,
      phone: data.phone,
      email_id: data.email_id,
      address: address,
      status: "Active",
    };
    axios
      .post(USER_URL, user)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    setAddress("@address", JSON.stringify(address));
    Actions.push("home", { ...this.state });
  };
  // componentDidMount() {
  //   getUser("user").then((res) => {
  //     if(res===null){
  //       alert('Please login first')
  //       Actions.jump('auth')
  //     }
  //   });
  // }

  render() {
    return (
      <SafeAreaView style={{ flexGrow: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView>
            <MaterialMapView style={styles.materialMapView}></MaterialMapView>
            <ManualEntry
              style={styles.materialCardWithoutImage}
              getData={this._getData}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  materialMapView: {
    width: width,
    height: width / 1.4,
  },
});
