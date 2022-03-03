import axios from "axios";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-paper";

export default function Notes({ notes, order_id }) {
  const [pulled, setPulled] = useState(false);
  const [thisnotes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setNotes(notes);
  }, [order_id]);
  const updateNotes = async (id) => {
    setPulled(!pulled);
    setLoading(true);
    if (pulled) {
      let dataToUpload = {
        notes: thisnotes,
      };
      const response = await axios.put(
        "http://munkybox-admin.herokuapp.com/api/orders/" + id,
        dataToUpload
      );
      const { data, status } = response;
      if (status === 200) {
        setLoading(false);
      }
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", marginBottom: 4, fontSize: 14 }}>
          Delivery Notes
        </Text>
        <TouchableOpacity onPress={() => updateNotes(order_id)}>
          <Text style={{ fontSize: 14, fontWeight: "bold", color: "#226ccf" }}>
            {!pulled ? "Update" : "Save"}
          </Text>
        </TouchableOpacity>
      </View>
      {!pulled ? (
        <Text>{thisnotes}</Text>
      ) : (
        <TextInput
          mode="outlined"
          numberOfLines={4}
          label="Notes"
          value={thisnotes}
          onChangeText={(text) => setNotes(text)}
          placeholder="Place the delivery at the door"
        />
      )}
      {loading && <ActivityIndicator size="small" animating />}
    </View>
  );
}