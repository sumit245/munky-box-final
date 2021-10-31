import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { RadioButton } from "react-native-paper";
const { width } = Dimensions.get("window");
export default class SortAndFilter extends Component {
  state = {
    sortVisible: false,
    value: 0,
    rating: "",
    meal_type: "",
    price: "",
  };
  filter_name = React.createRef();

  setsortVisible = (visible) => {
    this.setState({ sortVisible: visible });
  };

  toggleRight = (filter, selected) => {
    this.setState({ filter: filter, selected: selected });
  };

  applyFilter = () => {
    this.props.applyFilter(this.state.meal_type);
    this.setState((prevState) => ({ sortVisible: !prevState.sortVisible }));
  };

  render() {
    const { sortVisible, filter, meal_type, rating, price, selected } =
      this.state;
    return (
      <>
        <View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={sortVisible}
            onRequestClose={() => {
              this.setsortVisible(!sortVisible);
            }}
          >
            <View style={styles.filterBody}>
              <View style={styles.modalView}>
                <View style={styles.filterHeader}>
                  <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                    Sort and Filters
                  </Text>

                  <Icon
                    name="close-sharp"
                    color="#f00"
                    size={18}
                    style={styles.buttonClose}
                    onPress={() => this.setsortVisible(!sortVisible)}
                  />
                </View>
                <View>
                  <View style={styles.sortSide}>
                    <Text
                      style={[
                        styles.filterText,
                        { color: selected === 0 ? "#00f" : "#444" },
                      ]}
                      ref={this.filter_name}
                      onPress={() => this.toggleRight("type_filter", 0)}
                    >
                      Meal Type
                    </Text>

                    <Text
                      style={[
                        styles.filterText,
                        { color: selected === 1 ? "#00f" : "#444" },
                      ]}
                      onPress={() => this.toggleRight("rating_filter", 1)}
                    >
                      Rating
                    </Text>

                    <Text
                      style={[
                        styles.filterText,
                        { color: selected === 2 ? "#00f" : "#444" },
                      ]}
                      onPress={() => this.toggleRight("price_filter", 2)}
                    >
                      Price
                    </Text>

                    <Text
                      style={[
                        styles.filterText,
                        { color: selected === 3 ? "#00f" : "#444" },
                      ]}
                      onPress={() => this.toggleRight("more_filter", 3)}
                    >
                      More Filters
                    </Text>
                  </View>
                  <View style={styles.sortContent}>
                    {filter === "type_filter" ? (
                      <RadioButton.Group
                        onValueChange={(value) =>
                          this.setState({ meal_type: value })
                        }
                        value={meal_type}
                      >
                        <RadioButton.Item label="Veg" value="Veg" />
                        <RadioButton.Item label="Non-Veg" value="Non-Veg" />
                      </RadioButton.Group>
                    ) : filter === "rating_filter" ? (
                      <RadioButton.Group
                        onValueChange={(value) =>
                          this.setState({ rating: value })
                        }
                        value={rating}
                      >
                        <RadioButton.Item label="Any" value="any" />
                        <RadioButton.Item
                          label="Only 3+ rating"
                          value="three"
                        />
                        <RadioButton.Item label="Only 4+ rating" value="four" />
                      </RadioButton.Group>
                    ) : filter === "price_filter" ? (
                      <RadioButton.Group
                        onValueChange={(value) =>
                          this.setState({ price: value })
                        }
                        value={price}
                      >
                        <RadioButton.Item label="Any" value="any" />
                        <RadioButton.Item label="High to Low" value="h2l" />
                        <RadioButton.Item label="Low to High" value="l2h" />
                      </RadioButton.Group>
                    ) : (
                      <Text>More Filters Coming Soon...</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.filterActions}>
                <TouchableOpacity style={styles.filterBtn}>
                  <Text style={{ fontSize: 16, color: "#f00" }}>Clear All</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.filterBtn}
                  onPress={() => this.applyFilter()}
                >
                  <Text style={{ fontSize: 16, color: "#4c6" }}>Apply</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <TouchableOpacity
          onPress={() => this.setsortVisible(true)}
          style={{ flexDirection: "row" }}
        >
          <Icon name="ios-options-outline" size={22} />
        </TouchableOpacity>
      </>
    );
  }
}
const styles = StyleSheet.create({
  filterHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 20,
    padding: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: "#ccc",
  },
  filterBody: {
    flex: 1,
    position: "absolute",
    bottom: 2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: width - 4,
    height: 400,
    marginHorizontal: 2,
    backgroundColor: "white",
    elevation: 5,
  },
  filterText: {
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.2,
    fontWeight: "bold",
    color: "#979797",
    textAlign: "justify",
  },
  filterActions: {
    position: "absolute",
    bottom: 2,
    width: width - 8,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  filterBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    borderColor: "#ccc",
    borderWidth: 0.2,
    borderRadius: 4,
    width: 140,
    justifyContent: "center",
  },
  sortSide: {
    alignSelf: "flex-start",
    width: width / 3,
    borderRightWidth: 0.2,
    borderColor: "#ccc",
    height: 300,
  },
  sortContent: {
    justifyContent: "space-around",
    width: (2 * width) / 3,
    position: "absolute",
    left: width / 3,
  },
});
