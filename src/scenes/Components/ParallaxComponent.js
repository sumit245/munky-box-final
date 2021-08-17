import  React, { Component } from 'react';
import { Dimensions, Image, FlatList, StyleSheet, Text, View } from 'react-native';

  
  import ParallaxScrollView from 'react-native-parallax-scroll-view';
  
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Kake di Hatti',
      url:'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-1.2.1&w=1000&q=80',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Dominos',
      url:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&w=1000&q=80',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'McDonalds',
      url:'https://i.insider.com/5e3ae6c45bc79c5b56620e97?width=1100&format=jpeg&auto=webp',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d73',
        title: 'Kitchen King',
        url:'https://media-cdn.tripadvisor.com/media/photo-s/0a/ae/6c/f0/kitchen-king.jpg',
      },
  ];
  
  const renderItem = ({ item,index }) => (
    <View style={styles.item}
    key={index}
    >
        <Image source={{uri:item.url}} style={styles.image}/>
        <View style={styles.imagedesc}>
        <Text style={styles.title}>{item.title}</Text>
        </View>
        
    </View>
  );

export default class ParallaxComponent extends Component {
    constructor(props) {
        super(props);
        this.state =  {
          dataSource:{DATA}
        };
      }
    render() {
        const { onScroll = () => {} } = this.props;
        return (
            <FlatList
            data={this.state.dataSource}
            renderItem={renderItem}
            renderScrollComponent={props => (
                <ParallaxScrollView
                onScroll={onScroll} 
                headerBackgroundColor='#333'
                stickyHeaderHeight={ STICKY_HEADER_HEIGHT }
            parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
            backgroundSpeed={10}

            renderBackground={() => (
              <View key="background">
                <Image source={{uri: 'https://i.ytimg.com/vi/P-NZei5ANaQ/maxresdefault.jpg',
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT}}/>
                <View style={{position: 'absolute',
                              top: 0,
                              width: window.width,
                              backgroundColor: 'rgba(0,0,0,.4)',
                              height: PARALLAX_HEADER_HEIGHT}}/>
              </View>
            )}

            renderForeground={() => (
              <View key="parallax-header" style={ styles.parallaxHeader }>
                <Image style={ styles.avatar } source={{
                  uri: 'https://pbs.twimg.com/profile_images/2694242404/5b0619220a92d391534b0cd89bf5adc1_400x400.jpeg',
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE
                }}/>
                <Text style={ styles.sectionSpeakerText }>
                  Talks by Rich Hickey
                </Text>
                <Text style={ styles.sectionTitleText }>
                  CTO of Cognitec, Creator of Clojure
                </Text>
              </View>
            )}

            renderStickyHeader={() => (
              <View key="sticky-header" style={styles.stickySection}/>
                
            )}

            renderFixedHeader={() => (
              <View key="fixed-header" style={styles.fixedSection}>
                <Text style={styles.fixedSectionText}
                      onPress={() => this.refs.ListView.scrollTo({ x: 0, y: 0 })}>
                  Scroll to top
                </Text>
              </View>
            )}/>
    
            )}
            
            />
        );
    }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 350;
const STICKY_HEADER_HEIGHT = 70;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: 300,
    justifyContent: 'flex-end'
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10
  },
  fixedSection: {
    position: 'absolute',
    bottom: 10,
    right: 10
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
    paddingVertical: 5
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 20
  }
});
