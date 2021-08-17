import  React,{ Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {Card} from 'react-native-paper';
import {AnimatedGaugeProgress} from 'react-native-simple-gauge';
export default class Rewards extends Component {
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
          {/* <View style={styles.rewardCardCenter}/> */}
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              justifyContent: 'center',
            }}>
            <Text style={{color: '#444', fontSize: 24, fontWeight: 'bold'}}>
              Received a
            </Text>
            <Text style={{color: 'tomato', fontSize: 24, fontWeight: 'bold'}}>
              {' '}
              $5 reward for
            </Text>
          </View>

          <Text
            style={{
              color: '#444',
              fontSize: 24,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            {' '}
            every 60 points earned{' '}
          </Text>
          <AnimatedGaugeProgress
            size={200}
            width={20}
            fill={80}
            rotation={90}
            cropDegree={90}
            tintColor="#ff82b4"
            delay={0}
            style={{alignSelf: 'center', justifyContent: 'center', padding: 10}}
            backgroundColor="#b0c4de"
            stroke={[2, 2]} //For a equaly dashed line
            strokeCap="circle">
            <Text
              style={{
                color: 'tomato',
                fontSize: 36,
                fontWeight: 'bold',
                position: 'absolute',
                left: 70,
                top: 70,
              }}>
              35/60
            </Text>
            <Text
              style={{
                color: '#444',
                fontSize: 24,
                fontWeight: 'bold',
                position: 'absolute',
                left: 75,
                top: 110,
              }}>
              POINTS
            </Text>
          </AnimatedGaugeProgress>
          <Text style={{
              color: '#444',
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Earn 1 Point for Every $1 Spent</Text>
            <View style={{flexDirection:'row',paddingHorizontal:40,color:'#444',marginTop:10}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#444'}}>Available Balance</Text>
            <View style={{width:50,backgroundColor:'#aaa',marginLeft:30,borderRadius:20}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',paddingHorizontal:5}}>$10</Text>

            </View>
            

            </View>
          
          <View>
            
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                backgroundColor: 'tomato',
                margin: 20,
                padding: 10,
                borderRadius: 30,
              }}>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
                    paddingHorizontal: 20,
                    fontWeight: 'bold',
                  }}>
                  EARN
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 24,
                    paddingHorizontal: 20,
                    marginLeft:50,
                    fontWeight: 'bold',
                  }}>
                  REDEEM
                </Text>
              </View>
            </TouchableOpacity>
          </View>
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
});
