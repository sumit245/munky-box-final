import { StatusBar, StyleSheet } from "react-native";
import { width } from "./AuthStyle";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    backgroundColor: "#ddd",
    marginHorizontal: 1,
    width: width - 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    justifyContent: "space-between",
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
    backgroundColor: "#FFF",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "bold",
    flexWrap:"wrap",
    alignItems:"flex-start",
    flexShrink:1
  },
  subtitle: {
    fontSize: 12,
    marginLeft: 4,
    fontWeight: "bold",
  },
  optionCard: {
    backgroundColor: "#fff",
    padding: 10,
    width: width - 4,
    marginHorizontal: 1,
    marginVertical: 8,
    elevation: 2,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#ddd",
  },
  typelogo: {
    padding: 2,
    marginRight: 4,
  },
  timing: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  address: {
    color: "#777",
    fontSize: 14,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  btn: {
    width: width / 2.4,
    borderColor: "#bbb",
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: 4,
  },
});
