import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    Image,
    KeyboardAvoidingView,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import { Input } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import Icon from "react-native-vector-icons/Ionicons";
import * as ImagePicker from 'expo-image-picker';
import { getUser } from "../../services/user/getuser";

const { width, height } = Dimensions.get('window')
const Lang = {
    RegisterForm: {
        name: 'First Name',
        nameError: 'Please add a valid name',
        surname: 'Last Name',
        surnameError: 'Please add a valid surname',
        mobile: 'Mobile Number',
        mobileError: 'Please add a valid mobile phone',
        date: 'Date of Birth',
        dateError: 'Please add a valid date of birth',
        email: 'Email',
        emailError: 'Please add a valid email address',
        terms: 'I accept the Terms and Conditions',
        GDPA: 'I accept the Privacy Policy',
        receiveNews: 'I want to receive news',
        send: 'Send',
        headerTitle: 'Just A Few Clicks Away',
        lightText: 'We need some details to serve you better',
        headerTitleEdit: 'Edit'
    }
}
const Colors = {
    PRIMARY: "#1abc9c",
    WHITE: "#ffffff",
    GREEN: "#0da935",
    LIGHTGRAY: "#C7C7C7",
    DARKGRAY: "#5E5E5E",
    CGRAY: "#33393c",
    PURPLE: "#6659b6",
    BLUE: "#25a8df",
    LIGHTERGRAY: "#dbdbdb",
    ALMOSTWHITE: "#f0f0f0",
    ERROR: "#f21818"
};


export default class RegistrationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            uri: 'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
            title:""
        }
    }
    _getTitle() {
        if (this.props.type === "edit") {
            return Lang.RegisterForm.headerTitleEdit;
        } else {
            return Lang.RegisterForm.headerTitle;
        }
    }
    _validateFields() {
        let result = true;
        var regName = /^[a-zA-Z]+$/;
        var reMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var mobile = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/g;

        if (regName.test(this.state.first_name) === false) {
            result = false;
            this.setState({ nameError: Lang.RegisterForm.nameError, result: result });
        }

        if (regName.test(this.state.last_name) === false) {
            result = false;
            this.setState({ surnameError: Lang.RegisterForm.surnameError, result: result });
        }

        if (reMail.test(this.state.email_id) === false) {
            result = false;
            this.setState({ emailError: Lang.RegisterForm.emailError, result: result });
        }

        if (mobile.test(this.state.phone) === false) {
            result = false;
            this.setState({ mobileError: Lang.RegisterForm.mobileError, result: result });
        }
        this.setState({ result: result })
        return result;
    }
    onChangeText = id => e => {
        this.setState({
            [id]: e
        })
    }
    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            this.setState({ uri: result.uri });
        }
    }
    _nextAction = () => {
            // const { first_name, last_name, phone, profile_picture, email_id, uri } = this.state
            // let user1 = {
            //     first_name, last_name, phone, profile_picture, email_id, uri
            // }
            // const user = JSON.stringify(user1)
            // // saveUser('user', user)
            Actions.push('manageAddress', { ...this.state })
    }
    componentDidMount() {
        if (this.props.logintype === 'email') {
            this.setState({ first_name: this.props.first_name })
        }
        getUser('user').then(res=>console.log(res)).catch(err=>console.log(err))
    }
    render() {
        const { uri, result } = this.state
        return (
            <SafeAreaView style={{flex:1}}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>
                        {this._getTitle()}
                    </Text>
                </View>
                <ScrollView
                    contentContainerStyle={styles.container}
                >
                    <KeyboardAvoidingView>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: height / 20 }}>
                            <Text style={{ color: "#810000", fontSize: 30, fontWeight: 'bold' }}>Munky</Text>
                            <Text style={{ color: "#150e56", fontSize: 29, fontWeight: 'bold' }}>Box</Text>
                        </View>
                        <Text style={styles.lightText}>
                            {Lang.RegisterForm.lightText}
                        </Text>
                        <View style={styles.formContainer}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                <View style={styles.profilepic}>
                                    <Image source={{ uri: uri }} style={styles.profileimg} />
                                </View>
                                <TouchableOpacity style={styles.imagePicker} onPress={this.pickImage} >
                                    <Icon name="camera-outline" size={28} color={Colors.DARKGRAY} />
                                </TouchableOpacity>
                            </View>

                            <Input
                                containerStyle={styles.inputStyle}
                                placeholder={Lang.RegisterForm.name}
                                errorMessage={this.state.nameError}
                                displayError={this.state.nameErrorDisplay}
                                onChangeText={this.onChangeText('first_name')}
                                value={this.state.first_name}
                            />

                            <Input
                                containerStyle={styles.inputStyle}
                                placeholder={Lang.RegisterForm.surname}
                                errorMessage={this.state.surnameError}
                                displayError={this.state.nameErrorDisplay}
                                onChangeText={this.onChangeText('last_name')}
                            />
                            {
                                this.props.logintype !== 'mobile' && (
                                    <Input
                                        containerStyle={styles.inputStyle}
                                        placeholder={Lang.RegisterForm.mobile}
                                        errorMessage={this.state.mobileError}
                                        displayError={this.state.nameErrorDisplay}
                                        onChangeText={this.onChangeText('phone')}
                                    />

                                )
                            }
                            {
                                this.props.logintype !== 'email' && (
                                    <Input
                                        containerStyle={styles.inputStyle}
                                        placeholder={Lang.RegisterForm.email}
                                        errorMessage={this.state.emailError}
                                        displayError={this.state.nameErrorDisplay}
                                        onChangeText={this.onChangeText('email_id')}
                                    />

                                )
                            }
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
                <View style={styles.bottomView} >
                    <View style={styles.bottomButton} >
                        <TouchableOpacity onPress={this._nextAction} style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                            <Text style={{ fontSize: 20, color: '#810000' }} >Next</Text>
                            <Icon name="arrow-forward" size={26} color='#810000' />
                        </TouchableOpacity>
                    </View>
                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        paddingHorizontal: 10,
        height: height / 1.1

    },
    profilepic: {
        height: width / 3.8,
        width: width / 3.8,
        borderRadius: width / 7.6,
        borderWidth: 1,
        borderColor: Colors.LIGHTGRAY,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    profileimg: {
        height: width / 4,
        width: width / 4,
        borderRadius: width / 8
    },
    imagePicker: {
        position: 'absolute',
        left: width / 2,
        bottom: 0,
        backgroundColor: '#ffffffff',
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: '#c9c9c9',
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        paddingBottom: 1,
    },
    bottomView: {
        position: 'absolute',
        bottom: 10,
        right: 10

    },
    bottomButton: {
        alignSelf: "flex-end",
        flexDirection: 'row',
        paddingHorizontal: 10,
        width: 80
    },
    header: {
        height: 40,
        elevation: 2,
        borderBottomColor: '#cfcfcf',
        padding: 10,
        borderBottomWidth: 1,
        maxHeight: 80
    },
    headerText: {
        fontSize: 18
    },
    lightText: {
        fontSize: 16,
        color: Colors.DARKGRAY,
        top: 20,
        textAlign: "justify",
        width: "90%",
        alignSelf: "center",
        paddingBottom: 40
    },
});
