import React,{ Component } from 'react';
import {View, Image, StyleSheet, Text,FlatList} from 'react-native';
import {Card} from 'react-native-paper';
import {Avatar, Input} from 'react-native-elements';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    username: 'Martin Luther',
    userImage:
      'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    review: 'A Very good Restaurant for Fooding',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    username: 'Bob Marris',
    userImage:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    review: 'A  good Restaurant for Foods at your convenience',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    username: 'Soniya Sanyal',
    userImage:
      'https://images.unsplash.com/flagged/photo-1561350117-501b4661f8d4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    review: 'Not Good',
  },
];

const ReviewItem = ({title, avatar, review}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
    <View style={{flexDirection: 'row'}}>
      <Avatar source={{uri: avatar}} rounded height={40} width={40} />
      <Text style={{marginLeft: 5}}>{review}</Text>
    </View>
  </View>
);
export default class Rewards extends Component {
  _renderItem = ({item}) => (
    <ReviewItem
      title={item.username}
      avatar={item.userImage}
      review={item.review}
    />
  );
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri:
              'http://www.chatelaine.com/wp-content/uploads/2013/05/Curried-chicken-salad.jpg',
          }}
          style={styles.bgimage}
        />
        <Card style={styles.rewardCard}>
          <FlatList
            data={DATA}
            renderItem={this._renderItem}
            keyExtractor={(item) => item.id}
          />
          <Input
            placeholder="Write your Review"
            style={{alignSelf:'auto'}}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bgimage: {
    height: 300,
    width: 450,
    resizeMode: 'cover',
  },
  rewardCard: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 50,
    height: 500,
    width: '95%',
    elevation: 5,
    borderColor: 'gray',
    position: 'absolute',
    left: 10,
    top: 100,
  },
  rewardCardCenter: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    marginLeft: 20,
    top: -50,
    borderRadius: 50,
    color: '#fff',
    zIndex: 100,
    borderColor: 'red',
    borderWidth: 2,
  },
  item: {
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
  },
});
