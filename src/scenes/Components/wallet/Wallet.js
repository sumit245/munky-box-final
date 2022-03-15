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
  const [isRechargeMode, setisRechargeMode] = useState(false);
  const [hasBalance, setHasBalance] = useState(false);
  const [value, onChangeText] = React.useState("$5.00");
  const { initPaymentSheet, presentPaymentSheet, createPaymentMethod } =
    useStripe();
  const [loading, setLoading] = useState(false);
  const [mycard, setMyCard] = useState({});
  const stripe = useStripe();
  const { confirmPayment } = useConfirmPayment();
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51KammvB9SdGdzaTpAZcPCcQVMesbuC5qY3Sng1rdnEfnfo2geOUP8CQ27sw0WBjpiMpdYBRoAQ1eX8czY8BEEWdO00teqn55mD";

  useEffect(() => {
    if (total <= balance) {
      setHasBalance(true);
      setMyCard(card);
      console.log(card);
    }
  }, [total]);

  const fetchPaymentIntentClientSecret = async (amount) => {
    const response = await fetch(
      "https://munkybox-admin.herokuapp.com/api/stripe/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount,
          currency: "cad",
        }),
      }
    );
    const { clientSecret } = await response.json();
    return clientSecret;
  };
  async function stripeTokenHandler(token) {
    const paymentData = { token: token.id };
    const response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });
    return response.json();
  }
  const onSubmit = async () => {
    const result = await stripe.createToken(mycard);
    console.log(result);
    console.log(mycard);
    if (result.error) {
      alert(result.error.message);
    } else {
      stripeTokenHandler(result.token);
    }
    // const clientSecret = await fetchPaymentIntentClientSecret(total * 100);
    // console.log(clientSecret);
    // const { paymentMethod, error } = await createPaymentMethod({
    //   type: "Card",
    // });
    // if (!error) {
    //   alert("Recharge Done!!");
    // } else {
    //   alert(error.message);
    // }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        {isRechargeMode ? (
          <View>
            <TextInput
              style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
              onChangeText={(text) => onChangeText(text)}
              value={value}
            />
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

        {hasBalance ? (
          <TouchableOpacity
            style={{
              backgroundColor: "#226ccf",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              width: width,
            }}
          >
            <Text
              style={{
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Pay ${total}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              backgroundColor: "#226ccf",
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              width: width,
            }}
            onPress={onSubmit}
          >
            <Text
              style={{
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Recharge your wallet
            </Text>
          </TouchableOpacity>
        )}
      </StripeProvider>
    </SafeAreaView>
  );
}
