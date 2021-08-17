import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Card, Divider, IconButton } from 'react-native-paper';
import CalendarPicker from 'react-native-calendar-picker';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Ionicons'

const SLOTLUNCH = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    timing: '12:00 PM- 12:45 PM',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    timing: '1:30 PM- 2:15 PM',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    timing: '2:30 PM- 3:15 PM',
  },
];
const SLOTDINNER = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    timing: '8:00 PM- 8:45 PM',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    timing: '9:15 PM- 22:00 PM',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    timing: '22:15 PM- 23:00 PM',
  },
];

const Slot = ({ timing }) => {
  const [value, setValue] = useState(false);
  const slotClicked = () => {
    setValue(!value);
  };

  return (
    <View
      style={[
        value ? { backgroundColor: 'red' } : { backgroundColor: 'gray' },
        {
          marginHorizontal: 5,
          width: 150,
          height: 50,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
          elevation: 1,
        },
      ]}>
      <TouchableOpacity onPress={slotClicked}>
        <Text style={{ fontSize: 16, color: '#ffffff' }}>{timing}</Text>
      </TouchableOpacity>
    </View>
  );
};
const renderSlot = ({ item }) => <Slot timing={item.timing} />;

export default class AddressPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
      modalvisible: false,
      meal: false,
    };
  }
  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };
  componentDidMount() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
  }
  onDateChange = (date) => {
    this.setState({
      selectedStartDate: date,
    });
    let date1 = new Date().getTime();
    let date2 = this.state.selectedStartDate;
  }
  onMealPressed = (meal) => {
    this.setState({
      meal: meal,
    });
  };
  ShowCurrentDate = () => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var date = new Date().getDate();
    var month = new Date().getMonth();
    return date + '-' + months[month];
  };
  ShowSubscriptionDate = () => {
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    var date = new Date().getDate();
    var month = new Date().getMonth();
    return date + '-' + months[month];
  };

  render() {
    const { modalVisible } = this.state;
    const { meal } = this.state;
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible || false}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CalendarPicker
                onDateChange={this.onDateChange}
                todayBackgroundColor="red"
                allowRangeSelection
                allowBackwardRangeSelect={false}
                selectedDayColor="green"
                width={340}
                selectedRangeStyle={{ backgroundColor: 'green' }}
              />
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}>
                <Text style={styles.textStyle}>X</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <ImageBackground
          source={{
            uri:
              'http://s3.amazonaws.com/gmi-digital-library/65caecf7-a8f7-4a09-8513-2659cf92871e.jpg',
          }}
          style={styles.imgbgstyle}>
          <View style={styles.imgoverlay}>
            <IconButton
              style={styles.goback}
              icon="arrow-left-circle"
              color="white"
              size={50}
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        </ImageBackground>
        <Card style={styles.desccard}>
          <Text style={styles.recipe}>
            Chef's Special North Indian Veg Plan
          </Text>
          <Text style={styles.subtitle}>by {this.props.resname}</Text>
          <Text style={styles.plan}>{this.props.plan}</Text>
          <Divider style={{ marginHorizontal: 5, marginVertical: 10 }} />
          <View style={{ flexDirection: 'row' }}>
            <Text style={[{ left: 10, position: 'absolute' }, styles.subheading]}>
              {this.props.duration} DAYS
            </Text>
            <Text
              style={[{ right: 50, position: 'absolute' }, styles.subheading]}>
              TOTAL
            </Text>
          </View>
          <View style={{ flexDirection: 'row', top: 20 }}>
            <Text
              style={[
                styles.subheading,
                { left: 10, position: 'absolute', color: '#606080' },
              ]}>
              $ {this.props.price} / meal
            </Text>
            <Text
              style={[
                styles.subheading,
                { right: 60, position: 'absolute', color: '#606080' },
              ]}>
              $ {this.props.duration * this.props.price}
            </Text>
          </View>
        </Card>
        <Text style={{ ...styles.header, top: -80, fontSize: 18 }}>
          Select Plan Duration
        </Text>
        <Card style={{ ...styles.desccard, top: -80, height: 80 }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: '2%' }}>
            <Text style={{ fontSize: 18, padding: 5 }}>
              {this.ShowCurrentDate()}
            </Text>
            <Text style={{ fontSize: 18, padding: 5 }}> - </Text>
            <Text style={{ fontSize: 18, padding: 5 }}>
              {this.ShowSubscriptionDate()}
            </Text>
          </View>
          <IconButton
            icon="calendar"
            size={24}
            color="#ff0058"
            style={{
              justifyContent: 'flex-end',
              position: 'absolute',
              right: 10,
              top: -10
            }}
            onPress={() => {
              this.setModalVisible(true);
            }}
          />
          <Divider style={{ marginHorizontal: 10, margin: '2%' }} />
          <Text
            style={{
              fontSize: 18,
              paddingHorizontal: 10,
              color: '#444',
              display: 'flex',
              width: '90%',
              marginLeft: 10,
              borderRadius: 5,
            }}>
            The Kitchen Delivers on Sat & Sun
          </Text>
        </Card>
        <View style={{ top: -80, flexDirection: 'row' }}>
          <Text style={styles.header}>Select a Delivery Slot</Text>
          <TouchableOpacity
            onPress={() => {
              this.onMealPressed(!meal);
            }}
            style={[
              this.state.meal
                ? { backgroundColor: 'tomato' }
                : { backgroundColor: 'teal' },
              {
                height: 24,
                marginTop: 10,
                borderRadius: 2,
                paddingHorizontal: 3,
              },
            ]}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              {this.state.meal ? 'LUNCH' : 'DINNER'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ top: -80 }}>
          <FlatList
            horizontal
            data={this.state.meal ? SLOTLUNCH : SLOTDINNER}
            renderItem={renderSlot}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View
          style={{ top: -60, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Text
            style={{
              alignSelf: 'flex-start',
              paddingHorizontal: 10,
              fontSize: 25,
            }}>
            Notes for Delivery
          </Text>
          <TouchableOpacity onPress={() => Actions.coupons()}>
            <Icon name='pencil-sharp' size={24} color='blue' />
          </TouchableOpacity>
        </View>
        <View style={{ top: -5 }}>
          <TouchableOpacity
            style={{
              width: '98%',
              borderRadius: 2,
              borderWidth: 2,
              elevation: 1,
              borderColor: '#55ff55',
              marginHorizontal: '1%',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
            }}
            onPress={() => {
              Actions.manageaddress();
            }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#058F05' }}>
              {' '}
              ADD ADDRESS TO PROCEED
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  recipe: {
    fontFamily: 'Arial',
    fontSize: 18,
    fontWeight: 'bold',
    textAlignVertical: 'top',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    paddingHorizontal: 10,
    marginLeft: 18,
  },
  plan: {
    alignSelf: 'flex-end',
    right: '5%',
    paddingHorizontal: '2%',
    textAlignVertical: 'center',
    backgroundColor: '#0275d8',
    color: '#ffffff',
    borderRadius: 2,
    fontFamily: 'Gabriela',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goback: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  imgbgstyle: {
    width: '99%',
    height: 200,
    elevation: 5,
    margin: 2,
  },
  imgoverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  desccard: {
    width: '96%',
    top: -80,
    marginLeft: '2%',
    elevation: 5,
    borderRadius: 2,
    height: 150,
  },
  subheading: {
    fontSize: 18,
    fontFamily: 'georgia',
    color: 'gray',
    fontWeight: 'bold',
  },
  header: {
    backgroundColor: '#fffeff',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 7,
    color: '#565656',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 15,
    height: 30,
    width: 30,
    fontSize: 25,
    justifyContent: 'center',
    padding: 10,
    position: 'absolute',
    top: -12,
    right: -12,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
