import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export const avatarSize = 0.3 * width;
export const styles = StyleSheet.create({
  headerImage: {
    width: width,
    height: 0.5 * width,
  },
  avatarImage: {
    width: 0.3 * width,
    height: 0.3 * width,
    borderRadius: 0.15 * width,
    borderWidth: 2,
    borderColor: "#fcfcfc",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: -0.14 * width,
  },
  chefName: {
    color: "#444",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  about: {
    margin: 5,
    borderRadius: 5,
    backgroundColor: "white",
    shadowOffset: { width: 2, height: 2 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 2,
    padding: 5,
  },
  ratingAndReviews: {
    alignItems: "center",
    marginVertical: 8,
    justifyContent: "center",
    flexDirection: "row",
  },
  menuItem: {
    borderRadius: 5,
    backgroundColor:"#fff",
    elevation: 2,
    padding: 1,
    margin: 2,
  },
  menuImage: {
    width: "100%",
    height: 180,
    marginHorizontal: 1,
    resizeMode: "cover",
  },
  menuTitle: {
    paddingHorizontal: 2,
    marginLeft: -26,
    fontSize: 16,
    fontWeight: "bold",
  },
  optioncard: {
    height: 150,
    width: 200,
    margin: 4,
    borderRadius: 4,
    elevation: 2,
    padding: 2,
  },
  cardcontent: {
    fontSize: 14,
    textAlign: "left",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 6,
    color: "#444",
  },
  planCard: {
    paddingVertical: 15,
    height: 70,
    borderRadius: 5,
    elevation: 2,
    margin: 4,
  },
  planBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 8,
  },
  selectoffer: {
    backgroundColor: "#2e7d32",
    height: 30,
    paddingHorizontal: 10,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
