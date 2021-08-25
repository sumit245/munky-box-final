import React, { Component } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import axios from "axios";
import { CUISINE_URL, MEALS, RESTAURANT_URL } from "../../services/EndPoints";
import Cuisine from "./home/Cuisine";
import Lunch from "./home/Lunch";
import HeaderComponent from "./home/HeaderComponent";
import { StatusBar } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export default class DetailStack extends Component {
  state = {
    index: 0,
    routes: [
      { key: "1", title: "Lunch" },
      { key: "2", title: "Dinner" },
    ],
    cuisine: [],
    restaurant: [],
    loading: true,
    msg: "Fetching some best restaurant for you",
    highLighted: false,
  };
  _handleIndexChange = (index) => {
    if (index === 0) {
      this.setState({
        loading: true,
        msg: "Hold on tight!!! we are fetching some lunch for you",
      });
      axios
        .get(MEALS + "Lunch")
        .then((res) => {
          this.setState({
            restaurant: res.data,
            loading: false,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      this.setState({
        loading: true,
        msg: "Hold on tight!!! we are fetching some dinner for you",
      });
      axios
        .get(MEALS + "Dinner")
        .then((res) => {
          this.setState({
            restaurant: res.data,
            loading: false,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }

    this.setState({ index });
  };
  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#2266cf" }}
      style={{
        backgroundColor: "transparent",
        padding: 0,
        height: 34,
        marginTop: 2,

      }}
      activeColor="#2266ff"
      labelStyle={{ fontWeight: "bold" }}
      inactiveColor="#272727"
    />
  );

  renderScene = ({ route }) => {
    switch (route.title) {
      case "Lunch":
        return <Lunch restaurant={this.state.restaurant} />;
      case "Dinner":
        return <Lunch restaurant={this.state.restaurant} />;
      default:
        return null;
    }
  };
  componentDidMount() {
    axios
      .get(CUISINE_URL)
      .then((res) => {
        this.setState({ cuisine: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
    axios
      .get(RESTAURANT_URL)
      .then((res) => {
        this.setState({ restaurant: res.data, loading: false });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  selectCuisine = (cuisine) => {
    this.setState({
      loading: true,
      msg: "Hold on tight!!! we are fetching some best food for you",
    });
    axios
      .get(RESTAURANT_URL)
      .then((res) => {
        let restaurants = res.data;
        let filteredRestaurant = [];
        for (let i = 0; i < restaurants.length; i++) {
          if (restaurants[i].cuisine_type === cuisine) {
            filteredRestaurant.push(restaurants[i]);
          }
        }
        this.setState({
          restaurant: filteredRestaurant,
          loading: false,
          highLighted: cuisine,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  getApiData = () => {
    this.setState({
      loading: true,
      msg: "Hold on tight!!! we are fetching some best food for you",
    }),
      axios
        .get(RESTAURANT_URL)
        .then((res) => {
          this.setState({ restaurant: res.data, loading: false });
        })
        .catch((err) => {
          console.error(err);
        });
  };

  renderCuisine = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.selectCuisine(item.cuisineName)}>
        <Cuisine
          image={item.image}
          title={item.cuisineName}
          highLighted={item.cuisineName===this.state.highLighted}
        />
      </TouchableOpacity>
    );
  };

  render() {
    const { cuisine, routes, index, loading, msg, highLighted } = this.state;
    {
      return !loading ? (
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar />
          <HeaderComponent />

          <View style={{ height: 100 }}>
            <FlatList
              contentContainerStyle={{ marginLeft: 4 }}
              data={this.state.cuisine}
              ListHeaderComponent={() => (
                <View>
                  <TouchableOpacity
                    style={{
                      width: 40,
                      height: 40,
                      borderColor: !highLighted ? "#2266cf" : "fff",
                      borderWidth: 1,
                      borderRadius: 20,
                      marginVertical: 12,
                      backgroundColor: "#FFF",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={this.getApiData}
                  >
                    <Icon name="restaurant-outline" size={20} />
                  </TouchableOpacity>
                  <Text
                    style={[
                      styles.cuisineName,
                      {
                        textAlign: "center",
                        fontWeight: !highLighted ? "bold" : "normal",
                      },
                    ]}
                  >
                    All
                  </Text>
                </View>
              )}
              ListHeaderComponentStyle={{ marginHorizontal: 2, marginRight: 4 }}
              renderItem={this.renderCuisine}
              keyExtractor={(item) => item._id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <TabView
            navigationState={{ index, routes }}
            renderScene={this.renderScene}
            renderTabBar={this.renderTabBar}
            onIndexChange={this._handleIndexChange}
            style={{ marginTop: -20, marginHorizontal: 8 }}
          />
        </SafeAreaView>
      ) : (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#777" animating />
          <Text style={{ fontSize: 22, color: "#777", textAlign: "center" }}>
            {msg}
          </Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cfcfcf",
  },
  cuisine_name: {
    fontSize: 14,
    textAlign: "left",
    color: "#000",
  },
  containerStyle: { backgroundColor: "white", padding: 20 },
});
