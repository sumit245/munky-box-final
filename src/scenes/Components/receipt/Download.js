import React from "react";
import { TouchableOpacity, Share } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
// import * as Print from "expo-print"
import { html } from "./OrderReciept";

export default function Download({ navigation }) {
  const onShare = async () => {
    let options = {
      html: '<h1>PDF TEST</h1>',
      fileName: 'test',
      directory: 'Documents',
    };
    // let file = await Print.printToFileAsync(options)
    // console.log(file);
    try {
      const result = await Share.share({
        message: "Hello world!!!",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          //share with activity
        } else {
          //shared
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <TouchableOpacity style={{ flexDirection: "row" }} onPress={onShare}>
      <Icon name="export" size={26} color="orange" />
    </TouchableOpacity>
  );
}
