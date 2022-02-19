import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CHECKOUT_URL } from "../../../services/EndPoints";
import { styles } from "../../styles/CheckoutStyles";

export default function BillingTable({
  price,
  tip,
  discount,
  totalHandler,
  plan,
}) {
  const [planFetched, setplanFetched] = useState(false);
  const [checks, setChecks] = useState(false);
  const [delivery_fee, setDeliveryFee] = useState("");
  const [service_fee, setServiceFee] = useState("");
  const [taxes, setTaxes] = useState("");
  const [charges, setCharges] = useState({
    service: 0,
    tax: 0,
    total: 0,
  });

  const fetchFee = async () => {
    const response = await axios.get(CHECKOUT_URL);
    const exclusiveCharges = await response.data;
    const {
      delivery_fee,
      service_fee,
      taxes,
      delivery_2_fee,
      delivery_15_fee,
      delivery_30_fee,
    } = exclusiveCharges;
    plan === "thirtyPlan"
      ? setDeliveryFee(delivery_30_fee)
      : plan === "fifteenPlan"
      ? setDeliveryFee(delivery_15_fee)
      : setDeliveryFee(delivery_2_fee);
    setServiceFee(service_fee);
    setTaxes(taxes);
    setplanFetched(true);
  };

  const calculator = (subtotal, delivery, service, taxes, discount, tip) => {
    let serviceCharge = subtotal * 0.01 * service;
    let total = subtotal + serviceCharge + delivery - discount + tip;
    let tax = total * 0.01 * taxes;
    total = total + tax;
    return { serviceCharge, tax, total };
  };

  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      fetchFee();
      setChecks(true);
    }
    if (planFetched) {
      const { serviceCharge, tax, total } = calculator(
        parseFloat(price),
        parseFloat(delivery_fee),
        parseFloat(service_fee),
        parseFloat(taxes),
        parseFloat(discount),
        parseFloat(tip)
      );
      setCharges({
        service: serviceCharge.toFixed(2),
        tax: tax.toFixed(2),
        total: total.toFixed(2),
      });
      totalHandler(total.toFixed(2), delivery_fee, service_fee, taxes);
    }
    return () => {
      componentMounted = false;
    };
  }, [
    planFetched,
    checks,
    service_fee,
    delivery_fee,
    taxes,
    price,
    discount,
    tip,
  ]);

  return (
    <View style={styles.billingTable}>
      {checks ? (
        <>
          <Text style={styles.billTitle}>Bill Details</Text>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Subtotal</Text>
            <Text style={styles.billText}>${price}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={[styles.billText, { color: "#226ccf" }]}>
              Delivery Fee{"\n"}
              <Text style={{ fontSize: 12, marginRight: 4, color: "#777" }}>
                This fees goes towards paying {"\n"}your delivery partner daily.{" "}
                {/* <Text
                  style={{
                    textDecorationLine: "underline",
                    color: "#226ccf",
                    marginLeft: 4,
                    fontSize: 10,
                    fontWeight: "bold",
                  }}
                >
                  Learn More
                </Text> */}
              </Text>
            </Text>
            <Text style={styles.billText}>${delivery_fee}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>
              Service Fee({service_fee}%)
              <Icon
                name="information-circle-outline"
                size={14}
                color="#226ccf"
              />
            </Text>
            <Text style={styles.billText}>${charges.service}</Text>
          </View>

          <View style={styles.billRow}>
            <Text style={styles.billText}>Promo discount</Text>
            <Text style={styles.billText}>{"$" + discount}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Tip Amount</Text>
            <Text style={styles.billText}>{"$" + tip}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Taxes({taxes}%)</Text>
            <Text style={styles.billText}>{"$" + charges.tax}</Text>
          </View>
          <View style={styles.billRow}>
            <Text style={styles.billText}>Total</Text>
            <Text style={styles.billText}>${charges.total}</Text>
          </View>
        </>
      ) : null}
    </View>
  );
}
