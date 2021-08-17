import { StyleSheet, Dimensions } from "react-native";
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export default styles = StyleSheet.create({
    btnOTP: {
        height: 50,
        width: width - 40,
        borderColor: 'black',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: 5,
    },
    mobin: {
        justifyContent: 'center',
        alignItems: 'center',
        top: -80
    },
    instructions: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    textInputContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    roundedTextInput: {
        height: 40,
        width: 40,
        borderRadius: 6,
        backgroundColor: '#fff',
        borderWidth: 1,
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20
    },
    termsCondition: {
        textAlign: 'center',
        marginBottom: 40,
        color: "#FFF",
        fontWeight: "bold",
        justifyContent: 'flex-end',
    },
    orLine: {
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        width: width/2.6,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    orText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: "#FFF",
        // textAlign: 'center'
    },
    social: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
        padding: 5,
        top: -40
    },
    skip: {
        position: 'absolute',
        top: "4%",
        right: "5%",
        backgroundColor: "#FFF",
        width: 60,
        height: 30,
        justifyContent: "center",
        alignItems: 'center',
        borderRadius: 15
    },
});
