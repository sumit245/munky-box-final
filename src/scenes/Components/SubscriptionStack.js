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
import CalenderStrip from "react-native-calendar-strip";
import { styles } from "../styles/subscriptionTabStyle";
import { getUser } from "../../services/user/getuser";
import { MY_ORDER_URL } from "../../services/EndPoints";
import Loader from "./utility/Loader";
import moment from "moment";
import MealList from "./subscriptions/MealList";
import { width } from "../styles/AuthStyle";
import AddOns from "./subscriptions/AddOns";

const convertTime = (giventime) => {
  return giventime.split("-")[0];
};

export default function SubscriptionStack({ navigation }) {
  const [state, setState] = useState({
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
  const [loaded, setLoaded] = useState(false);
  const [day, setDay] = useState(1);
  const [extras, setExtras] = useState([]);
  const onDateSelected = (date) => {
    var day = moment(date).weekday();
    setDay(day);
  };
  const getSubscriptions = async () => {
    try {
      const user = await getUser("user");
      const { data } = await user;
      const { user_id } = data;
      const response = await axios.get(MY_ORDER_URL + user_id);
      const myorder = await response.data;
      const {
        start_date,
        end_date,
        time,
        address,
        plan,
        restaurant,
        restaurant_id,
      } = myorder[0];
      const restaurantorders = await axios.get(
        "https://munkybox-admin.herokuapp.com/api/newrest/getorders/" +
          restaurant_id
      );
      const { meals } = await restaurantorders.data;
      let addOns = [];
      Array.isArray(meals) &&
        meals.map((data, key) => {
          let add_on = {
            day: data.day,
            add_on: data.add_on,
          };
          addOns.push(add_on);
        });
      let remaining = moment(end_date).diff(moment(start_date), "days");
      const { address_type, flat_num, locality, city, postal_code } = address;
      let early = convertTime(time);
      let skipableTime = early - 3;
      setState({
        ...state,
        plan,
        restaurant,
        start_date,
        end_date,
        time,
        remaining,
        address_type,
        flat_num,
        locality,
        city,
        postal_code,
        meals,
        skipableTime: skipableTime,
      });
      setExtras(addOns);
      setLoaded(true);
    } catch (err) {
      alert("Please login First");
    }
  };
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      getSubscriptions();
    }
    return () => {
      componentMounted = false;
    };
  }, []);
  if (loaded) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name="chevron-back"
              size={28}
              onPress={() => navigation.goBack()}
            />
            <View>
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
              <Text>{state.remaining} Meals</Text>
            </View>
          </View>
          <View
            style={{
              marginHorizontal: 2,
              backgroundColor: "#FFF",
              padding: 6,
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={styles.optionCard}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Upcoming Meal
              </Text>
              <Text>Today, {moment().format("DD MMM")}</Text>
              <MealList meals={state.meals} day={day} />
            </View>
            <View style={styles.optionCard}>
              <Text style={styles.timing}>{state.time}</Text>
              <Text style={styles.address}>
                <Text style={{ textTransform: "capitalize" }}>
                  {state.address_type}
                </Text>
                {" | " +
                  state.flat_num +
                  ", " +
                  state.locality +
                  ", " +
                  state.city +
                  "-" +
                  state.postal_code}
              </Text>
            </View>

            {state.plan !== "twoPlan" && (
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 8,
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity style={styles.btn}>
                  <Text
                    style={{ fontSize: 16, color: "#888", fontWeight: "bold" }}
                  >
                    Swap Meal
                  </Text>
                  <Icon name="swap-vertical" size={20} color="#888" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text
                    style={{ fontSize: 18, color: "#888", fontWeight: "bold" }}
                  >
                    Skip Meal
                  </Text>
                  <Icon name="ios-arrow-redo" color="#888" size={20} />
                </TouchableOpacity>
              </View>
            )}

            <View style={styles.optionCard}>
              <AddOns extras={extras} day={1} />
            </View>

            <Text style={{ marginTop: 8 }}>
              You can swap or skip this meal till {state.skipableTime} AM
            </Text>

            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "bold",
                  marginTop: 8,
                }}
              >
                Future Meals
              </Text>
              <CalenderStrip
                daySelectionAnimation={{
                  type: "background",
                  duration: 50,
                  highlightColor: "red",
                }}
                dayContainerStyle={{
                  height: 40,
                  width: 40,
                  borderRadius: 4,
                }}
                style={{
                  height: 40,
                  width: width - 20,
                }}
                responsiveSizingOffset={1}
                shouldAllowFontScaling={false}
                showDayName={true}
                showDayNumber={false}
                startingDate={0}
                selectedDate={Date.now()}
                highlightDateNumberStyle={{ color: "white" }}
                highlightDateNameStyle={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
                dateNameStyle={{
                  fontSize: 12,
                  color: "#000",
                  fontWeight: "bold",
                }}
                disabledDateNameStyle={{ color: "grey" }}
                showMonth={false}
                scrollable={false}
                leftSelector={[]}
                rightSelector={[]}
                onDateSelected={(date) => onDateSelected(date)}
              />
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
