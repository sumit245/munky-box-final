import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import Redo from "react-native-vector-icons/FontAwesome5";
import NewsPaper from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "../../styles/OrderHistoryStyle";

export default function OrderCard({ item }) {
  return (
    <Card style={{ padding: 10, margin: 4 }} key={item.order_id}>
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            paddingBottom: 10,
          }}
        >
          <Image
            source={{
              uri: "http://s3.amazonaws.com/gmi-digital-library/65caecf7-a8f7-4a09-8513-2659cf92871e.jpg",
            }}
            height={40}
            width={40}
            style={{ width: 40, height: 40, borderRadius: 2, padding: 2 }}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 4,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 2 }}>
                {item.restaurant}
              </Text>
              <Text>
                {item.plan === "twoPlan"
                  ? "2 Meals"
                  : item.plan === "fifteenPlan"
                  ? "15 Meals"
                  : "30 Meals"}
              </Text>
            </View>
            <Text style={{ fontSize: 14, textTransform: "uppercase" }}>
              {item.status}
            </Text>
          </View>
        </View>
        <Text style={{ textAlign: "right", fontWeight: "bold" }}>
          {"CAD " + item.total}
        </Text>
      </Card.Content>
      <Card.Actions style={{ justifyContent: "space-between" }}>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#ccc" }]}
          >
            <NewsPaper name="newspaper" size={16} color="#FFF" />
          </TouchableOpacity>
          <Text>Receipt</Text>
        </View>

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#fa0" }]}
          >
            <Icon name="ios-star" size={16} color="#FFF" />
          </TouchableOpacity>
          <Text>Rate</Text>
        </View>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#3d3" }]}
          >
            <Redo name="redo-alt" size={16} color="#FFF" />
          </TouchableOpacity>
          <Text>REORDER</Text>
        </View>
      </Card.Actions>
    </Card>
  );
}
