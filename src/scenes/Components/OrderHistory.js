import React, { Component } from "react";
import { SafeAreaView, FlatList, View, Text } from "react-native";
import axios from "axios";
import { MY_ORDER_URL, ORDER_URL } from "../../services/EndPoints";
import { getUser } from "../../services/user/getuser";
import OrderCard from "./myorder/OrderCard";
import NoOrders from "./myorder/NoOrders";
import { styles } from "../styles/OrderHistoryStyle";
import { Actions } from "react-native-router-flux";
import BackButton from "./utility/BackButton";
const renderItem = ({ item }) => <OrderCard item={item} />;

export default class OrderHistory extends Component {
  state = { myOrders: [] };
  async componentDidMount() {
    const user = await getUser("user");
    const { user_id } = await user.data;
    const response = await axios.get(MY_ORDER_URL + user_id);
    const myorder = await response.data;
    this.setState({ myOrders: myorder.reverse() });
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
          ListHeaderComponent={() => (
            <View
              style={{
                backgroundColor: "#fff",
                padding: 4,
                paddingHorizontal: 6,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 18, color: "#227fff" }}
              >
                My Orders
              </Text>
            </View>
          )}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}
