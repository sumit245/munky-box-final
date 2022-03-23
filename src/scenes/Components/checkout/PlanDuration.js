import moment from "moment";
import React, { Component } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { width, styles } from "../../styles/CheckoutStyles";

export default class PlanDuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: props.plan,
      modalVisible: false,
      selectedStartDate: null,
      selectedEndDate: null,
      minDate: moment(new Date()).add(1,"day"),
    };
  }
  onDateChange = (date, type) => {
    const { plan } = this.props;
    let diff = "";
    if (plan === "twoPlan") {
      diff = 1;
    } else if (plan === "fifteenPlan") {
      diff = 14;
    } else if (plan === "thirtyPlan") {
      diff = 29;
    }
    var a = moment(date);
    let b = a.add(diff, "days");
    this.setState({
      selectedEndDate: b.format("DD MMM"),
      selectedStartDate: date.format("DD MMM"),
    });
    let startDate = date.format("DD-MMM-YYYY");
    let endDate = b.format("DD-MMM-YYYY");
    this.props.dateHandler(startDate, endDate);
    this.setModalVisible(false);
  };
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  render() {
    const { modalVisible } = this.state;
    const { selectedStartDate, selectedEndDate, minDate } = this.state;
    return (
      <View style={styles.optionCard}>
        <Text style={styles.optionsLabels}>Select plan duration</Text>
        <TouchableOpacity
          style={styles.optionrow}
          onPress={() => this.setModalVisible(true)}
        >
          <Text>
            {selectedStartDate || "--"}
            {" To "}
            {selectedEndDate || "--"}
          </Text>
          <Icon name="ios-calendar-outline" color="#ff6600" size={22} />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.calenderView}>
            <View style={styles.calendarBody}>
              <CalendarPicker
                startFromMonday={true}
                minDate={minDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#2300e6"
                selectedDayTextColor="#FFFFFF"
                height={width - 8}
                width={width - 20}
                scrollable
                onDateChange={this.onDateChange}
              />
              <Button
                mode="text"
                color="#F00"
                style={{ alignSelf: "flex-end" }}
                onPress={() => this.setModalVisible(false)}
              >
                cancel
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}