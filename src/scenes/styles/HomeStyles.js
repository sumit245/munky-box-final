import { StyleSheet, Dimensions } from "react-native";
export const width = Dimensions.get("window").width;
export const height = Dimensions.get("window").height;
export const styles = StyleSheet.create({
    cuisine: {
        justifyContent: 'flex-start',
        width: 80,
        marginBottom: 10,
        marginTop:10,
      },
      cuisine_name: {
        fontSize: 14,
        textAlign: 'center',
        color: '#000',
      },
      header: {
        flexDirection: "row",
        justifyContent: "space-between",
        height: 32,
        marginHorizontal:6,
        marginBottom:6
      },
})