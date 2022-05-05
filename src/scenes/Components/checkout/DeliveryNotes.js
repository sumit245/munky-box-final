import React, { useState,useEffect } from "react";
import { Text, View } from "react-native";
import { TextInput } from "react-native-paper";
import { styles } from "../../styles/CheckoutStyles";
import Icon from "react-native-vector-icons/Ionicons";

export default function DeliveryNotes({ noteHandler,notesprop }) {
  const [notes, setNotes] = useState("");
  const [pulled, setPulled] = useState(false);
  useEffect(() => {
    setNotes(notesprop)
    
  }, [])
  return (
    <View style={styles.optionCard}>
      <View style={styles.optionrow}>
        <Text style={styles.optionsLabels}>Add a note</Text>
        <Icon
          name={pulled ? "chevron-down" : "chevron-forward"}
          size={24}
          onPress={() => setPulled(!pulled)}
        />
      </View>
      {pulled && (
        <TextInput
          mode="outlined"
          label="Notes"
          autoFocus
          dense={true}
          value={notes}
          outlineColor="#ff6600"
          activeOutlineColor="#ff6600"
          multiline
          style={{ backgroundColor: "#fff",flex:1,flexWrap:"wrap" }}
          placeholder="Place the delivery at door"
          onChangeText={setNotes}
          onEndEditing={() => noteHandler(notes)}
        />
      )}
    </View>
  );
}