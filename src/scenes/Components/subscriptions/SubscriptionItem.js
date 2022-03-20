import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Entypo";
import axios from "axios";
import { styles } from "../../styles/subscriptionTabStyle";
import moment from "moment";
import MealList, { Item } from "./MealList";
import AddOns from "./AddOns";
import FutureMeals from "./FutureMeals";
import Loader from "../utility/Loader";
import Notes from "./Notes";

export default function SubscriptionItem({
  item,
  width,
  index,
  navigation,
  card,
  user_id,
  getCurrentIndex,
}) {
  const [state, setstate] = useState({
    plan: "",
    restaurant: "",
    start_date: moment(),
    end_date: moment(),
    time: "",
    address_type: "",
    flat_num: "",
    locality: "",
    city: "",
    postal_code: "",
    meals: [],
    skipableTime: "",
  });

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [extras, setExtras] = useState([
    {
      add_on: "",
      add_on_price: "",
      add_on_image: "",
    },
  ]);

  const [todayMeal, setTodayMeal] = useState({});
  const [futuredays, setFutureDays] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [delivered, setDelivered] = useState(false);
  const today = moment().weekday();
  const [futuremeals, setFutureMeals] = useState([]);
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    getCurrentIndex(index);
  }, [index]);

  const fetchSubscriptionDetails = async () => {
    setLoaded(false);
    const restaurantorders = await axios.get(
      "https://munkybox-admin.herokuapp.com/api/newrest/getorders/" +
        item.restaurant_id
    );
    const { meals } = await restaurantorders.data;
    let todayMeal = meals.find((item) => item.day === days[today]);
    setTodayMeal(todayMeal);
    if (today <= 3) {
      let tomorrowMeal = meals.find((item) => item.day === days[today + 1]);
      let dayafterMeal = meals.find((item) => item.day === days[today + 2]);
      let dayafterafter = meals.find((item) => item.day === days[today + 3]);
      let futuremeals = [tomorrowMeal, dayafterMeal, dayafterafter];
      setFutureMeals(futuremeals);
      let futuredays = [days[today + 1], days[today + 2], days[today + 3]];
      setFutureDays(futuredays);
    } else if (today === 4) {
      let tomorrowMeal = meals.find((item) => item.day === "Friday");
      let dayafterMeal = meals.find((item) => item.day === "Saturday");
      let dayafterafter = meals.find((item) => item.day === "Sunday");
      let futuremeals = [tomorrowMeal, dayafterMeal, dayafterafter];
      setFutureMeals(futuremeals);
      let futuredays = ["Friday", "Saturday", "Sunday"];
      setFutureDays(futuredays);
    } else if (today === 5) {
      let tomorrowMeal = meals.find((item) => item.day === "Saturday");
      let dayafterMeal = meals.find((item) => item.day === "Sunday");
      let dayafterafter = meals.find((item) => item.day === "Monday");
      let futuremeals = [tomorrowMeal, dayafterMeal, dayafterafter];
      setFutureMeals(futuremeals);
      let futuredays = ["Saturday", "Sunday", "Monday"];
      setFutureDays(futuredays);
    } else if (today === 6) {
      let tomorrowMeal = meals.find((item) => item.day === "Sunday");
      let dayafterMeal = meals.find((item) => item.day === "Monday");
      let dayafterafter = meals.find((item) => item.day === "Tuesday");
      let futuremeals = [tomorrowMeal, dayafterMeal, dayafterafter];
      setFutureMeals(futuremeals);
      let futuredays = ["Sunday", "Monday", "Tuesday"];
      setFutureDays(futuredays);
    }
    setstate({ ...state, ...item });
    setLoaded(true);
  };
  const fetchRemaining = () => {
    let remaining = moment(state.end_date).diff(moment(), "days") || 0;
    setRemaining(remaining);
  };
  const getCurrentOrderDetails = async () => {
    const res = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/getcurrentorder/getOrderDetails/" +
        item.order_id
    );
    if (res.data !== null) {
      let { delivered } = res.data;
      setDelivered(delivered);
    }
  };

  const placeExtraOrder = async (addOnsPlaced) => {
    const res = await axios.put(
      "http://munkybox-admin.herokuapp.com/api/getcurrentorder/getandupdateorderstatus/" +
        item.order_id,
      {
        add_on: addOnsPlaced,
      }
    );
    if (res.data.status === 200) {
      const response = await axios.put(
        "http://munkybox-admin.herokuapp.com/api/orders/" + item._id,
        { add_on: addOnsPlaced }
      );
      const { data, status } = response.data;
      if (status === 201) {
        alert(
          `Thank you for ordering some extras today with order id # ${item.order_id}`
        );
      }
    }
  };

  useEffect(() => {
    getCurrentOrderDetails();
    fetchSubscriptionDetails();
  }, [item]);
  useEffect(() => {
    fetchRemaining();
  }, [state.start_date, state.end_date]);

  if (loaded) {
    const { address_type, flat_num, city, locality, postal_code } =
      state.address;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 8,
            }}
          >
            <View style={{ marginLeft: 2, marginVertical: 4 }}>
              <Text style={styles.headerTitle}>
                {state.plan === "twoPlan"
                  ? "2 Meals"
                  : state.plan === "fifteenPlan"
                  ? "15 Meals"
                  : "30 Meals"}{" "}
                Subscription
              </Text>
              <Text style={styles.headersubtitle}>by {state.restaurant}</Text>
            </View>
          </View>

          <Text style={{ color: "#22cccf", fontWeight: "bold" }}>
            {item.category}
          </Text>
        </View>

        <ScrollView>
          <View style={styles.tabContainer}>
            <View style={styles.tab}>
              <Text style={{ fontWeight: "bold", color: "#555" }}>STARTED</Text>
              <Text>{state.start_date}</Text>
            </View>

            <View style={styles.tab}>
              <Text style={{ fontWeight: "bold", color: "#555" }}>ENDS</Text>
              <Text>{state.end_date}</Text>
            </View>

            <View style={styles.tab}>
              <Text style={{ fontWeight: "bold", color: "#555" }}>
                REMAINING
              </Text>
              <Text>
                {parseInt(remaining) + 1}{" "}
                {parseInt(remaining) > 1 ? "Meals" : "Meal"}
              </Text>
            </View>
          </View>
          {/* calendar tabs */}

          <View
            style={{
              backgroundColor: "#FFF",
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={styles.optionCard}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}
                >
                  Upcoming Meal
                </Text>
                {delivered && (
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 16,
                      color: "#0f0",
                      marginBottom: 4,
                    }}
                  >
                    Delivered
                  </Text>
                )}
              </View>
              <Text style={{ marginVertical: 4 }}>
                Today, {moment().format("DD MMM")}
              </Text>
              <View
                style={{
                  marginVertical: 4,
                  width: 15,
                  borderTopColor: "#c43e00",
                  borderTopWidth: 4,
                  height: 12,
                  marginHorizontal: 2,
                }}
              />
              <Item meal={todayMeal} index={0} />
            </View>

            <View style={styles.optionCard}>
              <Text style={styles.timing}>{state.time}</Text>
              <Text style={styles.address}>
                <Text style={{ textTransform: "capitalize" }}>
                  {address_type}
                </Text>
                {" | " +
                  (flat_num || "") +
                  ", " +
                  (locality || "") +
                  (city || "") +
                  "," +
                  (postal_code || "")}
              </Text>
            </View>

            <View style={styles.optionCard}>
              <AddOns
                extras={extras}
                day={1}
                meals={todayMeal}
                order_id={item.order_id}
                card={card}
                user_id={user_id}
                placeExtraOrder={placeExtraOrder}
              />
            </View>

            <View style={styles.optionCard}>
              <Notes notes={item.notes} order_id={item._id} />
            </View>

            <View style={[styles.optionCard, { width: width - 4 }]}>
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}
              >
                Future Meals
              </Text>
              <FutureMeals meals={futuremeals} futuredays={futuredays} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return (
      <Loader msg="Please wait while we are fetching your subscriptions" />
    );
  }
}
