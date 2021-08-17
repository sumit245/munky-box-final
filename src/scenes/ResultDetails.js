import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MenuItem from "./Components/MenuItem";
import { Actions } from "react-native-router-flux";
import PlanChooser from "./PlanChooser";
import Icon from "react-native-vector-icons/Ionicons";

const renderItem = ({ item, index }) => <MenuItem index={index} meals={item} />;
const { width, height } = Dimensions.get("window");
export default class ResultDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
    };
  }

  chooser = () => {
    Actions.planchooser({ title: this.state.title,documents:this.state.documents });
  };

  render() {
    const { meals, documents, plan, restaurant_name, rating,meal_type,category } = this.state;
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Image
            source={{ uri: documents[1].image }}
            style={styles.headerImage}
          />
          <Image
            source={{ uri: documents[0].image }}
            style={styles.avatarImage}
            height={0.3 * width}
            width={0.3 * width}
          />
        </View>
        <Text style={styles.chefName}>{this.props.title}</Text>
        <View style={styles.ratingAndReviews}>
          <TouchableOpacity style={{ flexDirection: "row" }}>
            <Icon name="star" style={{ alignSelf: "center" }} color="#ffa726" />
            <Text
              style={{
                marginHorizontal: 2,
                color: "#ffa726",
                fontWeight: "bold",
              }}
            >
              {rating || "5"}
              {"/5"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Actions.push("reviews")}>
            <Text
              style={{
                marginHorizontal: 2,
                color: "#ffa726",
                fontWeight: "bold",
                textDecorationLine: "underline",
                borderLeftColor: "#ffa726",
                borderLeftWidth: 1,
                paddingLeft: 4,
              }}
            >
              Reviews
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          contentContainerStyle={{ marginLeft: 2 }}
          data={meals}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />

        <Text
          style={{
            fontSize: 16,
            justifyContent: "flex-start",
            color: "#585855",
          }}
        >
          {this.props.description}
        </Text>
        <PlanChooser plan={plan} restaurant={restaurant_name} documents={documents} meal_type={meal_type} category={category} />
        <View style={styles.about}>
          <Text style={{ fontWeight: "bold" }}>About</Text>
          <Text style={{ fontSize: 16, textAlign: "justify" }}>
            {this.props.about}
          </Text>
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    overflow: "scroll",
    height: height,
  },
  card: {
    height: 150,
  },
  header: {
    elevation: 1,
  },
  headerImage: {
    width: width,
    height: 0.5 * width,
    resizeMode: "cover",
  },
  avatarImage: {
    width: 0.3 * width,
    height: 0.3 * width,
    borderRadius: 0.15 * width,
    borderWidth: 2,
    borderColor: "#fcfcfc",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -0.14 * width,
  },
  chefName: {
    color: "#444",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    padding: 2,
  },
  about: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
    padding: 5,
  },
  ratingAndReviews: {
    alignItems: "center",
    marginVertical: 4,
    justifyContent: "center",
    flexDirection: "row",
  },
});
