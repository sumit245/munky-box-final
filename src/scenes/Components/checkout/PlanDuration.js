import moment from "moment";
import  React,{ Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
import Icon from "react-native-vector-icons/FontAwesome";

export default class PlanDuration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plan: props.plan,
      modalVisible: false,
      selectedStartDate: null,
      selectedEndDate: null,
    };
  }
  onDateChange = (date, type) => {
    const { plan } = this.state;
    let diff = "";
    if (plan === "twoPlan") {
      diff = 2;
    } else if (plan === "fifteenPlan") {
      diff = 15;
    } else if (plan === "thirtyPlan") {
      diff = 30;
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
    const { optionrow, options } = this.props;
    const { modalVisible } = this.state;
    const { selectedStartDate, selectedEndDate } = this.state;
    const minDate = new Date();
    return (
      <>
        <Text
          style={[
            options,
            {
              marginBottom: -12,
              marginTop: 26,
              fontWeight: "bold",
              padding: 6,
              color: "#333",
            },
          ]}
        >
          Select plan duration
        </Text>
        <TouchableOpacity
          style={optionrow}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={options}>
            {selectedStartDate || "--"}
            {" - "}
            {selectedEndDate || "--"}
          </Text>
          <Icon name="calendar" color="#df7070" size={20} />
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CalendarPicker
                startFromMonday={true}
                minDate={minDate}
                todayBackgroundColor="#f2e6ff"
                selectedDayColor="#2300e6"
                selectedDayTextColor="#FFFFFF"
                height={300}
                width={300}
                scrollable
                onDateChange={this.onDateChange}
              />
              <Pressable
                style={styles.button}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>X</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(30,30,30,0.5)",
  },
  modalView: {
    margin: 2,
    backgroundColor: "white",
    borderRadius: 4,
    padding: 2,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    borderRadius: 15,
    elevation: 2,
    height: 30,
    width: 30,
    position: "absolute",
    top: -15,
    right: -15,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "#ccc",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textAlignVertical: "center",
  },
});
