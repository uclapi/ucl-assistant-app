import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
} from "react-native"

import Colors from "../constants/Colors"
import { BORDER_RADIUS } from "../constants/styleConstants"
import Shadow from "../lib/Shadow"

const { height, width } = Dimensions.get(`window`)

const cardShared = {
  alignSelf: `stretch`,
  backgroundColor: Colors.cardBackground,
  borderRadius: BORDER_RADIUS,
  marginBottom: 5,
  marginLeft: Platform.OS === `ios` ? 1 : 0,
  marginRight: Platform.OS === `ios` ? 1 : 0,
  ...Shadow(3),
  marginTop: 5,
  padding: 10,
}

export default StyleSheet.create({
  app: {
    backgroundColor: Colors.pageBackground,
    flex: 1,
  },
  card: StyleSheet.flatten([
    cardShared,
    {
      flexDirection: `column`,
    },
  ]),
  circle: {
    borderColor: Colors.textColor,
    borderRadius: 5,
    borderWidth: 1,
    height: 10,
    width: 10,
  },
  circularIcon: {
    backgroundColor: Colors.textInputBackground,
    borderRadius: 80,
    marginRight: 10,
    padding: 10,
  },
  horizontal: {
    alignItems: `center`,
    flexDirection: `row`,
    justifyContent: `center`,
  },
  image: {
    alignSelf: `stretch`,
    backgroundColor: `rgba(0,0,0,0)`,
    flex: 1,
    height: undefined,
    marginTop: 50,
    width: undefined,
  },
  liveIndicator: {
    borderRadius: 5,
    flex: 0,
    marginRight: 5,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  mainTab: {

  },
  mainTabBlur: {
    bottom: 0,
    height: 60,
    left: 0,
    right: 0,
    top: undefined,
  },
  oldCard: StyleSheet.flatten([
    cardShared,
    {
      backgroundColor: Colors.oldCardBackground,
      flexDirection: `column`,
    },
  ]),
  paddedIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
  page: {
    backgroundColor: Colors.pageBackground,
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
  },
  pageContainer: {
    backgroundColor: Colors.pageBackground,
    flex: 1,
    flexDirection: `column`,
    height,
    width,
  },
  pageNoScrollContainer: {
    paddingTop: 10,
  },
  pageScrollContent: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  pageScrollView: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  resultCard: StyleSheet.flatten([
    cardShared,
    {
      marginBottom: 10,
      marginLeft: 2,
      marginRight: 2,
      marginTop: 5,
    },
  ]),
  spacer: {
    flex: 1,
  },
})
