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
  const {
    initPaymentSheet,
    presentPaymentSheet,
    createPaymentMethod,
    createToken,
  } = useStripe();
  const [loading, setLoading] = useState(false);
  const [mycard, setMyCard] = useState({});
  const { confirmPayment } = useConfirmPayment();
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
  const stripeTokenHandler = async (token, amount) => {
    const paymentData = { token: token, amount: amount };

    const response = await fetch("/charge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });
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

  const onSubmit = async () => {
    try {
      const result = await getCreditCardToken(mycard);
      if (result.error) {
        alert(result.error.message);
      } else {
        const res = await stripeTokenHandler(result.id, total);
        console.log(res);
      }
    } catch (error) {
      alert(error);
    }
    //console.log(mycard);

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
