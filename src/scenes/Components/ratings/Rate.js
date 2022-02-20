import axios from "axios";
import moment from "moment";
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
import { Chip, Provider } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Loader from "../utility/Loader";

export default function Rate({ navigation, restaurant, order }) {
  const [selected, setSelected] = useState(false);
  const [details, setDetails] = useState("");
  const [rating, setRating] = useState(3);
  const [likes, setLikes] = useState([]);
  const [placed, setPlaced] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const changeRating = (rating) => {
    setRating(rating);
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
  const onSubmit = async () => {
    setLoaded(true);
    let review = {
      user_id: order.user_id,
      user_name: order.user_name,
      restaurant_id: order.restaurant_id,
      role: "user",
      order_id: order.order_id,
      start_date: order.start_date,
      end_date: order.end_date,
      order_time: order.order_time,
      delivered_on: order.end_date,
      plan_name: order.plan,
      base_price: parseFloat(order.base_price) - parseFloat(order.discount),
      rating: rating,
      details: details,
      likes: likes,
      review_at: moment(),
    };
    const response = await axios.post(
      "http://munkybox-admin.herokuapp.com/api/review/",
      review
    );
    const { data } = response;
    setLoaded(false);
    if (data !== null) {
      setPlaced(true);
      Actions.pop();
    }
  };
  const features = [
    "Taste",
    "Time",
    "Price",
    "Followed Instructions",
    "Service",
  ];
  if (!loaded) {
    return (
      <Provider>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: "space-between",
            backgroundColor: "#fff",
          }}
        >
          <ScrollView contentInsetAdjustmentBehavior="automatic">
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
              onFinishRating={changeRating}
            />

            <View
              style={{
                marginHorizontal: 2,
                marginVertical: 24,
                marginTop: 48,
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
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
                      borderWidth: 2,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: likes.includes(feature)
                        ? "orange"
                        : "#fff",
                    }}
                    textStyle={{
                      textAlign: "center",
                      fontSize: 14,
                      color: likes.includes(features) ? "#fff" : "#000",
                      fontWeight: "bold",
                    }}
                    key={key}
                  >
                    {feature}
                  </Chip>
                ))}
              </View>
            </View>

            <View>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 16,
                  fontWeight: "bold",
                }}
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
                onChangeText={(text) => setDetails(text)}
              />
            </View>
          </ScrollView>

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
            onPress={onSubmit}
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
        </SafeAreaView>
      </Provider>
    );
  } else {
    return <Loader />;
  }
}
