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
  const fetchBanners = async () => {
    const response = await axios.get(
      "https://munkybox-admin.herokuapp.com/api/promo/active"
    );
    const data = await response.data;
    setPage(data);
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
        style={[styles.item, { marginBottom: 16 }]}
        onPress={() => registerClicks(image)}
      >
        <Text
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundColor: "#ff3d00",
            fontSize: 14,
            color: "white",
          }}
        >
          Sponsored
        </Text>
        <Image
          style={{
            height: 120,
          }}
          source={{ uri: image.restaurant.documents[1].banner_image }}
          resizeMode="cover"
        />
        <Text
          style={{
            position: "absolute",
            top: "30%",
            left: "30%",
            fontSize: 16,
            fontWeight: "bold",
            color: "white",
          }}
          numberOfLines={1}
        >
          {image.restaurant.restaurant_name}
        </Text>
        <View
          style={{
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor: "#fff",
            borderRadius: 2,
            position: "absolute",
            top: "60%",
            left: "26%",
            backgroundColor: "#433",
          }}
        >
          <Text
            style={{
              textAlign: "justify",
              padding: 4,
              fontSize: 12,
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Get{" "}
            {image.banner.discount_type === "$"
              ? image.banner.discount_type + image.banner.discount
              : image.banner.discount + image.banner.discount_type}{" "}
            off on {image.banner.meal_plan}. Use Code
            <Text style={{ fontWeight: "bold", color: "#fff" }}>
              {image.banner.promo_code}
            </Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Carousel
      autoplay
      showsPageIndicator={false}
      autoplayTimeout={5000}
      loop
      index={0}
      pageSize={width}
    >
      {page.map((image, index) => renderPage(image, index))}
    </Carousel>
  );
}
