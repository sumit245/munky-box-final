import React, { Component } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-elements";
import { Avatar } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import { Favourite } from "../Components/favourite/favourite";

export default class ItemCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.item,
    };
  }
  reviews = () => {
    Actions.push("reviews");
  };
  detailpage = () => {
    Actions.push("details", {
      title: this.state.restaurant_name,
      ...this.state,
    });
  };
  componentDidMount() {
    console.log(this.state.documents.length);
  }
  render() {
    const { isFavorite } = this.props;
    return (
      <Card containerStyle={styles.item} key={this.state._id}>
        <Image
          source={{
            uri: this.state.documents[0].banner_image,
          }}
          style={styles.image}
          resizeMode="cover"
        />
        <Favourite
          isHome={this.state.isHome}
          restaurant={this.state}
          isFavorite={
            typeof isFavorite !== "boolean"
              ? isFavorite.includes(this.state.restaurant_name)
              : isFavorite
          }
        />
        <View style={styles.footer}>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={this.detailpage}
          >
            <Avatar.Image
              size={40}
              source={{
                uri: this.state.documents[0].restaurant_image,
              }}
              style={{
                marginLeft: 5,
                marginTop: 8,
              }}
            />
            <View>
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.tags,
                    { fontSize: 18, fontWeight: "bold", marginTop: 6 },
                  ]}
                  numberOfLines={1}
                >
                  {this.state.restaurant_name}
                </Text>
                <Icon
                  style={{ marginTop: 10 }}
                  name="stop-circle"
                  color={this.state.meal_type === "veg" ? "#2aaf21" : "#cc2224"}
                  size={16}
                />
              </View>
              <Text
                style={[
                  styles.tags,
                  {
                    maxWidth: "90%",
                    marginTop: -2,
                  },
                ]}
                ellipsizeMode="tail"
                numberOfLines={2}
              >
                {this.state.about}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rating}>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={this.reviews}
            >
              <Icon
                name="star"
                style={{ alignSelf: "center" }}
                color="#ffa726"
              />
              <Text
                style={{
                  marginHorizontal: 2,
                  color: "#ffa726",
                  fontWeight: "bold",
                }}
              >
                {this.props.item.rating || "5"}
                {"/5"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", top: 4, marginLeft: 10 }}>
          <View style={styles.price}>
            <Text numberOfLines={1}>2 MEALS</Text>
            <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
              {this.state.plan
                ? "$" + this.state.plan.twoPlan.customer_2price
                : ""}
            </Text>
          </View>
          <View style={styles.price}>
            <Text numberOfLines={1}>15 MEALS</Text>
            <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
              {this.state.plan
                ? "$" + this.state.plan.fifteenPlan.customer_15price
                : ""}
            </Text>
          </View>
          <View style={styles.price}>
            <Text numberOfLines={1}>30 MEALS</Text>
            <Text numberOfLines={1} style={{ fontWeight: "bold" }}>
              {this.state.plan
                ? "$" + this.state.plan.thirtyPlan.customer_30price
                : ""}
            </Text>
          </View>
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    shadowOffset: { width: 1, height: 4 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
    paddingVertical: 1,
    paddingHorizontal: 1,
    height: 270,
    marginHorizontal: 2,
  },
  image: {
    width: "99%",
    height: 150,
    marginTop: 1,
    marginHorizontal: "0.5%",
    overflow: "hidden",
    position: "absolute",
  },
  title: {
    paddingHorizontal: 5,
    marginTop: 152,
    borderRadius: 2,
    fontSize: 22,
    alignSelf: "flex-start",
    marginBottom: 0,
  },
  rating: {
    paddingHorizontal: 5,
    right: 5,
    position: "absolute",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 2,
    fontSize: 18,
    marginBottom: 0,
    marginTop: 6,
  },
  tags: {
    borderRadius: 2,
    paddingHorizontal: 6,
    fontSize: 14,
    marginTop: 2,
    alignSelf: "flex-start",
  },
  price: {
    borderRightWidth: 1,
    alignItems: "flex-start",
    width: "33%",
    borderRightColor: "#e0e0e0",
    marginBottom: 2,
    paddingHorizontal: 5,
  },
  typelogo: {
    paddingHorizontal: 5,
    marginLeft: 5,
  },
  footer: {
    marginTop: 154,
    flexDirection: "row",
  },
});
