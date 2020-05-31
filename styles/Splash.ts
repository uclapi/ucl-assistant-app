import { StyleSheet } from "react-native"

import Colors from "../constants/Colors"

const SplashStyle = StyleSheet.create({
  button: {
    borderColor: Colors.pageBackground,
    borderWidth: 2,
  },
  buttonText: {},
  disclaimer: {
    flexDirection: `row`,
    flexWrap: `wrap`,
    marginTop: 20,
  },
  disclaimerLink: {
    color: Colors.cardBackground,
    textDecorationLine: `underline`,
  },
  disclaimerText: {
    color: Colors.cardBackground,
  },
  page: {
    paddingBottom: 20,
    paddingTop: 60,
  },
  text: {
    color: Colors.pageBackground,
    textAlign: `center`,
  },
  uclapiImage: {
    alignSelf: `center`,
    flexBasis: 20,
    flexGrow: 0,
    height: 20,
    marginRight: 5,
    marginTop: 0,
  },
})

export default SplashStyle
