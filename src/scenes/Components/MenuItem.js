import  React,{ Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Card, Text } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
export default class MenuItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
    };
  }
  render() {
    const { meals } = this.state;
    return (
      <Card containerStyle={styles.item} key={this.props.index}>
        <View>
          <Image
            source={{ uri: meals.image }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop: 154,
          }}
        >
          <Icon
            style={{ margin: 2 }}
            name="stop-circle"
            color={meals.type === "Veg" ? "#2aaf21" : "#cc2224"}
            size={16}
          />
          <Text style={styles.title}>{meals.meal_name}</Text>
        </View>
        <Text
          style={[
            styles.title,
            { fontSize: 12, color: "#444", paddingHorizontal: 18 },
          ]}
        >
          {meals.description}
        </Text>
        <Text style={{textAlign:'right',paddingHorizontal:10,color:"#777",fontWeight:'bold'}}>{meals.day}</Text>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    borderRadius: 5,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
    padding: 2,
    height: 230,
    bottom: 2,
    width: 250,
    margin: 2,
  },
  image: {
    width: 240,
    height: 150,
    marginTop: 1,
    marginLeft: 2,
    position: "absolute",
  },
  title: {
    paddingHorizontal: 2,
    fontSize: 16,
    fontWeight:'bold'
  },
  typelogo: {
    paddingHorizontal: 5,
    marginLeft: 5,
  },
});
