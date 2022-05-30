import axios from "axios";
import React, { Component, useState } from "react";
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
      adminApplied: false,
      adminCoupon: "",
      isAdmin: false,
      adminDiscount: "",
      promo_code: ""
    };
  }
  search = (promo, coupon) => {
    for (var i = 0; i < coupon.length; i++) {
      if (coupon[i].promo_code === promo) {
        this.setState({
          error: false,
          promo: promo,
          discount: coupon[i].discount,
          promo_id: coupon[i].promo_id,
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
  getAdminCoupon = async () => {
    const response = await axios.get("http://54.146.133.108:5000/api/admin-coupon")
    const { coupons } = response.data
    let { promo_text, discount, promo_code, isAdmin } = coupons[0]
    let promo = promo_text.replace(/X/i, promo_code)
    promo = promo.replace(/y/i, discount);
    this.setState({
      adminCoupon: promo,
      isAdmin: isAdmin,
      promo_code: promo_code,
      adminDiscount: discount
    })
  };
  componentDidMount() {
    this.getCoupon();
    this.getAdminCoupon()
  }
  applyCoupon = () => {
    this.setState({ applied: true, adminApplied: false });
    const { coupons, price } = this.props;
    let disc = 0;
    if (coupons.discount_type !== "%") {
      disc = coupons.discount;
    } else {
      disc = (coupons.discount / 100) * price;
    }
    this.props.couponHandler(coupons.promo_code, disc, coupons.promo_id);
  };
  
  applyAdminCoupon = () => {
    this.setState({ applied: false, adminApplied: true });
    const { promo_code, isAdmin, adminDiscount } = this.state
    this.props.couponHandler(promo_code, adminDiscount,'PROMOADMIN', isAdmin)
  }

  render() {
    const { error, discount, pulled, applied, adminApplied, isAdmin, adminCoupon } = this.state;
    const { coupons } = this.props;
    return (
      <View style={styles.optionCard}>
        <View style={[styles.optionrow, { alignItems: "center" }]}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="shopping-sale" size={24} color="#ff6600" />
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
            <Icon name="star" color="#ff6600" size={8} />
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
          <View>
            {
              isAdmin && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <Text style={{ textAlign: "justify", padding: 4, fontSize: 12 }}>
                    {" "+adminCoupon.split(".")[0]+"\n"+adminCoupon.split(".")[1]}
                  </Text>

                  <Button mode="text" color="#ff6600" onPress={this.applyAdminCoupon}>
                    {adminApplied ? "APPLIED" : "APPLY"}
                  </Button>
                </View>
              )}
            {
              coupons !== null && (
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
                    Get{" "}
                    {coupons.discount_type === "$"
                      ? "$" + coupons.discount
                      : coupons.discount + "%"}{" "}
                    off on {coupons.plan_name} plan.
                    {"\n"}Use Code
                    <Text style={{ fontWeight: "bold" }}>
                      {" "}
                      {coupons.promo_code}
                    </Text>
                  </Text>
                  <Button mode="text" color="#ff6600" onPress={this.applyCoupon}>
                    {applied ? "APPLIED" : "APPLY"}
                  </Button>
                </View>
              )}
          </View>
        )
        }
      </View>
    );
  }
}
