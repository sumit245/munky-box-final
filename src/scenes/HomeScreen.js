import  React,{ Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import DetailStack from './Components/DetailStack'
import AccountStack from './Components/AccountStack'
import SubscriptionStack from './Components/SubscriptionStack';
import Favouite from './Components/Favouite';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      activeColor="#28b5b5"
      inactiveColor='#4b778d'
      inactiveTintColor='black'
      labeled={false}
      barStyle={{ backgroundColor: 'white', justifyContent: 'flex-start' }}
    >
      <Tab.Screen
        name="Feed"
        component={DetailStack}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name='ios-home-outline' color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favouite}
        options={{
          tabBarBadge: 0 ,
          tabBarIcon: ({ color }) => (
            <Icon name='ios-heart-circle-outline' color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Subscriptions"
        component={SubscriptionStack}
        options={{
          tabBarLabel: 'Subscriptions',
          tabBarIcon: ({ color }) => (
            <Icon name='md-duplicate-outline' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <Icon name='person-circle-outline' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
export default class HomeScreen extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyTabs />
      </NavigationContainer>
    )
  }
}
