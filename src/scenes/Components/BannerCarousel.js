import React, { useEffect, useState } from "react";
import Carousel from "react-native-banner-carousel";
import {
  StyleSheet,
  Image,
  View,
  Dimensions,
  Text,
  LogBox,
} from "react-native";
import { styles } from "../styles/HomeStyles";
import axios from "axios";

const { width, height } = Dimensions.get("window");

export default function BannerCarousel() {
  const [page, setPage] = useState([]);
  const [images, setImages] = useState([]);
  const fetchBanners = async () => {
    const response = await axios.get(
      "https://munkybox-admin.herokuapp.com/api/promo/active"
    );
    const data = await response.data;
    let promoted_restaurants = [];
    Array.isArray(data) &&
      data.map((restaurant, key) => {
        let rest = {};
        rest["restaurant_name"] = restaurant.restaurant_name;
        rest["image"] = restaurant.documents[1].banner_image;
        promoted_restaurants.push(rest);
      });
    setPage(promoted_restaurants);
  };
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
    fetchBanners();
  }, []);

  const renderPage = (image, index) => {
    return (
      <View key={index} style={[styles.item, { marginBottom: 16 }]}>
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
          source={{ uri: image.image }}
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
          {image.restaurant_name}
        </Text>
        <View
          style={{
            borderStyle: "dashed",
            borderWidth: 1,
            borderColor:"#fff",
            borderRadius: 2,
            position:"absolute",
            top:"60%",
            left:"10%"
          }}
        >
          <Text style={{ textAlign: "justify", padding: 4, fontSize: 12,color:"#fff" }}>
            Get 5% off on 15 Meals. Use Code
            <Text style={{ fontWeight: "bold",color:"#fff" }}>WELCOME20</Text>
          </Text>
        </View>
      </View>
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
