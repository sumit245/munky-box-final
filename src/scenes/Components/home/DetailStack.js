import React, { Component } from "react";
import {
  View,
  FlatList,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import { TabView, TabBar } from "react-native-tab-view";
import axios from "axios";
import {
  CUISINE_URL,
  MEALS,
  RESTAURANT_URL,
  USER_URL,
  VEG_NON_VEG,
} from "../../../services/EndPoints";
import Cuisine from "./Cuisine";
import Lunch from "./Lunch";
import HeaderComponent from "./HeaderComponent";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from "../../styles/HomeStyles";
import Loader from "../utility/Loader";
import BannerCarousel from "../BannerCarousel";
import { StatusBar } from "react-native";
import { getUser } from "../../../services/user/getuser";

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
    favCount: 0,
    refreshing: false,
  };
  _handleIndexChange = async (index) => {
    this.setState({
      loading: true,
      msg: "Hold on tight!!! Fetching best foods for you",
      index: index,
    });
    if (index === 0) {
      const lunchResponse = await axios.get(MEALS + "Lunch");
      const lunch = await lunchResponse.data;
      this.setState({
        restaurant: lunch,
        loading: false,
      });
    } else {
      const dinnerResponse = await axios.get(MEALS + "Dinner");
      const dinners = await dinnerResponse.data;
      this.setState({
        restaurant: dinners,
        loading: false,
      });
    }
  };
  renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: "#2266cf", marginHorizontal: 2 }}
      style={{
        backgroundColor: "transparent",
        height: 40,
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
  getFavoriteCount = async () => {
    const users = await getUser("user");
    const { _id } = await users.data;
    const userResponse = await axios.get(USER_URL + _id);
    const { favorite } = await userResponse.data;
    this.setState({ favCount: favorite.length });
  };
  async componentDidMount() {
    const cuisineResponse = await axios.get(CUISINE_URL);
    const cuisine = await cuisineResponse.data;
    console.log(cuisine);
    const restaurantResponse = await axios.get(RESTAURANT_URL);
    const restaurant = await restaurantResponse.data;
    console.log(restaurant);
    this.getFavoriteCount();
    this.setState({ restaurant: restaurant, cuisine: cuisine, loading: false });
  }
  selectCuisine = async (cuisine) => {
    this.setState({
      loading: true,
      msg: "Hold on tight!!! Fetching best food for you",
    });
    const response = await axios.get(RESTAURANT_URL);
    const restaurants = await response.data;
    let filteredRestaurant = restaurants.filter(
      (restaurant) => restaurant.cuisine_type === cuisine
    );
    this.setState({
      restaurant: filteredRestaurant,
      loading: false,
      highLighted: cuisine,
    });
  };
  getApiData = async () => {
    this.setState({
      loading: true,
      msg: "Hold on tight!!! Fetching best food for you",
      highLighted: false,
    });
    const response = await axios.get(RESTAURANT_URL);
    const restaurant = await response.data;
    this.setState({
      restaurant: restaurant,
      loading: false,
    });
  };

  renderCuisine = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.selectCuisine(item.cuisineName)}>
        <Cuisine
          image={item.image}
          title={item.cuisineName}
          highLighted={item.cuisineName === this.state.highLighted}
        />
      </TouchableOpacity>
    );
  };
  applyfilter = async (filter) => {
    this.setState({
      loading: true,
      msg: "Hold on tight!!! Fetching best foods for you",
    });
    const response = await axios.get(VEG_NON_VEG + filter);
    const filtererRestaurant = await response.data;
    this.setState({
      restaurant: filtererRestaurant,
      loading: false,
    });
  };
  onRefresh = () => {
    this.getApiData();
  };

  componentDidUpdate() {
    this.getFavoriteCount();
  }

  render() {
    const { cuisine, routes, index, loading, msg, highLighted, favCount } =
      this.state;
    {
      return !loading ? (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
          <HeaderComponent favCount={favCount} applyfilter={this.applyfilter} />
          <ScrollView
            style={{ flex: 1 }}
            refreshControl={
              <RefreshControl
                refreshing={this.state.loading}
                onRefresh={this.onRefresh}
                colors={["#f00", "#0f0", "#00f"]}
              />
            }
          >
            <View>
              <FlatList
                contentContainerStyle={{ marginLeft: 4, marginBottom: 8 }}
                data={cuisine}
                ListHeaderComponent={() => (
                  <>
                    <TouchableOpacity
                      style={[
                        styles.firstCuisine,
                        {
                          borderColor: !highLighted ? "#2266cf" : "fff",
                        },
                      ]}
                      onPress={this.getApiData}
                    >
                      <Icon name="restaurant-outline" size={20} />
                    </TouchableOpacity>
                    <Text
                      style={[
                        styles.cuisine_name,
                        {
                          fontWeight: !highLighted ? "bold" : "normal",
                        },
                      ]}
                    >
                      All
                    </Text>
                  </>
                )}
                renderItem={this.renderCuisine}
                keyExtractor={(item) => item._id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            <BannerCarousel />
            {/* <Lunch restaurant={this.state.restaurant} /> */}
            <TabView
              navigationState={{ index, routes }}
              renderScene={this.renderScene}
              renderTabBar={this.renderTabBar}
              onIndexChange={this._handleIndexChange}
              style={{ marginTop: -20, marginHorizontal: 2 }}
            />
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Loader msg={msg} />
      );
    }
  }
}
