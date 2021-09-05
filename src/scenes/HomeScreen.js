import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import DetailStack from "./Components/DetailStack";
import AccountStack from "./Components/AccountStack";
import SubscriptionStack from "./Components/SubscriptionStack";
import Favouite from "./Components/Favouite";
import { getUser } from "../services/user/getuser";
import axios from "axios";

const Tab = createMaterialBottomTabNavigator();

function MyTabs({ favoriteCounter }) {
  return (
    <Tab.Navigator
      initialRouteName="Meals"
      activeColor="#28b5b5"
      inactiveColor="#4b778d"
      inactiveTintColor="black"
      labeled={false}
      barStyle={{ backgroundColor: "white", justifyContent: "flex-start" }}
    >
      <Tab.Screen
        name="Meals"
        component={DetailStack}
        initialParams={favoriteCounter}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favouite}
        options={{
          tabBarBadge: favoriteCounter,
          tabBarIcon: ({ color }) => (
            <Icon name="ios-heart-circle-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionStack}
        options={{
          tabBarLabel: "Subscriptions",
          tabBarIcon: ({ color }) => (
            <Icon name="md-duplicate-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="person-circle-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default class HomeScreen extends Component {
  state = {
    favoriteCounter: 0,
  };
  _getFavoriteData = () => {
    getUser("user").then((res) => {
      let id = res.data._id;
      axios
        .get("http://munkybox-admin.herokuapp.com/api/users/getfavorite/" + id)
        .then((response) => {
          let numRest = response.data.data;
          numRest = numRest.length;
          this.setState({ favoriteCounter: numRest });
        })
        .catch((err) => {
          alert(err);
        });
    });
    this.setState({ isFetching: false });
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.favoriteCounter !== nextState.favoriteCounter) {
      return true;
    }
    return false;
  }
  componentDidMount() {
    this._getFavoriteData();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.favoriteCounter !== this.state.favoriteCounter) {
      this._getFavoriteData();
    }
  }
  render() {
    console.log(this.state.favoriteCounter);
    return (
      <NavigationContainer>
        <MyTabs favoriteCounter={this.state.favoriteCounter} />
      </NavigationContainer>
    );
  }
}
