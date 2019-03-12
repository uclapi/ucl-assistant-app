import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

module.exports = StyleSheet.create({
  page: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  text: {
    color: Colors.pageBackground,
    textAlign: "center",
  },
  button: {
    borderColor: Colors.pageBackground,
    borderWidth: 2,
  },
  buttonText: {},
  uclapiImage: {
    marginRight: 5,
    alignSelf: "center",
    marginTop: 0,
    height: 20,
    flexGrow: 0,
    flexBasis: 20,
  },
  disclaimer: {
    marginTop: 20,
  },
  disclaimerText: {
    color: Colors.cardBackground,
  },
  disclaimerLink: {
    color: Colors.cardBackground,
    textDecorationLine: "underline",
  },
});
