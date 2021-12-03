import axios from "axios";
import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import { Button } from "react-native-paper";
import Icon from "react-native-vector-icons/Fontisto";
import { COUPON_URL } from "../../../services/EndPoints";
import { styles } from "../../styles/CheckoutStyles";

export default class PromoOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      coupons: [],
      error: false,
      discount: "",
      pulled: false,
      applied: false,
    };
  }
  search = (promo, coupon) => {
    for (var i = 0; i < coupon.length; i++) {
      if (coupon[i].promo_code === promo) {
        this.setState({
          error: false,
          promo: promo,
          discount: coupon[i].discount,
        });
        return coupon[i];
      } else {
        this.setState({ error: true });
      }
    }
  };
  onChangeText = (event) => {
    let { coupons, promo } = this.state;
    this.search(event, coupons);
  };
  getCoupon = async () => {
    const response = await axios.get(COUPON_URL);
    const coupon = await response.data;
    this.setState({ coupons: coupon });
  };
  componentDidMount() {
    this.getCoupon();
  }
  applyCoupon = () => {
    this.setState({ applied: true });
    this.props.couponHandler(coupons.promo_code, coupons.discount);
  };

  render() {
    const { error, discount, pulled, applied } = this.state;
    const { coupons } = this.props;
    return (
      <View style={styles.optionCard}>
        <View style={[styles.optionrow, { alignItems: "center" }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="shopping-sale" size={24} color="#f74" />
            <Text
              style={{
                fontWeight: "bold",
                color: "#333",
                fontSize: 16,
                paddingHorizontal: 2,
                textTransform: "capitalize",
              }}
            >
              Apply coupon
            </Text>
            <Icon name="star" color="#f74" size={8} />
          </View>
          <Icon
            name={!pulled ? "angle-right" : "angle-down"}
            size={14}
            onPress={() =>
              this.setState((prevState) => ({
                pulled: !prevState.pulled,
              }))
            }
          />
        </View>
        {pulled && (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {coupons !== null ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <Text
                  style={{ textAlign: "justify", padding: 4, fontSize: 12 }}
                >
                  Get {coupons.discount + (coupons.discount_type || "%")} off on{" "}
                  {coupons.plan_name} plan.
                  {"\n"}Use Code
                  <Text style={{ fontWeight: "bold" }}>
                    {" "}
                    {coupons.promo_code}
                  </Text>
                </Text>
                <Button mode="text" color="#f74" onPress={this.applyCoupon}>
                  {applied ? "APPLIED" : "APPLY"}
                </Button>
              </View>
            ) : (
              <Text>No valid coupon on this order</Text>
            )}
            {/* <TextInput
              style={{
                marginLeft: 24,
                borderBottomColor: "#226ccf",
                borderBottomWidth: 1,
                marginVertical: 4,
                fontSize: 16,
              }}
              placeholder="2X-5A-CF-12"
              onChangeText={this.onChangeText}
              onEndEditing={() => this.props.couponHandler(promo, discount)}
            />
            <Text style={{ color: error ? "red" : "#fff", fontSize: 10 }}>
              Apply a valid promo code
            </Text> */}
          </View>
        )}
      </View>
    );
  }
}
