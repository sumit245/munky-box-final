import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Keyboard,
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
import { styles, width, height } from "../../styles/CheckoutStyles";
import Loader from "../utility/Loader";

export default function CheckOut({
  plan,
  restaurant,
  restaurant_id,
  base_price,
  price,
  documents,
  meal_type,
  category,
  promo,
}) {
  const [state, setState] = useState({
    loading: true,
    restaurant: restaurant,
    meal_type: meal_type,
    category: category,
    user: {},
    address: {},
    plan: plan,
    base_price: base_price,
    price: price,
    tip: 0,
    discount: 0,
    taxes: 0,
    delivery_fee: 0,
    service_fee: 0,
    total: 0,
    promo_code: "",
  });
  const [addressLoading, setAddressLoading] = useState(true);

  const [isKeyboardOn, setKeyboardOn] = useState(false);

  const getchefbynameandupdatecartcount = async (restaurant_id) => {
    let MENU_COUNT_URL =
      "http://munkybox-admin.herokuapp.com/api/chefdashboard/getchefbynameandupdatecartcount/" +
      restaurant_id;
    const response = await axios.get(MENU_COUNT_URL);
  };

  useEffect(() => {
    getchefbynameandupdatecartcount(restaurant_id);
  }, []);

  const dateHandler = (startDate, endDate) => {
    setState({ ...state, start_date: startDate, end_date: endDate });
  };
  const couponHandler = (promo, discount, id) => {
    discount = parseFloat(discount);
    setState({
      ...state,
      promo_id: id,
      promo_code: promo,
      discount: discount,
    });
  };
  const noteHandler = (notes) => {
    setState({ ...state, notes: notes });
  };
  const tipHandler = (tip_amount) => {
    tip_amount = parseFloat(tip_amount);
    setState({ ...state, tip: tip_amount });
  };
  const slotHandler = (delivery_slot) => {
    setState({ ...state, time: delivery_slot.slot_time });
  };
  const cardHandler = (card) => {
    let { cards } = state.user;
    let currentCard = cards.filter((item) => item.number === card);
    setState({ ...state, card: currentCard[0] });
  };
  const addressHandler = (address) => {
    setAddressLoading(true);
    let { addresses } = state.user;
    let currentAddress = addresses.filter((item) => item._id === address);
    setState({ ...state, address: currentAddress[0] });
    setAddressLoading(false);
  };
  const totalHandler = (total, delivery_fee, service_fee, taxes) => {
    setState({
      ...state,
      total: total,
      taxes: taxes,
      delivery_fee: delivery_fee,
      service_fee: service_fee,
    });
  };
  const orderNow = async () => {
    const {
      user,
      restaurant,
      address,
      card,
      total,
      plan,
      tip,
      discount,
      delivery_fee,
      service_fee,
      taxes,
      base_price,
      price,
      start_date,
      end_date,
      notes,
      time,
      category,
      meal_type,
      promo_id,
      promo_code,
    } = state;
    const { user_id, email_id, first_name, last_name, phone } = user;
    const newOrder = {
      time: time,
      user_id: user_id,
      restaurant_id: restaurant_id,
      email_id: email_id,
      promo_id: promo_id,
      promo_code: promo_code,
      user_name: first_name + " " + last_name,
      address,
      card: card,
      category: category,
      meal_type: meal_type,
      phone: phone,
      restaurant,
      plan,
      base_price,
      price,
      discount,
      delivery_fee,
      service_fee,
      taxes,
      total,
      tip,
      start_date,
      end_date,
      notes,
    };
    const response = await axios.post(ORDER_URL, newOrder);
    const data = await response.data;
    Actions.push("thankyou", { id: data.data._id, msg: data.msg });
  };
  const fetchUser = async () => {
    const response = await getUser("user");
    const user = await response.data;
    const { addresses, cards } = user;

    if (user !== null) {
      setState({
        ...state,
        user: user,
        loading: false,
        address: addresses[0],
        card: cards[0],
      });
      setAddressLoading(false);
    } else {
      alert("Please login or register to proceed");
      Actions.jump("auth");
    }
  };
  const keyboardShown = () => {
    Keyboard.addListener("keyboardDidShow", () => setKeyboardOn(true));
  };
  const keyboardHidden = () => {
    Keyboard.addListener("keyboardDidHide", () => setKeyboardOn(false));
  };

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      fetchUser();
      keyboardShown();
      keyboardHidden();
    }
    return () => {
      componentMounted = false;
    };
  }, []);
  const uri = documents[1].banner_image;
  if (state.loading) {
    return <Loader msg="Just a few steps away from you delicous food" />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={{ uri: uri }}
          style={{ width: width, height: 170, resizeMode: "cover" }}
          height={150}
        />
        <View style={styles.restaurantHeader}>
          <View style={styles.restaurantTitle}>
            <Icon
              style={{ margin: 2, marginTop: 6 }}
              name="stop-circle"
              color={meal_type === "veg" ? "#2aaf21" : "#cc2224"}
              size={16}
            />
            <Text style={styles.welcomeText}>{restaurant}</Text>
          </View>
          <View style={{ marginTop: 2 }}>
            <View style={styles.subheader}>
              <Text style={[styles.mealText, { color: "#777" }]}>
                Subscription
              </Text>
              <Text style={[styles.mealText, { color: "#777" }]}>Price</Text>
            </View>
            <View style={styles.subheader}>
              <Text style={styles.mealText}>
                {plan === "thirtyPlan"
                  ? " 30 Meals"
                  : plan === "fifteenPlan"
                  ? " 15 Meals"
                  : " 2 Meals"}
              </Text>
              <Text style={styles.mealText}>
                {"$"}
                {price}
              </Text>
            </View>
          </View>
        </View>

        <PlanDuration plan={plan} dateHandler={dateHandler} />
        <DeliverySlots category={category} slotHandler={slotHandler} />
        {!addressLoading && (
          <CheckoutAddress
            addressHandler={addressHandler}
            user={state.user}
            selected={state.address}
          />
        )}

        <CheckoutCards
          cardHandler={cardHandler}
          user={state.user}
          selected={state.card}
        />
        <DeliveryNotes noteHandler={noteHandler} />
        <TipOption tipHandler={tipHandler} />
        <PromoOptions
          couponHandler={couponHandler}
          coupons={promo}
          price={price}
        />
        <BillingTable
          price={price}
          discount={state.discount}
          tip={state.tip}
          totalHandler={totalHandler}
        />
      </ScrollView>
      {!isKeyboardOn && (
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <View style={styles.totalCount}>
            <Text style={{ fontSize: 14, fontWeight: "bold" }}>
              ${state.total}
            </Text>
            <Text style={styles.billLink}>View Detailed bill</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={orderNow}>
            <Text style={styles.btnText}>PROCEED TO PAY</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
