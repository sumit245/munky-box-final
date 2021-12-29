import React, { useEffect, useState, useRef } from "react";
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
  width,
  index,
  navigation,
  ref,
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
  // const ref = useRef();
  const [todayMeal, setTodayMeal] = useState({});
  const [futuredays, setFutureDays] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const today = moment().weekday();
  const [futuremeals, setFutureMeals] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const onPressPrevious = () => {
    ref.current.scrollToIndex({ animated: true, index: index - 1 });
  };

  const onPressNext = () => {
    ref.current.scrollToIndex({ animated: true, index: index + 1 });
  };
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
    let remaining = moment(state.end_date).diff(
      moment(state.start_date),
      "days" || 0
    );
    setRemaining(remaining);
    let futuredays = [days[today + 1], days[today + 2], days[today + 3]];
    setFutureDays(futuredays);
    setLoaded(true);
  };
  useEffect(() => {
    setstate({ ...state, ...item });
    fetchSubscriptionDetails();
  }, [item]);

  if (loaded) {
    const { address_type, flat_num, city, locality, postal_code } =
      state.address;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
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
              <AddOns extras={extras} day={1} />
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
        <View
          style={{
            position: "absolute",
            top: "50%",
            elevation: 10,
            zIndex: 1000,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: "2%",
            width: "96%",
          }}
        >
          {index !== 0 ? (
            <TouchableOpacity
              style={{
                height: 36,
                width: 36,
                borderRadius: 18,
                backgroundColor: "#c0c0c0",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onPressPrevious}
            >
              <Icon name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
          ) : (
            <View />
          )}
          <TouchableOpacity
            style={{
              height: 36,
              width: 36,
              borderRadius: 18,
              backgroundColor: "#cccccc",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={onPressNext}
          >
            <Icon name="chevron-forward" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return null;
  }
}
