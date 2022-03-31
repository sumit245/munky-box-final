import axios from "axios";
import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList } from "react-native";
import { getUser } from "../../services/user/getuser";
import ItemCard from "./home/ItemCard";
import Loader from "./utility/Loader";
import { commonStyles } from "../styles/commonstyles";
const renderItem = ({ item, index }) => (
  <ItemCard key={index} index={index} item={item} isFavorite={true} />
);
export default function Favourite() {
  const [isFetching, setFetching] = useState(true);
  const [restaurant, setRestaurant] = useState([]);
  const _getFavoriteData = async () => {
    const users = await getUser("user");
    const { _id } = users.data;
    const favoriteResponse = await axios.get(
      "http://54.146.133.108:5000/api/users/getfavorite/" + _id
    );
    const favorites = favoriteResponse.data.data;
    setRestaurant(favorites);
    setFetching(false);
  };
  const onRefresh = () => {
    setFetching(true);
    _getFavoriteData();
  };
  useEffect(() => {
    let componentMounted = true;
    if (componentMounted) {
      _getFavoriteData();
    }
    return () => {
      componentMounted = false;
    };
  });
  if (isFetching) {
    return (
      <Loader msg="Please wait a while we are fetching your favourite restaurants" />
    );
  } else {
    return (
      <SafeAreaView style={commonStyles.container}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          data={restaurant}
          renderItem={renderItem}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  }
}
// }
