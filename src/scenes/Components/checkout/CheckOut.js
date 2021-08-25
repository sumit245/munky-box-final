import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import CheckoutAddress from "./CheckoutAddress";
import CheckoutCards from "./CheckoutCards";
import PlanDuration from "./PlanDuration";
import DeliverySlots from "./DeliverySlots";
import PromoOptions from "./PromoOptions";
import BillingTable from "./BillingTable";
import TipOption from "./TipOption";
import DeliveryNotes from "./DeliveryNotes";
import { getUser } from "../../../services/user/getuser";
import axios from "axios";
import { ORDER_URL } from "../../../services/EndPoints";
import { Actions } from "react-native-router-flux";

const { width, height } = Dimensions.get("window");

export default class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      selectedStartDate: null,
      modalVisible: false,
      discount: 0,
      tip: 0,
    };
  }
  dateHandler = (startDate, endDate) => {
    this.setState({ start_date: startDate, end_date: endDate });
  };
  couponHandler = (promo, discount) => {
    discount = parseFloat(discount);
    this.setState({
      promo_code: promo,
      discount: discount,
    });
  };
  noteHandler = (notes) => {
    this.setState({ notes: notes });
  };
  tipHandler = (tip_amount) => {
    tip_amount = parseFloat(tip_amount);
    this.setState({ tip: tip_amount });
  };
  slotHandler = (delivery_slot) => {
    this.setState({ time: delivery_slot });
  };
  cardHandler = (card) => {
    this.setState({ card: card });
  };
  addressHandler = (address) => {
    this.setState({ address: address });
  };
  totalHandler = (total) => {
    this.setState({ total: total });
  };
  orderNow = () => {
    const {
      restaurant,
      user,
      address,
      card,
      total,
      plan,
      price,
      start_date,
      end_date,
      notes,
      time,
      tip,
      discount,
    } = this.state;
    let currenttime = new Date();
    currenttime =
      currenttime.toLocaleDateString() + " " + currenttime.toLocaleTimeString();
    const { _id, email_id, first_name, last_name, phone } = user.data;
    const { addresses, cards } = user.data;
    let currentAddress = addresses.filter(function (el) {
      return el.address_type === address;
    });
    let currentCard = cards.filter(function (el) {
      return el.number === card;
    });
    const newOrder = {
      order_time: currenttime,
      status: "pending",
      time: time.slot,
      user_id: _id,
      email_id: email_id,
      user_name: first_name + " " + last_name,
      address: currentAddress[0],
      card: currentCard[0],
      phone: phone,
      restaurant,
      plan,
      price,
      discount,
      total,
      tip,
      start_date,
      end_date,
      notes,
    };
    console.log(newOrder);
    axios
      .post(ORDER_URL, newOrder)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };
  componentDidMount() {
    getUser("user")
      .then(
        (res) => (
          res === null
            ? (alert("Please login or register to proceed"),
              Actions.jump("auth"))
            : null,
          this.setState({ user: res })
        )
      )
      .catch((err) => console.log(err));
  }

  render() {
    const {
      plan,
      restaurant,
      price,
      discount,
      tip,
      documents,
      meal_type,
      category,
    } = this.state;
    const uri = documents[1].image;
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.body}
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}
        >
          <Image
            source={{ uri: uri }}
            style={{ width: width, height: 170, resizeMode: "cover" }}
            height={150}
          />
          <View
            style={{
              marginTop: -60,
              justifyContent: "center",
              alignSelf: "center",
              elevation: 2,
              borderRadius: 6,
              shadowColor: "#777",
              shadowOffset: {
                height: 2,
                width: 2,
              },
              shadowOpacity: 0.2,
              shadowRadius: 2,
              backgroundColor: "#fff",
              width: width - 10,
              paddingHorizontal: 10,
              paddingBottom: 6,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "#777",
                borderBottomWidth: 0.3,
                paddingBottom: 2,
              }}
            >
              <Icon
                style={{ margin: 2, marginTop: 6 }}
                name="stop-circle"
                color={meal_type === "veg" ? "#2aaf21" : "#cc2224"}
                size={16}
              />
              <Text style={styles.welcomeText}>{restaurant}</Text>
            </View>
            <View style={{ marginTop: 2 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: -4,
                }}
              >
                <Text style={[styles.mealText, { color: "#777" }]}>
                  Subscription
                </Text>
                <Text style={[styles.mealText, { color: "#777" }]}>Price</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginLeft: -4,
                }}
              >
                <Text style={styles.mealText}>
                  {plan === "thirtyPlan"
                    ? " 30 Meals"
                    : plan === "fifteenPlan"
                    ? " 15 Meals"
                    : plan === "twoPlan"
                    ? " 2 Meals"
                    : "..."}
                </Text>
                <Text style={styles.mealText}>
                  {"$"}
                  {price}
                </Text>
              </View>
            </View>
          </View>

          <PlanDuration
            optionrow={styles.optionrow}
            options={styles.options}
            plan={plan}
            dateHandler={this.dateHandler}
          />

          <DeliverySlots
            options={styles.options}
            category={category}
            slotHandler={this.slotHandler}
          />
          <DeliveryNotes
            deliveryNotes={styles.deliveryNotes}
            options={styles.options}
            noteHandler={this.noteHandler}
          />

          <CheckoutAddress
            optionrow={styles.optionrow}
            options={styles.options}
            addressHandler={this.addressHandler}
          />
          <CheckoutCards
            optionrow={styles.optionrow}
            options={styles.options}
            cardHandler={this.cardHandler}
          />
          <TipOption
            deliveryNotes={styles.optionrow}
            options={styles.options}
            tipHandler={this.tipHandler}
          />

          <PromoOptions
            options={styles.options}
            optionrow={styles.optionrow}
            couponHandler={this.couponHandler}
          />
          <BillingTable
            price={price}
            discount={discount}
            tip={tip}
            totalHandler={this.totalHandler}
          />
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={this.orderNow}>
          <Icon name="cart" size={28} color="#FFF" />
          <Text style={styles.btnText}>Complete your Order</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  optionrow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginVertical: 16,
    marginHorizontal: 4,
    borderColor: "#ddd",
    borderWidth: 0.5,
    borderRadius: 4,
  },
  deliveryNotes: {
    paddingHorizontal: 10,
    marginVertical: 20,
    borderColor: "#ddd",
    borderWidth: 0.5,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  options: {
    fontSize: 18,
    color: "#777",
  },
  button: {
    width: width - 5,
    borderRadius: 6,
    borderWidth: 0.2,
    marginHorizontal: 2,
    paddingHorizontal: 5,
    height: 45,
    backgroundColor: "#2962ff",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: 6,
    justifyContent: "center",
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 26,
    textTransform: "uppercase",
  },
  body: {
    padding: 2,
    overflow: "scroll",
    marginBottom: 50,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 2,
  },
  mealText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
