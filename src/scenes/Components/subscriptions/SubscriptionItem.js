import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { styles } from "../../styles/subscriptionTabStyle";
import moment from "moment";
import MealList, { Item } from "./MealList";
import AddOns from "./AddOns";
import FutureMeals from "./FutureMeals";

export default function SubscriptionItem({
  item,
  index,
  nextHandler,
  prevHandler,
  width,
}) {
  const [state, setstate] = useState({
    plan: "",
    restaurant: "",
    start_date: "",
    end_date: "",
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
  const today = moment().weekday();
  const [futuremeals, setFutureMeals] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const fetchSubscriptionDetails = async () => {
    const restaurantorders = await axios.get(
      "https://munkybox-admin.herokuapp.com/api/newrest/getorders/" +
        item.restaurant_id
    );
    const { meals } = await restaurantorders.data;
    let todayMeal = meals.find((item) => item.day === days[today]);
    setTodayMeal(todayMeal);
    let tomorrowMeal = meals.find((item) => item.day === days[today + 1]);
    let dayafterMeal = meals.find((item) => item.day === days[today + 2]);
    let dayafterafter = meals.find((item) => item.day === days[today + 3]);
    let futuremeals = [tomorrowMeal, dayafterMeal, dayafterafter];
    setFutureMeals(futuremeals);
    let futuredays = [days[today + 1], days[today + 2], days[today + 2]];
    setFutureDays(futuredays);
  };
  useEffect(() => {
    setstate({ ...state, ...item });
    let remaining = moment(state.end_date).diff(
      moment(state.start_date),
      "days"
    );
    setRemaining(remaining);
    setLoaded(true);
    fetchSubscriptionDetails();
  }, [item]);
  if (loaded) {
    const { address_type, flat_num, city, locality, postal_code } =
      state.address;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="chevron-back"
              size={28}
              onPress={() => navigation.goBack()}
            />
            <View style={{ marginLeft: 2 }}>
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
          <Text style={{ color: "#22cccf", fontWeight: "bold" }}>NEXT</Text>
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
              <Text>{remaining} Meals</Text>
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
              <Text
                style={{ fontWeight: "bold", fontSize: 16, marginBottom: 4 }}
              >
                Upcoming Meal
              </Text>
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
              {/* <MealList meals={state.meals} day={day} /> */}
            </View>

            <View style={styles.optionCard}>
              <Text style={styles.timing}>{state.time}</Text>
              <Text style={styles.address}>
                <Text style={{ textTransform: "capitalize" }}>
                  {address_type}
                </Text>
                {" | " +
                  flat_num +
                  ", " +
                  locality +
                  ", " +
                  city +
                  "-" +
                  postal_code}
              </Text>
            </View>

            <View style={styles.optionCard}>
              <Text style={{ marginTop: 8 }}>
                You can swap or skip this meal till {state.skipableTime} AM
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.btn}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Pause
                  </Text>
                  <Icon name="pause-circle-outline" size={20} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text
                    style={{
                      fontSize: 18,
                      color: "#000",
                      fontWeight: "bold",
                    }}
                  >
                    Skip
                  </Text>
                  <Icon
                    name="ios-play-skip-forward-outline"
                    color="#000"
                    size={20}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.optionCard}>
              <AddOns extras={extras} day={1} />
            </View>
            <View style={styles.optionCard}>
              <FutureMeals meals={futuremeals} futuredays={futuredays} /> 
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  } else {
    return null;
  }
}
