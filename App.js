import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useRef } from 'react';
import { registerForPushNotificationsAsync } from './src/services/NotificationServiceHandle';
import Routes from './src/Routes';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Loader from './src/scenes/Components/utility/Loader';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('notificationToken', expoPushToken);
    setLoaded(true);
  }, [expoPushToken]);

  return loaded ? <Routes /> : <Loader msg="Loading" />;
}
