import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
} from "react-native";
import { width } from "../../styles/HomeStyles";
import PIC from "../../../../assets/wallet.png";
import { TextInput } from "react-native-paper";
import {
  useStripe,
  useConfirmPayment,
  StripeProvider,
} from "@stripe/stripe-react-native";

export default function Wallet({ total, card }) {
  const [balance, setBalance] = useState(0);
  const [isRechargeMode, setisRechargeMode] = useState(true);
  const [hasBalance, setHasBalance] = useState(false);
  const [value, onChangeText] = React.useState("");
  const {
    initPaymentSheet,
    presentPaymentSheet,
    createPaymentMethod,
    createToken,
  } = useStripe();
  const [mycard, setMyCard] = useState({});
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51KammvB9SdGdzaTpAZcPCcQVMesbuC5qY3Sng1rdnEfnfo2geOUP8CQ27sw0WBjpiMpdYBRoAQ1eX8czY8BEEWdO00teqn55mD";

  useEffect(() => {
    if (total <= balance) {
      setHasBalance(true);
    }
  }, [total]);

  useEffect(() => {
    setMyCard(card[0]);
  }, [card]);

  const stripeTokenHandler = async (token, amount) => {
    const paymentData = { token: token, amount: amount };

    const response = await fetch(
      "https://munkybox-admin.herokuapp.com/api/stripe/charge/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      }
    );
    return response.json();
  };

  const getCreditCardToken = (creditCardData) => {
    const card = {
      "card[number]": creditCardData.number.replace(/ /g, ""),
      "card[exp_month]": creditCardData.expiry.split("/")[0],
      "card[exp_year]": creditCardData.expiry.split("/")[1],
      "card[cvc]": creditCardData.cvc,
    };
    return fetch("https://api.stripe.com/v1/tokens", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
      },
      method: "post",
      body: Object.keys(card)
        .map((key) => key + "=" + card[key])
        .join("&"),
    }).then((response) => response.json());
  };

  const recharge = async () => {
    try {
      const result = await getCreditCardToken(mycard);
      if (result.error) {
        alert(result.error.message);
      } else {
        stripeTokenHandler(result.id, total).then((res) => {
          const { paid } = res;
          setPaid(paid);
          if (paid) {
            alert("Recharge Done!!");
          } else {
            alert(error.message);
          }
        });
      }
    } catch (error) {
      alert(error);
    }
  };
  const onSubmit = () => {
    setisRechargeMode(true);
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between", }}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        {isRechargeMode ? (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <View
              style={{
                width: 200,
                height: 44,
                alignSelf: "center",
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  //padding: 8,
                  borderRightWidth: 1,
                  borderRightColor: "#cdcdcd",
                  fontWeight: "bold",
                  color: "#000",
                }}
              >
                $
              </Text>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor: "#fff",
                  width: 140,
                  borderBottomWidth: 0,
                  justifyContent: "center",
                  textAlign: "center",
                  
                }}
                placeholderTextColor="#777"
                underlineColor="transparent"
                placeholder="5.00"
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
            </View>
          </View>
        ) : (
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Image
              source={PIC}
              height={84}
              width={120}
              style={{ height: 124, maxHeight: 164, width: 120 }}
            />
            <Text
              style={{ fontSize: 16, fontWeight: "bold", textAlign: "center" }}
            >
              ${parseFloat(balance).toFixed(2)}
            </Text>
          </View>
        )}

        <View style={{ flexDirection: "row", margin: 4 }}>
          <TouchableOpacity
            style={{
              borderColor: "#000",
              borderWidth: 1,
              borderRadius: 24,
              height: 48,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              margin: 2,
            }}
            onPress={onSubmit}
          >
            <Text
              style={{
                textTransform: "uppercase",
                color: "#000",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Recharge Now
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: "#226ccf",
              backgroundColor: "#008000",
              borderRadius: 24,
              padding: 10,
              height: 48,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              margin: 2,
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              Pay ${total}
            </Text>
          </TouchableOpacity>
        </View>
      </StripeProvider>
    </SafeAreaView>
  );
}
