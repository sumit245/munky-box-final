import axios from "axios";
import React, { Component } from "react";
import { Text, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { COUPON_URL } from "../../../services/EndPoints";

export default class PromoOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      coupons: [],
      error: false,
      promo: "",
      discount: "",
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
  componentDidMount() {
    axios
      .get(COUPON_URL)
      .then((res) => {
        this.setState({ coupons: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { options, optionrow } = this.props;
    const { error, promo, discount } = this.state;
    return (
      <View style={[optionrow, { flexDirection: "column" }]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon name="fast-food-outline" size={24} color="#df7070" />
          <Text
            style={[
              options,
              {
                fontWeight: "bold",
                color: "#333",
                fontSize: 16,
                paddingHorizontal: 2,
                textTransform: "capitalize",
              },
            ]}
          >
            Apply coupon
          </Text>
          <Icon name="star-sharp" color="#f74" size={8} />
        </View>
        <TextInput
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
        <Text
          style={[options, { color: error ? "red" : "#fff", fontSize: 10 }]}
        >
          Apply a valid promo code
        </Text>
      </View>
    );
  }
}
