import React, { Component } from "react";
import { SafeAreaView, FlatList, View, Text, RefreshControl } from "react-native";
import axios from "axios";
import { MY_ORDER_URL, ORDER_URL } from "../../services/EndPoints";
import { getUser } from "../../services/user/getuser";
import OrderCard from "./myorder/OrderCard";
import NoOrders from "./myorder/NoOrders";
import { styles } from "../styles/OrderHistoryStyle";

const renderItem = ({ item }) => <OrderCard item={item} />;

export default class OrderHistory extends Component {
  state = { myOrders: [], loading: true };
  fetchMyOrder = async () => {
    const user = await getUser("user");
    const { user_id } = await user.data;
    const response = await axios.get(MY_ORDER_URL + user_id);
    const myorder = await response.data;
    this.setState({ myOrders: myorder.reverse(), loading: false });
  }
  onRefresh = () => { this.fetchMyOrder() }
  componentDidMount() {
    this.fetchMyOrder()
  }
  render() {
    const { myOrders, loading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={myOrders}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              colors={["#f00", "#0f0", "#00f"]}
              onRefresh={this.onRefresh}
            />
          }
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
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: "#000",
                  textAlign: "center",
                  padding: 10,
                }}
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
