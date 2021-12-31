import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { AirbnbRating } from "react-native-elements";
import { Chip } from "react-native-paper";

export default function Rate({ navigation, restaurant, order }) {
  const [selected, setSelected] = useState(false);
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    console.log(order);
  }, []);
  const setRating = (rating) => {
    console.log(rating);
  };
  const pushToLiked = (feature) => {
    let like = [...likes];
    if (like.includes(feature)) {
      like.splice(like.indexOf(feature), 1);
    } else {
      like.push(feature);
    }
    setLikes(like);
    setSelected(!selected);
  };
  const features = [
    "Taste",
    "Time",
    "Price",
    "Followed Instructions",
    "Service",
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: "#fff" }}
        contentContainerStyle={{ justifyContent: "space-between", flex: 1 }}
      >
        <View>
          <Text
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 20,
              letterSpacing: 1,
            }}
          >
            Thanks for rating!
          </Text>
          <Text style={{ textAlign: "center", fontWeight: "bold" }}>
            Order {order.order_id}
          </Text>
        </View>
        <AirbnbRating
          reviews={["Worst", "Bad", "Good", "Satisfied", "Excellent!!!"]}
          onFinishRating={setRating}
        />

        <View
          style={{
            marginHorizontal: 2,
            marginVertical: 24,
            marginTop: 48,
          }}
        >
          <Text
            style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
          >
            What did you like?{" "}
          </Text>
          <View
            style={{
              flexDirection: "row",
              maxWidth: "90%",
              justifyContent: "space-between",
              flexWrap: "wrap",
              marginHorizontal: 20,
              marginVertical: 2,
            }}
          >
            {features.map((feature, key) => (
              <Chip
                mode="outlined"
                onPress={() => pushToLiked(feature)}
                selectedColor={likes.includes(feature) ? "#2962ff" : "#000"}
                style={{
                  minWidth: 100,
                  height: 40,
                  marginVertical: 2,
                  borderWidth: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textStyle={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "#000",
                  fontWeight: "bold",
                }}
              >
                {feature}
              </Chip>
            ))}
          </View>
        </View>

        <View>
          <Text
            style={{ textAlign: "center", fontSize: 16, fontWeight: "bold" }}
          >
            Leave a comment
          </Text>
          <TextInput
            style={{
              height: 120,
              margin: 12,
              borderWidth: 1,
              padding: 10,
              borderRadius: 4,
              textAlignVertical: "top",
            }}
            numberOfLines={4}
            placeholder="Write any comments"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity
          style={{
            width: "98%",
            borderRadius: 6,
            borderWidth: 0.2,
            marginHorizontal: 2,
            padding: 6,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#A91B60",
          }}
        >
          <Text
            style={{
              color: "#fff",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
