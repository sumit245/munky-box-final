import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Redo from "react-native-vector-icons/FontAwesome5";
import NewsPaper from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../styles/OrderHistoryStyle";
import axios from "axios";
import Loader from "../utility/Loader";
import { Actions } from "react-native-router-flux";

export default function OrderCard({ item }) {
  const [rest, setRest] = useState({});
  const [loading, setLoading] = useState(true);
  const fetchRestaurant = async (id) => {
    const restaurant = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/newrest/getchefbyId/" + id
    );
    const { data } = restaurant;
    if (data !== null) {
      setRest(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRestaurant(item.restaurant_id);
  }, []);
  if (!loading) {
    return (
      <Card style={{ padding: 10, margin: 4 }} key={item.order_id}>
        <Card.Content>
          <View
            style={{
              flexDirection: "row",
              paddingBottom: 10,
            }}
          >
            <Avatar.Image
              source={{
                uri: rest.documents[0].restaurant_image,
              }}
              style={{ padding: 2 }}
            />
            <View
              style={{
                flex: 1,
                marginLeft: 4,
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, marginLeft: 2 }}
                >
                  {item.restaurant}
                </Text>
                <Text>
                  {item.plan === "twoPlan"
                    ? "2 Meals"
                    : item.plan === "fifteenPlan"
                    ? "15 Meals"
                    : "30 Meals"}
                </Text>
              </View>
              <Text style={{ fontSize: 14, textTransform: "uppercase" }}>
                {item.status}
              </Text>
            </View>
          </View>
          <Text style={{ textAlign: "right", fontWeight: "bold" }}>
            {"CAD " + item.total}
          </Text>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#ccc" }]}
            >
              <NewsPaper name="newspaper" size={16} color="#FFF" />
            </TouchableOpacity>
            <Text>Receipt</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#fa0" }]}
            >
              <Icon name="ios-star" size={16} color="#FFF" />
            </TouchableOpacity>
            <Text>Rate</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#3d3" }]}
              onPress={() =>
                Actions.push("details", {
                  title: rest.restaurant_name,
                  restaurant_id: rest._id,
                  item: rest,
                  promo: rest.promo,
                })
              }
            >
              <Redo name="redo-alt" size={16} color="#FFF" />
            </TouchableOpacity>
            <Text>REORDER</Text>
          </View>
        </Card.Actions>
      </Card>
    );
  } else {
    return <Loader msg="Your past orders" />;
  }
}
