import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import PIC from "../../../../assets/wallet.png";
import CheckoutCards from "../checkout/CheckoutCards";
import {
  useStripe,
  useConfirmPayment,
  StripeProvider,
} from "@stripe/stripe-react-native";
import { Actions } from "react-native-router-flux";
import { getUser } from "../../../services/user/getuser";
import { styles } from "../../styles/CheckoutStyles";
import { Checkbox } from "react-native-paper";

export default function Wallet({ total, action, data }) {
  const [balance, setBalance] = useState(0);
  const [hasBalance, setHasBalance] = useState(false);
  const [value, onChangeText] = React.useState("");
  const [state, setState] = useState({
    card: {},
    wallet_balance: {},
    user: {},
  });
  const [mycard, setMyCard] = useState({});
  const [checked, setChecked] = React.useState(false);
  const [number, setNumber] = useState("");
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51KammvB9SdGdzaTpAZcPCcQVMesbuC5qY3Sng1rdnEfnfo2geOUP8CQ27sw0WBjpiMpdYBRoAQ1eX8czY8BEEWdO00teqn55mD";

  useEffect(() => {
    if (total <= balance) {
      setHasBalance(true);
    }
  }, [total, balance]);

  useEffect(() => {
    fetchUser();
  }, []);

  const trimmer = (word) => {
    for (let i = 0; i <= word.length - 5; i++) {
      word = word.replace(word[i], "*");
    }
    return word;
  };

  const fetchUser = async () => {
    const response = await getUser("user");
    const user = await response.data;
    const { cards } = user;
    if (user !== null) {
      setState({
        ...state,
        user: user,
        card: cards[0],
      });
      setMyCard(cards[0]);
      let num = trimmer(state.card.number);
      setNumber(num);
    } else {
      alert("Please login or register to proceed");
      Actions.jump("auth");
    }
  };

  const stripeTokenHandler = async (token, amount, id) => {
    const paymentData = { token: token, amount: amount, user_id: id };
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
        stripeTokenHandler(result.id, parseInt(value), user_id).then((res) => {
          const { paid } = res;
          if (paid) {
            alert(`Recharge done with amount $${value}  !!`);
            setBalance(parseFloat(value).toFixed(2));
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
    action(data);
  };
  const cardHandler = (card) => {
    let { cards } = state.user;
    let currentCard = cards.filter((item) => item.number === card);
    setState({ ...state, card: currentCard[0] });
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
      {/* <ScrollView> */}
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
          <View
            style={{
              padding: 10,
              backgroundColor: "#fff",
              marginVertical: 8,
              marginHorizontal: 2,
              elevation: 2,
              borderRadius: 4,
            }}
          >
            <View
              style={{
                fontSize: 22,
                alignItems: "center",
                borderRightWidth: 1,
                borderRightColor: "#cdcdcd",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              <Image
                source={PIC}
                height={84}
                width={120}
                style={{ height: 124, maxHeight: 164, width: 120 }}
              />
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                ${parseFloat(balance).toFixed(2)}
              </Text>
            </View>
            <Text style={{ textAlign: "center", padding: 16, fontSize: 18 }}>
              Top-up Amount
            </Text>
            <View
              style={{
                width: 200,
                height: 44,
                alignSelf: "center",
                backgroundColor: "#fff",
                padding: 8,
                borderRadius: 20,
                borderColor: "#cdcdcd",
                borderWidth: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 22,
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
                  width: 132,
                  borderBottomWidth: 0,
                  justifyContent: "center",
                  fontSize: 22,
                  marginHorizontal: 8,
                }}
                placeholderTextColor="#777"
                underlineColor="transparent"
                placeholder="5.00"
                keyboardType="numeric"
                onChangeText={(text) => onChangeText(text)}
                value={value}
              />
            </View>
          </View>
          <CheckoutCards
            cardHandler={cardHandler}
            user={state.user}
            selected={state.card}
          />
        </StripeProvider>
      {/* </ScrollView> */}
      <View style={styles.optionCard}>
        <Text>
          1. Recharge of wallet amount of {value > 0 ? "$" : null}
          {value} will be made using credit card {number}.
        </Text>
        <Text>
          2. Wallet amount is non refundable and will not be refunded back. You
          can use wallet amount to buy add-ons only.
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Checkbox.Android
            status={checked ? "checked" : "unchecked"}
            onPress={() => {
              setChecked(!checked);
            }}
          />
          <Text>I agree to the terms and condition above.</Text>
        </View>
      </View>
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
          onPress={recharge}
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
          disabled={!hasBalance}
          onPress={onSubmit}
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
    </SafeAreaView>
  );
}
