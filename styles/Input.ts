import { StyleSheet } from "react-native"

import Colors from "../constants/Colors"
import typographyStyle from "./Typography"

export const style = {
  inputFrame: {
    backgroundColor: Colors.textInputBackground,
    borderColor: Colors.lightTextColor,
    borderRadius: 10,
    height: 50,
    marginBottom: 10,
    marginLeft: 2,
    marginRight: 2,
    marginTop: 10,
    minWidth: 200,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
  },
}

export default StyleSheet.create({
  inputFrame: style.inputFrame,
  textInput: StyleSheet.flatten([typographyStyle.bodyText, style.inputFrame]),
})
