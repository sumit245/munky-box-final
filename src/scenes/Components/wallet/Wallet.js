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
import { StripeProvider } from "@stripe/stripe-react-native";
import { getUser, saveUser } from "../../../services/user/getuser";
import { styles } from "../../styles/CheckoutStyles";
import { ActivityIndicator, Checkbox, Colors } from "react-native-paper";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";

export default function Wallet({ total, action, data, isAddOn }) {
  const [balance, setBalance] = useState(0);
  const [hasBalance, setHasBalance] = useState(false);
  const [value, onChangeText] = useState(0);
  const [state, setState] = useState({
    card: {},
    wallet_balance: {},
    user: {},
  });
  const [mycard, setMyCard] = useState({});
  const [checked, setChecked] = useState(false);

  const [user_id, setUserId] = useState("");
  const [id, setId] = useState("");
  const [ordering, setOrdering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [addOn, setAddOn] = useState([]);
  const STRIPE_PUBLISHABLE_KEY =
    "pk_test_51KammvB9SdGdzaTpAZcPCcQVMesbuC5qY3Sng1rdnEfnfo2geOUP8CQ27sw0WBjpiMpdYBRoAQ1eX8czY8BEEWdO00teqn55mD";

  useEffect(() => {
    if (total <= balance) {
      setHasBalance(true);
    }
  }, [total, balance]);

  useEffect(() => {
    fetchUser();
    setAddOn(data);
  }, [fetching]);

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

      setUserId(user.user_id);
      setId(user._id);
      setBalance(user.wallet_balance);
      setFetching(true);
    }
  };

  const stripeTokenHandler = async (token, amount, id) => {
    const paymentData = { token: token, amount: amount, user_id: id };
    const response = await axios.post(
      "https://feasti.com/api/stripe/charge/",
      paymentData
    );
    return response.data;
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
    setLoading(true);
    try {
      const result = await getCreditCardToken(mycard);
      if (result.error) {
        console.log("error in getting token");
        setLoading(false);
        alert(result.error.message);
      } else {
        if (parseFloat(value) <= 0) {
          setLoading(false);
          alert("Amount must be greater than zero!!!");
        } else {
          const res = await axios.put(
            "http://54.146.133.108:5000/api/users/" + id,
            { wallet_balance: parseFloat(balance) + parseFloat(value) }
          );
          const { status, data } = res.data;
          if (status === 201) {
            stripeTokenHandler(result.id, parseInt(value), user_id)
              .then((resp) => {
                const { paid } = resp;
                if (paid) {
                  saveUser("user", JSON.stringify(res.data))
                    .then(() => {
                      setLoading(false);
                      alert(`Recharge done with amount $${value}  !!`);
                      setBalance(
                        parseFloat(
                          parseFloat(value) + parseFloat(balance)
                        ).toFixed(2)
                      );
                      onChangeText(0);
                      setChecked(false);
                    })
                    .catch((err) => {
                      setLoading(false);
                      alert(err);
                    });
                }
              })
              .catch((error) => {
                setLoading(false);
                console.log("error in stripe");
                alert(error);
              });
          }
        }
      }
    } catch (error) {
      setLoading(false);
      alert(error);
    }
  };

  const onSubmit = async () => {
    let wb = parseFloat(balance) - parseFloat(total);
    setOrdering(true);
    if (hasBalance) {
      action(addOn);
      const res = await axios.put(
        "http://54.146.133.108:5000/api/users/" + id,
        { wallet_balance: wb }
      );
      const { status, data } = res.data;
      if (status === 201) {
        saveUser("user", JSON.stringify(res.data)).then(() => {
          setBalance(wb);
        });
      }
      setOrdering(false);
    } else {
      setOrdering(false);
      alert("Insufficient Funds");
    }
  };

  const cardHandler = (card) => {
    console.log(card);
    let { cards } = state.user;
    let currentCard = cards.filter((item) => item.number === card);
    setState({ ...state, card: currentCard[0] });
    setMyCard(currentCard[0]);
  };

  if (fetching) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between" }}>
        <ScrollView>
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
                  selectionColor="#ff6600"
                  placeholderTextColor="#ccc"
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
        </ScrollView>
        <View>
          <View style={styles.optionCard}>
            <Text>
              1. Recharge of wallet amount of {value > 0 ? "$" : null}
              {value} will be made using above credit card.
            </Text>
            <Text>
              2. Wallet amount is non refundable and will not be refunded back.
              You can use wallet amount to buy add-ons only.
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox.Android
                status={checked ? "checked" : "unchecked"}
                rippleColor="#ff6600"
                color="#ff6600"
                onPress={() => {
                  setChecked(!checked);
                }}
              />
              <Text>I agree to the terms and condition above.</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", margin: 4 }}>
            <LinearGradient style={{
              borderColor: "#000",
              borderWidth: 1,
              borderRadius: 24,
              height: 48,
              padding: 10,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              margin: 2,
            }} colors={["#fff", "transparent"]}>
              <TouchableOpacity
                onPress={recharge}
                disabled={!checked}
              >
                {loading ? (
                  <ActivityIndicator
                    size="small"
                    animating={true}
                    color={Colors.red900}
                  />
                ) : (
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
                )}
              </TouchableOpacity>
            </LinearGradient>
            {isAddOn && (
              <LinearGradient colors={["#ff9900", "#ff6600"]} style={{
                borderColor: "#ff6600",
                
                borderRadius: 24,
                padding: 10,
                height: 48,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                margin: 2,
              }}>
                <TouchableOpacity onPress={onSubmit}>
                  {ordering ? (
                    <ActivityIndicator
                      size="small"
                      animating={true}
                      color={Colors.red900}
                    />
                  ) : (
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
                  )}
                </TouchableOpacity>
              </LinearGradient>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.red900} animating />
      </SafeAreaView>
    );
  }
}
