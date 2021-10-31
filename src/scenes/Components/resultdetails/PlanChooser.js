import React, { useEffect, useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/ResultStyles";
import { PROFIT_URL } from "../../../services/EndPoints";
import axios from "axios";

export default function PlanChooser({
  base_2price,
  base_15price,
  base_30price,
  restaurant,
  documents,
  meal_type,
  category,
  promo,
  restaurant_id,
}) {
  const getPlan = (planName, price) => {
    let restaurant_plans =
      planName === "twoPlan"
        ? "2 Meals"
        : planName === "fifteenPlan"
        ? "15 Meals"
        : "30 Meals";
    let mypromo = restaurant_plans === promo.plan_name ? promo : null;
    Actions.push("checkout", {
      restaurant: restaurant,
      restaurant_id: restaurant_id,
      price: price,
      plan: planName,
      documents: documents,
      meal_type: meal_type,
      category: category,
      promo: mypromo,
    });
  };
  const [plan, setPlan] = useState({});

  useEffect(() => {
    let componentMounted = true;
    const fetchProfits = async () => {
      const response = await axios.get(PROFIT_URL);
      const { data } = await response;
      if (componentMounted) {
        setPlan(data);
      }
    };
    fetchProfits();
    return () => {
      componentMounted = false;
    };
  });
  return (
    <>
      <Text style={styles.header}>Most flexible plan ever</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Card style={styles.optioncard}>
          <Card.Content>
            <View style={{ flexDirection: "row" }}>
              <Icon name="swap-vertical" size={30} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingHorizontal: 10,
                }}
              >
                SWAP MEAL
              </Text>
            </View>
            <Paragraph style={styles.cardcontent}>
              Craving a change? Swap upcoming meal with any other meal.
            </Paragraph>
          </Card.Content>
        </Card>
        <Card style={styles.optioncard}>
          <Card.Content>
            <View style={{ flexDirection: "row" }}>
              <Icon name="ios-arrow-redo" size={30} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  paddingHorizontal: 10,
                }}
              >
                SKIP MEAL
              </Text>
            </View>
            <Paragraph style={styles.cardcontent}>
              Sudden change in plan? Now you can skip 3 meals in monthly
              subscription
            </Paragraph>
          </Card.Content>
        </Card>
      </ScrollView>
      <Text style={styles.header}>Choose your plan</Text>
      <Card style={styles.planCard}>
        <View style={styles.planBody}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>2 MEALS</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              ${parseFloat(base_2price) + parseFloat(plan.twoPlan)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              getPlan(
                "twoPlan",
                parseFloat(base_2price) + parseFloat(plan.twoPlan)
              )
            }
            style={styles.selectoffer}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff" }}
            >
              CHOOSE
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
      <Card style={styles.planCard}>
        <View style={styles.planBody}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>15 MEALS</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ${parseFloat(base_15price) + parseFloat(plan.fifteenPlan)}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              getPlan(
                "fifteenPlan",
                parseFloat(base_15price) + parseFloat(plan.fifteenPlan)
              )
            }
            style={styles.selectoffer}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff" }}
            >
              CHOOSE
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
      <Card style={styles.planCard}>
        <View style={styles.planBody}>
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 12 }}>30 MEALS</Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ${parseFloat(base_30price) + parseFloat(plan.thirtyPlan)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              getPlan(
                "thirtyPlan",
                parseFloat(base_30price) + parseFloat(plan.thirtyPlan)
              )
            }
            style={styles.selectoffer}
          >
            <Text
              style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff" }}
            >
              CHOOSE
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </>
  );
}
