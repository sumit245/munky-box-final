import React from "react";
import { SafeAreaView, FlatList } from "react-native";
import { getUser } from "../../../services/user/getuser";
import ItemCard from "../ItemCard";
const renderItem = ({ item, index }, isFavorite) => (
  <ItemCard key={index} item={item} isFavorite={isFavorite} />
);
export default function Lunch({ restaurant }) {
  const [isFavorite, setisFavorite] = React.useState("");
  const [loading,setLoading]=React.useState(false)
  React.useEffect(() => {
    let unmounted=false
    setLoading(true)
    getUser("user")
      .then((res) => {
        let favorites = res.data.favorite;
        for (let i = 0; i < favorites.length; i++) {
          for (let j = 0; j < restaurant.length; j++) {
            if(favorites[i]===restaurant[j].restaurant_name){
              setisFavorite(restaurant[j].restaurant_name)
              if(!unmounted){
                setLoading(false)
              }
            }
          }
        }
      })
      .catch((err) =>{
        if(!unmounted){
          setLoading(false)
        }
      });
      return ()=>{unmounted=true}
  },[]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ marginLeft: 5, paddingBottom: 4 }}
        data={restaurant}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        renderItem={(item) => renderItem(item, isFavorite)}
        keyExtractor={(item) => item._id}
      />
    </SafeAreaView>
  );
}
