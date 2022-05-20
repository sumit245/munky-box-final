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
import { height, styles } from "../../styles/HomeStyles";
import Loader from "../utility/Loader";
import BannerCarousel from "../BannerCarousel";
import { StatusBar } from "react-native";
import { getUser } from "../../../services/user/getuser";
import AdminCoupon from "./AdminCoupon";

export default class DetailStack extends Component {
  state = {
    index: 0,
    routes: [
      { key: "1", title: "Lunch" },
      { key: "2", title: "Dinner" },
    ],
    cuisine: [],
    restaurant: [],
    tempRestaurant: [],
    loading: true,
    msg: "Fetching some best restaurant for you",
    highLighted: false,
    favCount: 0,
    refreshing: false,
    search: false,
    filterCount: 0,
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
      indicatorStyle={{ backgroundColor: "#ff9900", marginHorizontal: 60, width: 100, }}
      style={{
        backgroundColor: "transparent",
        height: 40,
      }}
      activeColor="#ff6600"
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
    const restaurantResponse = await axios.get(RESTAURANT_URL);
    const restaurant = await restaurantResponse.data;
    this.getFavoriteCount();
    this.setState({
      restaurant: restaurant,
      cuisine: cuisine,
      loading: false,
      tempRestaurant: restaurant,
    });
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

  applyfilter = (filter, fc) => {
    let allRestaurant = this.state.restaurant;
    this.setState({
      filterCount: fc,
      tempRestaurant: allRestaurant,
    });
    let filteredRestaurant = allRestaurant.filter(
      (item) => item.meal_type === filter
    );
    this.setState({
      restaurant: filteredRestaurant,
    });
  };

  clearfilter = () => {
    let allRestaurant = this.state.tempRestaurant;
    this.setState({ restaurant: allRestaurant });
  };

  onRefresh = () => {
    this.getApiData();
  };

  setSearch = (e) => {
    this.setState((prevState) => ({
      search: !prevState.search,
    }));
  };

  componentDidUpdate(prevState, prevProps) {
    if (this.state.favCount !== prevState.favCount) {
      this.getFavoriteCount();
    }
  }

  searchByCity = (query, isSearching) => {
    let allRestaurant = this.state.tempRestaurant;
    if (query === "") {
      this.setState({
        loading: true,
        restaurant: allRestaurant,
        loading: false,
      });
    }
    let filteredRestaurant = allRestaurant.filter(
      (item) => item.city === query
    );
    this.setState({
      restaurant: filteredRestaurant,
    });
  };
  clearSearch = () => {
    let allRestaurant = this.state.tempRestaurant;
    this.setState({ restaurant: allRestaurant });
  };
  render() {
    const {
      cuisine,
      routes,
      index,
      loading,
      msg,
      highLighted,
      favCount,
      filterCount,
    } = this.state;
    {
      return (
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight }}>
          <HeaderComponent
            favCount={favCount}
            applyfilter={this.applyfilter}
            clearfilter={this.clearfilter}
            searchTerm={this.searchByCity}
            filterCount={filterCount}
            clearSearch={this.clearSearch}
          />
          {!loading ? (
         <ScrollView
              contentContainerStyle={{ flexGrow: 1 }}
              scrollEnabled={true}
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
                  contentContainerStyle={{marginBottom:20, marginLeft: 4, }}
                  data={cuisine}
                  ListHeaderComponent={() => (
                    <>
                      <TouchableOpacity
                        style={[
                          styles.firstCuisine,
                          {
                            borderColor: !highLighted ? "#ff9900" : "fff",
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
                            color: !highLighted ? "#ff6600" : "#000"
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
              <AdminCoupon/>
              <TabView
                navigationState={{ index, routes }}
                renderScene={this.renderScene}
                renderTabBar={this.renderTabBar}
                onIndexChange={this._handleIndexChange}
                style={{ marginHorizontal: 2 }}
              />
              
            </ScrollView>
          ) : (
            <Loader msg={msg} />
          )}
        </SafeAreaView>
      );
    }
  }
}
