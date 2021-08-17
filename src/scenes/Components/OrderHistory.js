import React, { Component } from "react";
import { Image } from "react-native";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import axios from "axios";
import { ORDER_URL } from "../../services/EndPoints";
import { getUser } from "../../services/user/getuser";
import Icon from "react-native-vector-icons/Ionicons";

const Item = ({ item }) => (
  <Card style={{ padding: 10, margin: 4 }}>
    <Card.Content>
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "#ccc",
          borderBottomWidth: 0.5,
          paddingBottom: 10,
        }}
      >
        <Image
          source={{
            uri: "http://s3.amazonaws.com/gmi-digital-library/65caecf7-a8f7-4a09-8513-2659cf92871e.jpg",
          }}
          height={40}
          width={40}
          style={{ width: 40, height: 40, borderRadius: 2, padding: 2 }}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 2 }}>
            {item.restaurant}
          </Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {"$" + item.total}
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          borderBottomWidth: 0.5,
          borderBottomColor: "#ccc",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: "#777",
              fontWeight: "bold",
              textAlign: "left",
              position: "relative",
              left: -10,
            }}
          >
            ORDERED ON
          </Text>
          <Text
            style={{
              color: "#777",
              fontWeight: "bold",
              textAlign: "justify",
              position: "relative",
              left: 4,
            }}
          >
            END DATE
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              textAlign: "left",
              position: "relative",
              left: -10,
            }}
          >
            {item.start_date}
          </Text>
          <Text style={{ left: 14 }}>{item.end_date}</Text>
        </View>
      </View>
    </Card.Content>
    <Card.Actions style={{ justifyContent: "space-between" }}>
      <Text
        style={{
          color: "#777",
          fontSize: 14,
          marginLeft: 10,
          textTransform: "capitalize",
        }}
      >
        {item.status}
      </Text>

      <TouchableOpacity style={styles.reorder}>
        <Text style={{ color: "#777", fontSize: 14 }}>REORDER</Text>
      </TouchableOpacity>
    </Card.Actions>
  </Card>
);
const NoOrders = () => (
  <View style={{ justifyContent: "center", alignItems: "center" }}>
    <Icon name="fast-food-outline" size={50} />
    <Text>Your order history will be displayed here</Text>
  </View>
);
const renderItem = ({ item }) => <Item item={item} />;

export default class OrderHistory extends Component {
  state = { myOrders: [] };
  componentDidMount() {
    axios
      .get(ORDER_URL)
      .then((res) => {
        let allOrders = res.data;
        let myOrders = [];
        getUser("user").then((res) => {
          if (res !== null) {
            let id = res.data._id;
            myOrders = allOrders.filter(function (el) {
              return el.user_id === id;
            });
            this.setState({ myOrders: myOrders });
          } else {
            alert("Please login first!!! ");
          }
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { myOrders } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={myOrders}
          ListEmptyComponent={() => {
            return <NoOrders />;
          }}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  reorder: {
    padding: 5,
  },
});
