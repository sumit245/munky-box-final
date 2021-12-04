import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  PanResponder,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Actions } from "react-native-router-flux";
import { width } from "../../styles/HomeStyles";
import { IconButton, RadioButton } from "react-native-paper";
import { getUser } from "../../../services/user/getuser";
import axios from "axios";
import { USER_URL } from "../../../services/EndPoints";

const ListEmptyContent = () => {
  return (
    <View style={styles.centerContent}>
      <Icon name="sad" size={80} color="#666" />
      <Text style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}>
        KNOCK KNOCK! WHO'S THERE?
      </Text>
      <Text
        style={{
          fontSize: 16,
          textAlign: "center",
          color: "#666",
          paddingVertical: 10,
        }}
      >
        You didn't have any addresses saved.{"\n"}
        Saving addresses helps you checkout faster.
      </Text>
    </View>
  );
};

class AddressCard extends Component {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderTerminationRequest: (evt, gestureState) => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx > 35) {
          this.setScrollViewEnabled(false);
          let newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < 150) {
          Animated.timing(this.state.position, {
            toValue: { x: 0, y: 0 },
            duration: 150,
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(this.state.position, {
            toValue: { x: width, y: 0 },
            duration: 300,
          }).start(() => {
            this.props.success(this.props.text);
            this.setScrollViewEnabled(true);
          });
        }
      },
    });

    this.panResponder = panResponder;
    this.state = { position };
  }
  setScrollViewEnabled(enabled) {
    if (this.scrollViewEnabled !== enabled) {
      this.props.setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }
  render() {
    const { item, changeSelector, checked } = this.props;
    return (
      <View style={styles.card}>
        <Animated.View
          style={[this.state.position.getLayout()]}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.absoluteCell}>
            <Text style={styles.absoluteCellText}>DELETE</Text>
          </View>
          <View style={styles.innerCell}>
            <View style={styles.cardHeader}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Icon
                  name={
                    item.address_type === "home"
                      ? "home-outline"
                      : item.address_type === "office"
                      ? "business-outline"
                      : "earth-outline"
                  }
                  size={24}
                  color="#777"
                />
                <Text style={styles.headerText}>{item.address_type}</Text>
              </View>

              <RadioButton
                value={item.address_type}
                status={checked === item.address_type ? "checked" : "unchecked"}
                onPress={() => changeSelector(item.address_type)}
              />
            </View>
            <View style={styles.cardBody}>
              <Text style={styles.content}>{item.flat_num}</Text>
              <Text style={styles.content}>{item.locality}</Text>
              <Text style={styles.content}>{item.city}</Text>
              <Text style={styles.content}>{item.postal_code}</Text>
              <Text style={styles.content}>{item.state}</Text>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}
export default class ListAddress extends Component {
  constructor(props) {
    super(props);
    this.renderSeparator = this.renderSeparator.bind(this);
    this.success = this.success.bind(this);
    this.setScrollEnabled = this.setScrollEnabled.bind(this);

    this.state = {
      enable: true,
      address: [],
      checked: "home",
    };
  }

  renderSeparator() {
    return (
      <View style={styles.separatorViewStyle}>
        <View style={styles.separatorStyle} />
      </View>
    );
  }

  success(key) {
    const data = this.state.address.filter((item) => item.key !== key);
    this.setState({
      data,
    });
  }

  setScrollEnabled(enable) {
    this.setState({
      enable,
    });
  }

  componentDidMount() {
    getUser("user").then((res) => {
      let { _id } = res.data;
      axios.get(USER_URL + _id).then((res) => {
        this.setState({ address: res.data.addresses });
      });
    });
  }

  renderAddress = ({ item }, checked) => (
    <AddressCard
      item={item}
      checked={checked}
      changeSelector={this.changeSelector}
      success={this.success}
      setScrollEnabled={(enable) => this.setScrollEnabled(enable)}
    />
  );
  changeSelector = (selected) => {
    if (this.props.checkout) {
      this.props.onAddressSelect(selected);
      Actions.pop();
    }
    this.setState({ checked: selected });
  };
  render() {
    const { address, checked } = this.state;
    return (
      <View style={styles.container}>
        <FlatList
          data={address}
          renderItem={(item) => this.renderAddress(item, checked)}
          ListEmptyComponent={() => {
            return <ListEmptyContent />;
          }}
          ItemSeparatorComponent={this.renderSeperator}
          scrollEnabled={this.state.enable}
          extraData={this.changeSelector}
          keyExtractor={(item) => item.address_type}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Actions.push("manageAddress");
          }}
        >
          <Text style={styles.confirmLocation}>ADD NEW ADDRESS</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginLeft: -100,
    margin: 4,
    backgroundColor: "red",
    borderRadius: 6,
    elevation: 4,
    
  },
  absoluteCell: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  absoluteCellText: {
    margin: 16,
    color: "#FFF",
  },
  innerCell: {
    width: width,
    height: 80,
    backgroundColor:"#fff",
    marginLeft: 100,
    justifyContent: "center",
    // alignItems: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 6,
    height: 40,
    borderBottomWidth: 0.2,
    borderBottomColor: "#979797",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 14,
    paddingVertical: 2,
    marginHorizontal: 12,
  },
  headerText: {
    fontSize: 18,
    textTransform: "capitalize",
    padding: 2,
    fontWeight: "bold",
    marginLeft: 4,
  },
  content: {
    fontSize: 14,
    color: "#777",
    paddingRight: 4,
  },
  cardBody: {
    flexDirection: "row",
    marginHorizontal: 12,
    padding: 12,
    alignItems: "baseline",
    borderBottomWidth: 0.2,
    borderBottomColor: "#979797",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 14,
  },
  separatorViewStyle: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  separatorStyle: {
    height: 1,
    backgroundColor: "#000",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    width: width - 5,
    borderRadius: 6,
    borderWidth: 0.2,
    marginHorizontal: 2,
    paddingHorizontal: 5,
    height: 45,
    backgroundColor: "#2962ff",
    position: "absolute",
    bottom: 6,
    justifyContent: "center",
  },
  confirmLocation: {
    textAlign: "center",
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
    marginLeft: 26,
  },
});
