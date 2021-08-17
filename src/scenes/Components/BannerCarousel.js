import  React,{ Component } from 'react';
import Carousel from 'react-native-banner-carousel';
import {StyleSheet, Image, View, Dimensions, Text, LogBox} from 'react-native';
import {Card} from 'react-native-elements';
import {Chip} from 'react-native-paper';

const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 120;

const images = [
  'https://media-cdn.tripadvisor.com/media/photo-s/0a/ae/6c/f0/kitchen-king.jpg',
  'https://i.insider.com/5e3ae6c45bc79c5b56620e97?width=1100&format=jpeg&auto=webp',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&w=1000&q=80',
];

export default class BannerCarousel extends Component {
  componentDidMount() {
    LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    LogBox.ignoreAllLogs();
    setTimeout(() => {
      this.setState({
        width: BannerWidth,
        height: BannerHeight,
        resizemode: 'cover',
      });
    });
  }
  renderPage(image, index) {
    return (
      <View key={index}>
        <Chip
          mode="flat"
          icon="bookmark"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            zIndex: 1,
            alignItems: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          textStyle={{color: '#ff3d00', fontSize: 20}}>
          Subscribe Now
        </Chip>
        <Text
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            zIndex: 1,
            backgroundColor: '#ff3d00',
            fontSize: 15,
            color: 'white',
          }}>
          Sponsored
        </Text>
        <Image
          style={{
            width: BannerWidth,
            height: BannerHeight,
          }}
          source={{uri: image}}
          resizeMode="cover"
        />
        <Text
          style={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            alignContent: 'center',
            justifyContent: 'center',
            zIndex: 1,
            fontSize: 30,
            fontWeight: 'bold',
            color: 'white',
          }}
          numberOfLines={1}>
          Big Billion Sales
        </Text>
      </View>
    );
  }
  render() {
    return (
      <Card containerStyle={styles.continer}>
        <Carousel
          autoplay
          showsPageIndicator
          autoplayTimeout={5000}
          loop
          index={0}
          pageSize={BannerWidth - 20}>
          {images.map((image, index) => this.renderPage(image, index))}
        </Carousel>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  continer: {
    flex: 1,
    elevation: 2,
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.5,
    shadowColor: 'black',
    height: BannerHeight,
    borderRadius: 5,
    paddingVertical: 0,
    paddingLeft: 0,
  },
});
