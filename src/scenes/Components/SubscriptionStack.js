import  React,{ Component } from 'react';
import {View, Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {IconButton} from 'react-native-paper';
import veg from '../../../assets/veg.png';
import CalenderStrip from 'react-native-calendar-strip';

export default class SubscriptionStack extends Component {
  dateSelected(date) {
    console.log(date);
  }
  render() {
    return (
      <View style={styles.mainStyle}>
        <View style={styles.header}>
          <IconButton
            style={styles.goback}
            icon="arrow-left"
            size={45}
            onPress={() => this.props.navigation.goBack()}
          />
          <Text style={styles.headerTitle}>North Indian Veg Plan by Akanu</Text>
          <Text style={styles.headersubtitle}>by NP Kitchen Service</Text>
        </View>
        <View style={styles.restaurant}>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&w=1000&q=80',
            }}
            style={{width: 350, height: 150}}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={veg}
            height={25}
            width={25}
            style={[styles.typelogo, styles.title]}
          />

          <TouchableOpacity onPress={this.detaipage}>
            <Text h5 style={styles.title}>
              Dum Aloo,Baigan Bharta with Chapatis and Rice
            </Text>
          </TouchableOpacity>
        </View>
        <Text h5 style={styles.timing}>
          12:45-1:30 PM
        </Text>
        <Text h5 style={styles.address}>
          Work | M-47, Sector-14,Old DLF Gurugram
        </Text>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            top: 40,
            left: -20,
          }}>
          <TouchableOpacity style={styles.swapbtn}>
            <Text style={{fontSize: 18, color: '#888', fontWeight: 'bold'}}>
              Swap Meal
            </Text>
            <Icon name="change" color="#888" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipbtn}>
            <Text style={{fontSize: 18, color: '#888', fontWeight: 'bold'}}>
              Skip Meal
            </Text>
            <Icon name="change" color="#888" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            top: 50,
            left: -20,
            backgroundColor:'#eee'
          }}>
          <Text style={{fontWeight: 'bold',left:-20}}>Add Extra</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{left:-20,marginRight:80,backgroundColor:'#eee'}}> Curd, Dessert, Sweets etc</Text>
          <Icon name="add" color="#888" />
          </View>
        </View>
        <Text style={{marginRight:80, top:80,backgroundColor:'#eee'}}> You can swap or skip this meal till 11:40 AM </Text>
        <Text
          style={{
            top: 180,
            left: -130,
            position: 'relative',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          {' '}
          Future Meals
        </Text>
        <CalenderStrip
          calendarAnimation={{type: 'sequence', duration: 30}}
          daySelectionAnimation={{
            type: 'background',
            duration: 50,
            highlightColor: 'red',
          }}
          style={{
            height: 50,
            borderTopColor: '#bdbdbd',
            borderTopWidth: 1,
            width: 350,
            top: 180,
            paddingBottom: 5,
          }}
          calendarColor={'#fdfdfd'}
          responsiveSizingOffset={1}
          shouldAllowFontScaling={false}
          onDateSelected={(date) => this.dateSelected(date)}
          dateNumberStyle={{color: '#8c8c8c'}}
          dateNameStyle={{color: '#7c7c7c'}}
          selectedDate={Date.now()}
          highlightDateNumberStyle={{color: 'white'}}
          highlightDateNameStyle={{color: 'white'}}
          disabledDateNameStyle={{color: 'grey'}}
          showMonth={false}
          scrollable
          leftSelector={[]}
          rightSelector={[]}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    top: 2,
    left: 2,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    borderBottomWidth: 1,
    elevation: 5,
    borderBottomColor: '#bbb',
    backgroundColor: '#ededed',
  },
  headerTitle: {
    top: 5,
    left: 50,
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
  },
  headersubtitle: {
    top: 25,
    left: 50,
    fontSize: 16,
    color: '#777',
    position: 'absolute',
  },
  goback: {
    position: 'absolute',
    left: -20,
    top: -15,
  },
  restaurant: {
    position: 'absolute',
    top: 60,
  },
  title: {
    paddingHorizontal: 5,
    top: 40,
    borderRadius: 2,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'georgia',
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  typelogo: {
    paddingHorizontal: 5,
    marginLeft: 30,
    marginTop: 8,
  },
  timing: {
    paddingHorizontal: 5,
    top: 40,
    left: 2,
    borderRadius: 2,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'georgia',
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  address: {
    paddingHorizontal: 5,
    top: 40,
    left: 2,
    color: '#777',
    borderRadius: 2,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'georgia',
    alignSelf: 'flex-start',
    marginBottom: 0,
  },
  skipbtn: {
    width: 150,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    // marginRight: 10,
  },
  swapbtn: {
    width: 150,
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginRight: 10,
  },
});
