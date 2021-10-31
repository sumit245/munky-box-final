import React, { Component } from "react";
import { SafeAreaView, FlatList } from "react-native";
import axios from "axios";
import { MY_ORDER_URL, ORDER_URL } from "../../services/EndPoints";
import { getUser } from "../../services/user/getuser";
import OrderCard from "./myorder/OrderCard";
import NoOrders from "./myorder/NoOrders";
import { styles } from "../styles/OrderHistoryStyle";
import { Actions } from "react-native-router-flux";
const renderItem = ({ item }) => <OrderCard item={item} />;

export default class OrderHistory extends Component {
  state = { myOrders: [] };
  async componentDidMount() {
    try {
      const user = await getUser("user");
      const { user_id } = await user.data;
      console.log(user_id);
      const response = await axios.get(MY_ORDER_URL + user_id);
      const myorder = await response.data;
      this.setState({ myOrders: myorder });
    } catch (err) {
      alert("Please login First");
      Actions.jump("auth");
    }
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
