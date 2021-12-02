import { StatusBar, StyleSheet } from "react-native";
import { width } from "./AuthStyle";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    padding: 2,
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor: "#FFF",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  headersubtitle: {
    fontSize: 14,
    color: "#777",
  },
  tab: {
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    width: width / 3,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 4,
    marginHorizontal: 2,
    backgroundColor: "#FFF",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    borderBottomWidth:1,
    borderBottomColor:"#ddd"
  },
  title: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "bold",
  },
  optionCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 1,
    elevation: 2,
    borderRadius: 4,
  },
  typelogo: {
    padding: 2,
    marginRight: 4,
  },
  timing: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
  },
  address: {
    color: "#777",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  btn: {
    width: width / 2.2,
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 4,
    // marginRight: 10,
  },
});
