import { StyleSheet, Dimensions, StatusBar } from "react-native";
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export default styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: StatusBar.currentHeight,
    justifyContent: "space-between",
  },
  btnOTP: {
    height: 50,
    width: width - 40,
    borderColor: "black",
    borderWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  mobin: {
    alignItems: "center",
  },
  instructions: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  textInputContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  roundedTextInput: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: "#fff",
    borderWidth: 1,
  },
  buttonWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  termsCondition: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center"
  },
  orLine: {
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    width: width / 2.6,
    alignSelf: "center",
  },
  orText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  skip: {
    backgroundColor: "#FFF",
    justifyContent: "center",
    paddingHorizontal: 8,
    height: 24,
    width: 60,
    borderRadius: 15,
  },
  social: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  smallButton: {
    backgroundColor: "white",
    height: 50,
    flexDirection: "row",
    width: width / 2 - 26,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 5,
  },
});
