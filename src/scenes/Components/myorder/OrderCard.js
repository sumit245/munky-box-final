import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Avatar, Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Redo from "react-native-vector-icons/FontAwesome5";
import NewsPaper from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../styles/OrderHistoryStyle";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import moment from "moment";
import { getUser } from "../../../services/user/getuser";

export default function OrderCard({ item, user_id }) {
  const [rest, setRest] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasReview, setHasReview] = useState(false);

  const fetchRestaurant = async (id) => {
    const restaurant = await axios.get(
      "http://54.146.133.108:5000/api/newrest/getchefbyId/" + id
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

  const fetchOrderByID = async (id) => {
    const res = await axios.get(
      "http://54.146.133.108:5000/api/orders/getOrderbyID/" + id
    );
    const { data } = res;
    if (data !== null) {
      Actions.push("orderDetails", { order: data, title: "#" + id });
    } else {
      alert("No orders found!!!");
    }
  };

  const fetchReviewyUser = async (order_id) => {
    const user = await getUser("user");
    const { user_id } = await user.data;
    const response = await axios.get(
      "http://54.146.133.108:5000/api/review/getreviewByUser/" +
      user_id +
      "/" +
      order_id
    );
    const { hasReview } = response.data;
    setHasReview(hasReview);
    console.log(order_id, "is", hasReview);
  };
  useEffect(() => {
    fetchReviewyUser(item.order_id);
  }, [item.order_id]);

  const findAndRate = () => {
    if (!hasReview) {
      Actions.push("ratings", {
        title: rest.restaurant_name,
        order: item,
        restaurant: rest,
      });
    } else {
      alert("You have already reviewed this order");
    }
  };

  if (!loading) {
    return (
      <Card style={{ padding: 10, margin: 4 }} key={item.order_id}>
        <Card.Content>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "bold",
              textTransform: "uppercase",
              textAlign: "right",
              color: item.status === "accepted" ? "#ffc300" :
                item.status === "started" ? "#f5a617" :
                  item.status === "pending" ? "#aaa" :
                    item.status === "rejected" ? "#777" : "#22cf6c"
            }}
          >
            {item.status}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginVertical: 12,
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 14, color: "#000" }}>
              #{item.order_id}
            </Text>
            <Text>{moment(item.order_time).format("DD MMM YYYY")}</Text>
          </View>
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
              <View>
                <Text
                  style={{
                    textAlign: "right",
                    fontWeight: "bold",
                    marginTop: 8,
                    fontSize: 16,
                  }}
                >
                  {"$" + item.total}
                </Text>
              </View>
            </View>
          </View>
        </Card.Content>
        <Card.Actions style={{ justifyContent: "space-between" }}>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#ccc" }]}
              onPress={() => fetchOrderByID(item.order_id)}
            >
              <NewsPaper name="newspaper" size={16} color="#FFF" />
            </TouchableOpacity>
            <Text>Receipt</Text>
          </View>

          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={[styles.actionButton, { backgroundColor: "#f60" }]}
              onPress={findAndRate}
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
            <Text>Reorder</Text>
          </View>
        </Card.Actions>
      </Card>
    );
  } else {
    return null;
  }
}
