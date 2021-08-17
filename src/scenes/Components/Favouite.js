import axios from "axios";
import React,{ Component } from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { getUser } from "../../services/user/getuser";
import ItemCard from "./ItemCard";

const renderItem = ({ item, index }) => (
  <ItemCard index={index} item={item} isFavorite={true} />
);
export default class Favouite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurant: [],
      isFavorite: true,
      isFetching: false,
      badgeNumber:"0"
    };
  }
  badgeNumber=5
  _getFavoriteData = () => {
    getUser("user").then((res) => {
      let id = res.data._id;
      axios
        .get("http://munkybox-admin.herokuapp.com/api/users/getfavorite/" + id)
        .then((response) => {
          let numRest=response.data.data
          numRest=numRest.length
          this.setState({ restaurant: response.data.data,badgeNumber:numRest});
        })
        .catch((err) => {
          console.log(err);
        });
    });
    this.setState({isFetching:false})
  };
  onRefresh() {
    this.setState({ isFetching: true }, () => {
      this._getFavoriteData();
    });
  }
  componentDidMount() {
    this._getFavoriteData();
  }
  render() {
    const { restaurant } = this.state;
    if (restaurant.length < 1) {
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: "center", color: "#979797", fontSize: 14 }}>
            Please wait a while we are fetching your favourite restaurants...{" "}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            contentContainerStyle={{ marginHorizontal: 2,paddingBottom:10 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={()=>(
              <View style={{paddingHorizontal:10,padding:4}}>
                <Text style={{fontSize:18,fontWeight:'bold',marginTop:4}} >My Favorites</Text>
              </View>
            )}
            data={restaurant}
            renderItem={renderItem}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            keyExtractor={(item) => item.id}
          />
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
