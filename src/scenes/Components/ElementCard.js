import React, { Component } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, Rating} from 'react-native-elements';
import {IconButton} from 'react-native-paper';

export default class ElementCard extends Component {
  render() {
    return (
      <Card containerStyle={styles.card}>
        <View>
          <Card.Image
            source={{
              uri:
                'https://www.t-nation.com/system/publishing/articles/10005529/original/6-Reasons-You-Should-Never-Open-a-Gym.png',
            }}
            resizeMode="cover"
            style={{flex: 1, height: 100}}
          />
          <IconButton
            icon="heart-circle"
            color="#ff5252"
            style={styles.bookmark}
            size={30}
          />
        </View>
        <View>
          <Text style={styles.title} numberOfLines={1}>
            Kake di Hatti
          </Text>
          <Text style={styles.tags}>
            $$ Sandwich Fast food American Family
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.delivery}>
            25-35 min
          </Text>
          <Text style={styles.prices}>
            $ 1.99 Delivery Charge
          </Text>
          </View>
          
          <Rating
            type="star"
            fractions={1}
            style={{position: 'absolute', right: 2, top: 5, marginBottom: 3}}
            startingValue={3.3}
            ratingCount={5}
            imageSize={15}
          />
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    shadowOffset: {width: 2, height: 5},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginHorizontal: 5,
    backgroundColor: 'white',
  },
  bookmark: {
    right: 0,
    position: 'absolute',
    color: 'white',
    zIndex: 1,
  },
  title: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    margin: 1,
    borderRadius: 2,
    fontSize:18,
    fontWeight: 'bold',
  },
  tags:{
    paddingHorizontal: 5,
    alignSelf: 'flex-start',
    margin: 1,
    borderRadius: 2,
    fontSize:14,
    
  },
  delivery:{
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 5,
    flex: 1,
    textAlign:'left',
    margin: 1,
    marginRight:10,
    borderRadius: 2,
    fontSize:14,
    fontWeight: 'bold',
  },
  prices:{
    backgroundColor: '#4484ff',
    color:'white',
    paddingHorizontal: 5,
    paddingVertical:1,
    alignSelf: 'flex-start',
    margin: 1,
    borderRadius: 2,
    fontSize:14,
    fontWeight: 'bold',
  }
});
