import axios from "axios";
import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { getUser, saveUser } from "../../../services/user/getuser";

export const Favourite = ({ restaurant, isFavorite }) => {
  const [count, setIsFavorite] = React.useState(false);
  const updateFavorite = () => {
    let restra = restaurant.restaurant_name;
    const data = { favorite: restra };
    getUser("user")
      .then((res) => {
        let id = res.data._id;
        axios
          .put(
            "http://54.146.133.108:5000/api/users/addfavorite/" + id,
            data
          )
          .then((response) => {
            saveUser("user", JSON.stringify(response.data)).then((res) => {
              setIsFavorite(!count);
            });
          });
      })
      .catch((err) => console.error(err));
  };
  return (
    <TouchableOpacity style={styles.bookmark} onPress={updateFavorite}>
      <Icon
        name={isFavorite ^ count ? "heart" : "heart-outline"}
        color={isFavorite ^ count ? "#f00" : "#ff7777"}
        size={30}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookmark: {
    right: 10,
    top: 4,
    position: "absolute",
    height: 36,
    width: 36,
    borderRadius: 18,
    elevation: 2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
