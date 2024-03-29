import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import DetailStack from "./Components/home/DetailStack";
import AccountStack from "./Components/AccountStack";
import SubscriptionStack from "./Components/SubscriptionStack";
import OrderHistory from "./Components/OrderHistory";
import { Text } from 'react-native'

const Tab = createMaterialBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Meals"
        activeColor="#ff6600"
        inactiveColor="#ff9900"
        labeled={true}
        barStyle={{
          backgroundColor: "white",
          justifyContent: "flex-start",
          fontWeight: "bold",
        }}
        tabBarOptions={{ labelStyle: { fontWeight: "bold" } }}
      >
        <Tab.Screen
          name="Meals"
          component={DetailStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="ios-home-outline" color={color} size={24} />
            ),

            tabBarLabel: (
              <Text style={{ fontWeight: "bold", color: "#ff6600" }}>Home</Text>
            ),
          }}
        />
        <Tab.Screen
          name="My Orders"
          component={OrderHistory}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="cart-outline" color={color} size={24} />
            ),
            tabBarLabel: (
              <Text style={{ fontWeight: "bold", color: "#ff6600" }}>
                My Orders
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Subscriptions"
          initialParams={navigation}
          component={SubscriptionStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="md-duplicate-outline" color={color} size={24} />
            ),
            tabBarLabel: (
              <Text style={{ fontWeight: "bold", color: "#ff6600" }}>
                Subscriptions
              </Text>
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountStack}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="person-circle-outline" color={color} size={24} />
            ),
            tabBarLabel: (
              <Text style={{ fontWeight: "bold", color: "#ff6600" }}>
                Profile
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
