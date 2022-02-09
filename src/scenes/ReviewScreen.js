import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { avatarify } from "../../src/scenes/Components/utility/helpers";
import { width } from "./styles/HomeStyles";
const ReviewItem = ({ title, avatar, review }) => {
  let stars=[]
  for (let index = 0; index < parseInt(review.rating); index++) {
    stars.push(index)
    
  }
  return(
    <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <View style={{ flexDirection: "row", flex: 1 }}>
      <View
        style={{
          height: 48,
          width: 48,
          borderRadius: 24,
          backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
          marginRight: 8,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18, color: "#FFF" }}>
          {avatarify(review.user_name)}
        </Text>
      </View>

      <View>
        <Text style={{ marginLeft: 5, fontWeight: "bold" }}>
          {review.user_name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems:"center",
            width:width-100,
            justifyContent: "space-between",
            marginLeft: 5,
          }}
        >
          <View
            style={{
              
              flexDirection: "row",
              alignItems: "center",
              marginVertical:4,
              maxWidth:"60%"
              
            }}
          >
           {
             stars.map((x,i)=>(
              <Icon name="star" color="orange" size={18} style={{ padding: 2 }} key={i} />
             ))
           }
            
            
          </View>
          
          <Text style={{ fontWeight: "bold", color: "#000", fontSize: 12,textAlign:"right" }}>
            {moment(review.review_at).format("DD MMM, YYYY")}
          </Text>
          
        
        </View>
        
        <Text style={{ marginLeft: -48,marginVertical:6,width:380}} numberOfLines={3} >{review.details}</Text>
      </View>
    </View>
  </View>
)}

export default function Rewards({ restaurant_id }) {
  const [review, setReview] = useState([]);
  
  const fetchReview = async () => {
    const response = await axios.get(
      "http://munkybox-admin.herokuapp.com/api/review/"
    );
    const { data } = response;
    let review = data.filter((item) => item.restaurant_id === restaurant_id);
    review.reverse()
    setReview(review);
  };
  useEffect(() => {
    fetchReview();
  }, []);
  const stars = ["1", "2", "3", "4", "5"];
  const ListHeader = () => (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        padding: 20,
        marginVertical: 12,
      }}
    >
      <Text style={{ fontSize: 25, fontWeight: "bold", marginVertical: 12 }}>
        5.0
      </Text>
      <View style={{ flexDirection: "row" }}>
        {stars.map((item, key) => (
          <Icon name="star" color="orange" size={18} style={{ padding: 2 }} key={key} />
        ))}
      </View>

      <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 12 }}>
        based on {review.length} reviews
      </Text>
    </View>
  );
  const renderItem = ({ item }) => <ReviewItem review={item} />;
  return (
    <View style={styles.container}>
      <FlatList
        data={review}
        ListHeaderComponent={ListHeader}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 5,
    marginVertical: 2,
    marginHorizontal: 2,
    borderWidth: 0.5,
    borderColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
  },
});
