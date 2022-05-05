import  React,{ Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Card } from "react-native-paper";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";

export default class NotificationStack extends Component {
  state = { isSwitchOn: false };
  onToggleSwitch = () => this.setState({ isSwitchOn: true });
  render() {
    const {isSwitchOn}=this.state
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={()=>Actions.pop()} >
            <Icon name="chevron-back" size={32} />
          </TouchableOpacity>
          <Text style={styles.appHeader}>{this.props.title}</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          <Card style={styles.notifCard}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.notificationTitle}>Push Notifications</Text>
              <TouchableOpacity
                style={{
                  backgroundColor:isSwitchOn?"#ff9900":"#525",
                  marginLeft: 80,
                  padding: 2,
                  alignItems: "center",
                  paddingHorizontal: 6,
                  borderRadius: 4,
                }}
                onPress={this.onToggleSwitch}
              >
                <Text style={{ fontSize: 16, color: "#fff" }}>{isSwitchOn?"OFF":"ON" }</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.notificationSubTitle}>
              Tap to enable notifications
            </Text>
          </Card>
          
          {/* <Card style={styles.notifCard}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={styles.notificationTitle}>Enable All</Text>
              <Switch
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
            <Text style={styles.notificationSubTitle}>
              Tap to receive all notifications
            </Text>
          </Card>
          <Card style={styles.notifCard}>
            <Text style={styles.notificationTitle}>Promos and Offers</Text>
            <Text style={styles.notificationSubTitle}>
              Receive coupons, promotions and money-saving offers
            </Text>

            <View style={styles.notificationFooter}>
              <View style={{ flexDirection: "row", paddingHorizontal: 2 }}>
                <Icon name="notifications-outline" size={20} />
                <Text>Push</Text>
              </View>
              <Switch
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </Card>
          <Card style={styles.notifCard}>
            <Text style={styles.notificationTitle}>Orders and Purchases</Text>
            <Text style={styles.notificationSubTitle}>
              Receive updates related to your order status, memberships, table
              bookings and more
            </Text>
            <View style={styles.notificationFooter}>
              <View style={{ flexDirection: "row" }}>
                <Icon name="notifications-outline" size={20} />
                <Text>Push</Text>
              </View>
              <Switch
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </Card>
          <Card style={styles.notifCard}>
            <Text style={styles.notificationSubTitle}>
              Stay Tuned!!! Get Notified right in your Mailbox
            </Text>
            <View style={styles.notificationFooter}>
              <Icon name="mail-outline" size={20} />
              <Switch
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </Card>
          <Card style={styles.notifCard}>
            <Text style={styles.notificationSubTitle}>
              Don't open your mailbox frequently??? Get quick Message in your
              phone
            </Text>
            <View style={styles.notificationFooter}>
              <Icon name="call-outline" size={20} />
              <Switch
                color="indigo"
                value={this.state.isSwitchOn}
                onValueChange={this.onToggleSwitch}
              />
            </View>
          </Card> */}

        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    height: 50,
    elevation: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  appHeader: {
    fontWeight: "bold",
    fontSize: 20,
  },
  container: {
    backgroundColor: "#fefefe",
    flex:1
  },
  notifCard: {
    marginVertical: 4,
    padding: 4,
    marginHorizontal: 4,
  },
  notificationTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    paddingTop: 4,
    fontWeight: "bold",
  },
  notificationSubTitle: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingTop: 4,
    color: "#777",
  },
  notificationFooter: {
    flexDirection: "row",
    paddingLeft: 20,
    paddingTop: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
});
