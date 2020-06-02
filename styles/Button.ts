import { StyleSheet } from "react-native"

import Colors from "../constants/Colors"

const buttonStyle = {
  borderRadius: 8,
  elevation: 2,
  minHeight: 55,
  minWidth: 150,
  padding: 8,
  paddingLeft: 16,
  paddingRight: 16,
  shadowColor: Colors.accentColor,
  shadowOffset: { height: 2, width: 0 },
  shadowOpacity: 0.75,
  shadowRadius: 3,
}

export default StyleSheet.create({
  button: StyleSheet.flatten([
    buttonStyle,
    {
      alignItems: `center`,
      flexDirection: `row`,
      justifyContent: `center`,
      marginBottom: 5,
      marginTop: 5,
    },
  ]),
  buttonWrapper: {
    borderRadius: 8,
    flex: 1,
    justifyContent: `center`,
  },
  disabled: {
    backgroundColor: Colors.disabledButtonBackground,
  },
  roundButton: StyleSheet.flatten([
    buttonStyle,
    {
      alignItems: `center`,
      borderRadius: 30,
      flexDirection: `row`,
      justifyContent: `center`,
      minWidth: 55,
    },
  ]),
  roundButtonWrapper: {
    borderRadius: 100,
    height: 55,
    marginBottom: 5,
    marginTop: 5,
    overflow: `hidden`,
    width: 55,
  },
  smallButton: StyleSheet.flatten([
    buttonStyle,
    {
      alignItems: `center`,
      flexDirection: `row`,
      justifyContent: `center`,
      marginBottom: 5,
      marginTop: 5,
      minHeight: 30,
      minWidth: 90,
    },
  ]),
})
