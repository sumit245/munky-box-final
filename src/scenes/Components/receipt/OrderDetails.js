import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";

import moment from "moment";
import { styles } from "./styles";
export default function OrderDetails({ order, title }) {
  const { address_type, city, flat_num, locality, postal_code } = order.address;
  const [taxes, setTaxes] = useState(0);
  const [service_fee, setServiceFee] = useState(0);
  useEffect(() => {
    let tax = order.taxes;
    let sf = order.service_fee;
    let calcSF =
      ((parseFloat(order.price) + parseFloat(order.delivery_fee)) *
        parseFloat(sf)) /
      100;
    let calcTax=(parseFloat(order.price) + parseFloat(order.delivery_fee)+parseFloat(calcSF)-parseFloat(order.discount))*parseFloat(order.taxes)/100
    setServiceFee(calcSF);
    setTaxes(calcTax)
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "flex-start",
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <View style={styles.formHeader}>
        <View style={styles.row}>
          <View style={styles.headerRows}>
            <View>
              <Text
                style={{
                  textTransform: "uppercase",
                  fontSize: 12,
                  fontWeight: "bold",
                  color:
                    order.status === "accepted"
                      ? "#5ca85c"
                      : order.status === "started"
                      ? "#ffc300"
                      : "#ff4300",
                }}
              >
                {order.status}
              </Text>
              <Text style={styles.normalText}>From: </Text>
              <Text style={styles.text}>
                {order.restaurant + "(" + order.restaurant_id + ")"}
              </Text>
            </View>
            <View>
              <Text style={[styles.text, { textAlign: "right" }]}>
                #{order.order_id}
              </Text>
              <Text style={styles.normalText}>
                {order.user_name + "(" + order.user_id + ")"}
              </Text>
              <Text style={styles.normalText}>
                {(address_type || "") +
                  ", " +
                  (flat_num || "") +
                  ", " +
                  (city || "") +
                  "\n " +
                  (locality || "") +
                  ", " +
                  (postal_code || "")}
              </Text>
              <Text style={styles.normalText}>M: {order.phone}</Text>
              <Text style={styles.normalText}>E: {order.email_id}</Text>
              <Text style={styles.normalText}>
                {moment(order.order_time).format("DD-MMM-YYYY HH:mm a")}
              </Text>
            </View>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 28 }]}>
          <View style={styles.headerRows}>
            <Text style={styles.text}>plan</Text>
            <Text style={styles.text}>Start Date</Text>
            <Text style={styles.text}>End Date</Text>
            <Text style={styles.text}>Price</Text>
          </View>
          <View style={styles.headerRows}>
            <Text style={styles.normalText}>
              {order.plan === "twoPlan"
                ? "2 Days"
                : order.plan === "fifteenPlan"
                ? "15 Days"
                : "30 Days"}
            </Text>
            <Text style={styles.normalText}>{order.start_date}</Text>
            <Text style={styles.normalText}>{order.end_date}</Text>
            <Text style={styles.normalText}>${order.price}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View>
            <Text
              style={{
                fontStyle: "italic",
                fontWeight: "bold",
                color: "#777",
                maxWidth: 200,
                marginLeft: 4,
              }}
            >
              Notes: {order.notes || "N/A"}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "flex-end",
            }}
          >
            <View>
              <Text style={[styles.text, { marginVertical: 1 }]}>
                Subtotal:{" "}
              </Text>
              <Text style={[styles.text, { marginVertical: 1 }]}>
                Delivery Fee:{" "}
              </Text>
              <Text style={[styles.text, { marginVertical: 1, marginTop: 1 }]}>
                Service Fee({order.service_fee}%):
              </Text>
              <Text style={[styles.text, { marginVertical: 1, marginTop: 1 }]}>
                Tip:{" "}
              </Text>
              <Text style={[styles.text, { marginVertical: 1 }]}>Disc.:</Text>
              <Text style={[styles.text, { marginVertical: 1, marginTop: 2 }]}>
                Taxes({order.taxes}%):
              </Text>
              <Text style={[styles.text, { marginVertical: 1, marginTop: 6 }]}>
                Total:{" "}
              </Text>
            </View>
            <View>
              <Text style={[styles.normalText, { textAlign: "right" }]}>
                ${order.price}
              </Text>
              <Text style={[styles.normalText, { textAlign: "right" }]}>
                ${order.delivery_fee}
              </Text>
              <Text style={[styles.normalText, { textAlign: "right" }]}>
                ${parseFloat(service_fee).toFixed(2)}
              </Text>
              <Text style={[styles.normalText, { textAlign: "right" }]}>
                ${order.tip}
              </Text>
              <Text style={[styles.normalText, { textAlign: "right" }]}>
                {"$" + order.discount}
              </Text>
              <Text style={[styles.normalText, { textAlign: "right" }]}>
                ${parseFloat(taxes).toFixed(2)}
              </Text>
              <Text style={[styles.normalText, { textAlign: "right" }]}>
                ${order.total}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHead}>
          <Text style={styles.text}>Add on</Text>
          <Text style={styles.text}>Ordered on</Text>
          <Text style={styles.text}>PRICE</Text>
        </View>
      </View>
    </ScrollView>
  );
}
