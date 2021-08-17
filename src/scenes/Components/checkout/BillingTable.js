import axios from "axios";
import  React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { CHECKOUT_URL } from "../../../services/EndPoints";
const { width, height } = Dimensions.get("window");

export default class BillingTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      checks: true,
    };
  }
  shouldComponentUpdate(prevProps, nextProps) {
    return true;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.discount !== this.props.discount) {
      const { total } = this.state;
      let newTotal = parseFloat(total) - parseFloat(this.props.discount);
      newTotal = newTotal.toFixed(2);
      this.setState({
        discount: this.props.discount,
        total: newTotal,
      });
      this.props.totalHandler(newTotal);
    }
    if (prevProps.tip !== this.props.tip) {
      const { total } = this.state;
      let newTotal = parseFloat(total) + parseFloat(this.props.tip);
      newTotal = newTotal.toFixed(2);
      this.setState({
        tip: this.props.tip,
        total: newTotal,
      });
      this.props.totalHandler(newTotal);
    }
  }

  componentDidMount() {
    axios
      .get(CHECKOUT_URL)
      .then((res) => {
        let checks = res.data;
        let subtotal =
          parseFloat(this.state.price) +
          parseFloat(checks.delivery_fee) +
          parseFloat(checks.service_fee);
        let total = subtotal + (subtotal * parseFloat(checks.taxes)) / 100;
        total = total.toFixed(2);
        this.setState({ checks: checks, total: total });
        this.props.totalHandler(total);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  render() {
    const { price, checks, total, discount, tip } = this.state;
    return (
      <View style={styles.billingTable}>
        {checks ? (
          <>
            <Text style={[styles.rowContent, { padding: 4, marginBottom: 10 }]}>
              Bill Details
            </Text>
            <View style={styles.row}>
              <Text style={styles.rowContent}>Subtotal</Text>
              <Text style={styles.rowContent}>${price}</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.rowContent, { color: "#226ccf" }]}>
                Delivery Fee{"\n"}
                <Text style={{ fontSize: 12, marginRight: 4,color:"#777" }}>
                  This fees goes towards paying {"\n"}your Delivery Partner
                  Daily.{" "}
                  <Text
                    style={{
                      textDecorationLine: "underline",
                      color: "#226ccf",
                      marginLeft: 4,
                      fontSize:10,
                      fontWeight:'bold'
                    }}
                  >
                    Learn More
                  </Text>
                </Text>
              </Text>
              <Text style={styles.rowContent}>${checks.delivery_fee}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowContent}>Service Fee(2%)</Text>
              <Text style={styles.rowContent}>${checks.service_fee}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.rowContent}>Taxes(%)</Text>
              <Text style={styles.rowContent}>{checks.taxes}</Text>
            </View>
            {/* {discount ? ( */}
            <View style={styles.row}>
              <Text style={styles.rowContent}>Promo discount($)</Text>
              <Text style={styles.rowContent}>{discount}</Text>
            </View>
            {/* ) : null} */}
            {/* {tip ? ( */}
            <View style={styles.row}>
              <Text style={styles.rowContent}>Tip Amount($)</Text>
              <Text style={styles.rowContent}>{tip}</Text>
            </View>
            {/* ) 
            : null} */}
            <View style={styles.row}>
              <Text style={styles.rowContent}>Total</Text>
              <Text style={styles.rowContent}>${total}</Text>
            </View>
          </>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  billingTable: {
    paddingHorizontal: 10,
    marginVertical: 20,
    borderColor: "#ddd",
    borderWidth: 0.5,
    borderRadius: 4,
    marginHorizontal: 2,
  },
  row: {
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 4,
  },
  rowContent: {
    fontSize: 16,
    color: "#8c8c8c",
  },
});
