import { LinearGradient } from 'expo-linear-gradient';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { Provider } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/Ionicons';
import { clearAll, getUser, removeUser } from '../../services/user/getuser';
const { width } = Dimensions.get('screen').width;
export default class AccountStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props,
      user: {},
      signoff: false,
      show: true,
    };
  }
  fetchUser = () => {
    getUser('user')
      .then((res) => this.setState({ user: res.data }))
      .catch((err) => console.log(err));
  };
  componentDidUpdate(prevProps) {
    this.fetchUser();
  }
  componentDidMount() {
    this.fetchUser();
  }
  showDialog = () => {
    Alert.alert('Sign out?', 'Are you sure you want to logout', [
      { text: 'No' },
      { text: 'Yes', onPress: () => this.logout() },
    ]);
  };

  logout = async () => {
    this.setState({ signoff: false });
    await removeUser('user');
    Actions.jump('auth');
  };

  render() {
    const data = { ...this.state.user };
    const user =
      typeof data.first_name !== 'undefined'
        ? data.first_name + ' ' + data.last_name
        : 'User';
    return (
      <SafeAreaView style={styles.navdrawer}>
        <Provider>
          <View style={styles.header}>
            <View style={styles.imageNUmName}>
              <View style={styles.profileContainer}>
                <Image
                  source={{ uri: data.profile_picture }}
                  style={styles.profilepic}
                />
              </View>
              <View style={{ marginLeft: 10, marginTop: 16 }}>
                <Text
                  style={{ fontSize: 16, color: '#000', fontWeight: 'bold' }}
                >
                  {user}
                </Text>
                <TouchableOpacity
                  onPress={() => Actions.push('editaccount', { type: 'edit' })}
                >
                  <Text style={{ color: '#ff6600', fontWeight: 'bold' }}>
                    Edit Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.drawerRow}>
            <Icons name="earth" color={'#000'} size={24} brand />
            <TouchableOpacity
              onPress={() => {
                Actions.push('listAddress');
              }}
            >
              <Text style={styles.drawerText}>Manage Address</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerRow}>
            <Icons name="md-card-outline" color={'#000'} size={24} />
            <TouchableOpacity
              onPress={() => {
                Actions.push('manageCards', {
                  title: 'Manage Payments',
                  checkout: false,
                });
              }}
            >
              <Text style={styles.drawerText}>Manage Payments</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerRow}>
            <Icons
              name="notifications-outline"
              color={'#000'}
              size={24}
              brand
            />
            <TouchableOpacity
              onPress={() =>
                Actions.push('manageNotifications', {
                  title: 'Manage Notifications',
                })
              }
            >
              <Text style={styles.drawerText}>Notifications</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerRow}>
            <Icons name="mail-outline" color={'#000'} size={24} brand />
            <TouchableOpacity
              onPress={() => {
                Actions.push('contacts');
              }}
            >
              <Text style={styles.drawerText}>Support</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.drawerRow}>
            <Icons
              name="md-document-text-outline"
              color={'#000'}
              style={{ fontWeight: 'bold' }}
              size={24}
              brand
            />
            <TouchableOpacity
              onPress={() => {
                Actions.push('policies');
              }}
            >
              <Text style={styles.drawerText}>About Us</Text>
            </TouchableOpacity>
          </View>

          <LinearGradient
            colors={['#ff9900', '#ff6600']}
            style={{
              position: 'absolute',
              width: 40,
              height: 40,
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
              bottom: 10,
              left: '45%',
            }}
          >
            <TouchableOpacity onPress={this.showDialog}>
              <Icons name="power-sharp" color={'#fff'} size={28} brand />
            </TouchableOpacity>
          </LinearGradient>
        </Provider>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  navdrawer: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    width: width,
    backgroundColor: '#fff',
  },
  header: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    height: 100,
    padding: 10,
  },
  drawerRow: {
    borderBottomColor: '#888',
    borderBottomWidth: 1,
    borderBottomStartRadius: 120,
    borderBottomEndRadius: 40,
    width: width,
    marginLeft: 2,
    flexDirection: 'row',
    padding: 14,
    marginVertical: 1,
  },
  drawerText: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  profileContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderColor: '#777',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilepic: {
    height: 80,
    width: 80,
    borderRadius: 40,
  },
  imageNUmName: {
    flex: 1,
    flexDirection: 'row',
  },
});
