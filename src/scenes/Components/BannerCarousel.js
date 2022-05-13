import React, { useEffect, useState } from "react";
import Carousel from "react-native-banner-carousel";
import {
  Image,
  View,
  Dimensions,
  Text,
  LogBox,
  TouchableOpacity,
} from "react-native";
import { styles } from "../styles/HomeStyles";
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window");

export default function BannerCarousel() {
  const [page, setPage] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchBanners = async () => {
    const response = await axios.get(
      "http://54.146.133.108:5000/api/promo/active"
    );
    const data = await response.data;
    setPage(data);

    if (data.length !== 0) {
      setLoaded(true);
    }
  };
  const registerClicks = async (restaurant) => {
    const id = restaurant.banner.promo_id;
    const response = await axios.get(
      "http://54.146.133.108:5000/api/chefdashboard/getchefbyidandupdatebannercount/" +
      id
    );
    Actions.push("details", {
      title: restaurant.restaurant.restaurant_name,
      item: restaurant.restaurant,
      promo: restaurant.banner,
    });
  };
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    fetchBanners();
  }, []);

  const renderPage = (image, index) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.item,
          { marginBottom: 16, marginHorizontal: 2, width: width - 8, },
        ]}
        onPress={() => registerClicks(image)}
      >
        <Image
          style={{
            height: 120,
            borderRadius: 6,
          }}
          source={{ uri: image.restaurant.documents[1].banner_image }}
          resizeMode="cover"
        />
        <View
          style={{
            backgroundColor: "#000",
            position: "absolute",
            top: 4,
            left: 4,
            justifyContent: "center",
            padding: 4,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
            width: "50%",
            height: 120,
          }}
        >
          <Text
            style={{
              textAlign: "justify",
              fontSize: 18,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {image.banner.discount_type === "$"
              ? image.banner.discount_type + image.banner.discount
              : image.banner.discount + image.banner.discount_type}{" "}
            off ({image.banner.meal_plan})
          </Text>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 16,
              textTransform: "uppercase",
              color: "white",
            }}
            numberOfLines={1}
          >
            {image.restaurant.restaurant_name}
          </Text>
          <LinearGradient
            colors={["#ff9900", "#ff6600"]}
            style={{
              borderRadius: 2,
              padding: 2,
              marginTop: 4,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              COUPON: {image.banner.promo_code}
            </Text>
          </LinearGradient>
        </View>
        <View
          style={{
            height: 0,
            width: 48,
            position: "absolute",
            top: 4,
            left: "50%",
            borderStyle: "solid",
            borderTopWidth: 120,
            borderRightWidth: 25,
            borderRightColor: "transparent",
            borderTopColor: "#000",
          }}
        />
      </TouchableOpacity>
    );
  };
  if (loaded) {
    return (
      <View style={{ marginHorizontal: 2 }}>
        <Text style={{ marginHorizontal: 4, fontWeight: "bold", fontSize: 16 }}>
          Today's Featured
        </Text>
        <Carousel
          autoplay
          showsPageIndicator={true}
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={width}
          activePageIndicatorStyle={{ color: "#ff9900" }}
          pageIndicatorStyle={{ backgroundColor: "#ff9900" }}
        // pageIndicatorContainerStyle={{backgroundColor:"#fff",width:width-20,justifyContent:"center",alignItems:"center"}}
        >
          {page.map((image, index) => renderPage(image, index))}
        </Carousel>
      </View>
    );
  } else {
    return null;
  }
}
