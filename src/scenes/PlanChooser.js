import React, { Component } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";

const Item = ({ plan, restaurant, documents,meal_type,category }) => {
  let docs=documents;
  let categs=category
  const getPlan = (data, price, rest) => {
    Actions.push("checkout", {
      restaurant: restaurant,
      price: price,
      plan: data,
      documents: docs,
      meal_type:meal_type,
      category:categs
    });
  };
  return (
    <>
      <Card style={styles.item}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ position: "absolute", left: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              ${plan.twoPlan.customer_2price}
            </Text>

            <Text style={{ fontWeight: "bold" }}>2 MEALS</Text>
          </View>
          <View style={{ position: "absolute", right: 10 }}>
            <TouchableOpacity
              onPress={() => getPlan("twoPlan", plan.twoPlan.customer_2price)}
              style={styles.selectoffer}
            >
              <Text
                style={{ fontSize: 22, fontWeight: "bold", color: "#ffffff" }}
              >
                CHOOSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>

      <Card style={styles.item}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ position: "absolute", left: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ${plan.fifteenPlan.customer_15price}
            </Text>

            <Text style={{ fontWeight: "bold" }}>15 MEALS</Text>
          </View>
          <View style={{ position: "absolute", right: 10 }}>
            <TouchableOpacity
              onPress={() =>
                getPlan("fifteenPlan", plan.fifteenPlan.customer_15price)
              }
              style={styles.selectoffer}
            >
              <Text
                style={{ fontSize: 22, fontWeight: "bold", color: "#ffffff" }}
              >
                CHOOSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
      <Card style={styles.item}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ position: "absolute", left: 10 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              ${plan.thirtyPlan.customer_30price}
            </Text>

            <Text style={{ fontWeight: "bold" }}>30 Days</Text>
          </View>
          <View style={{ position: "absolute", right: 10 }}>
            <TouchableOpacity
              onPress={() =>
                getPlan("thirtyPlan", plan.thirtyPlan.customer_30price)
              }
              style={styles.selectoffer}
            >
              <Text
                style={{ fontSize: 22, fontWeight: "bold", color: "#ffffff" }}
              >
                CHOOSE
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    </>
  );
};

export default class PlanChooser extends Component {
  render() {
    const { plan, restaurant, documents,meal_type,category } = this.props;
    return (
      <>
        <Text style={styles.header}>Most flexible plan ever</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Card style={styles.optioncard}>
            <Card.Content>
              <View style={{ flexDirection: "row" }}>
                <Icon name="swap-horizontal" size={30} />
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
                <Icon name="infinite-outline" size={30} />
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
        <Text style={[{ marginTop: 5 }, styles.header]}>Choose your plan</Text>
        <Item plan={plan} restaurant={restaurant} documents={documents} meal_type={meal_type} category={category} />
      </>
    );
  }
}
const styles = StyleSheet.create({
  optioncard: {
    height: 150,
    width: 200,
    margin: 5,
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
    padding: 2,
  },
  cardcontent: {
    fontSize: 16,
    textAlign: "justify",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 7,
    color: "#444",
    marginLeft: 6,
  },
  item: {
    paddingVertical: 15,
    height: 70,
    borderRadius: 5,
    elevation: 2,
    margin: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
  },
  selectoffer: {
    backgroundColor: "#2e7d32",
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
