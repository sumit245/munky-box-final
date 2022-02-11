import React, { useEffect, useState } from "react";
import Carousel from "react-native-banner-carousel";
import {
  StyleSheet,
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

const { width, height } = Dimensions.get("window");

export default function BannerCarousel() {
  const [page, setPage] = useState([]);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchBanners = async () => {
    const response = await axios.get(
      "https://munkybox-admin.herokuapp.com/api/promo/active"
    );
    const data = await response.data;
    setPage(data);
    
    if (data.length !== 0) {
      setLoaded(true);
    }
  };
  const registerClicks = async (restaurant) => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/chefdashboard/getchefbyidandupdatebannercount/" +
        restaurant.restaurant.restaurant_id
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
          { marginBottom: 16, marginHorizontal: 4, width: width - 20 },
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
          <View
            style={{
              borderRadius: 2,
              backgroundColor: "#ff7600",
              padding: 2,
              marginTop: 4,
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              COUPON: {image.banner.promo_code}
            </Text>
          </View>
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
      <View style={{ marginHorizontal: 4, marginBottom: 16 }}>
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
        >
          {page.map((image, index) => renderPage(image, index))}
        </Carousel>
      </View>
    );
  } else {
    return null;
  }
}
