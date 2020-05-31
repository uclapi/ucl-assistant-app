import { StyleSheet } from "react-native"

import Color from "../constants/Colors"

export const style = StyleSheet.create({
  baseStyle: {
    color: Color.textColor,
    fontFamily: `apercu`,
    fontSize: 16,
    marginBottom: 1,
    marginTop: 1,
  },
  buttonText: {
    color: Color.pageBackground,
    fontSize: 20,
    textAlign: `center`,
  },
  cardTitle: {
    color: Color.accentColor,
    marginBottom: 0,
    marginTop: 0,
  },
  centredText: {
    color: Color.lightTextColor,
    marginBottom: 5,
    marginTop: 5,
    textAlign: `center`,
  },
  errorText: {
    color: Color.errorColor,
  },
  header: {
    fontFamily: `apercu-light`,
    fontSize: 28,
    marginBottom: 10,
  },
  infoText: {
    color: Color.infoColor,
  },
  infoTextContainer: {
    alignContent: `center`,
    alignItems: `center`,
    flexDirection: `row`,
    marginTop: 5,
  },
  informational: {
    flex: 1,
    marginLeft: 5,
    marginTop: -1,
  },
  searchResultBottomText: {
    color: Color.lightTextColor,
    fontStyle: `italic`,
    marginTop: 0,
  },
  searchResultTopText: {
    fontFamily: `apercu-bold`,
    marginBottom: 0,
  },
  smallButtonText: {
    flex: 1,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 28,
    marginBottom: 2,
    marginTop: 8,
  },
  title: {
    fontFamily: `apercu-bold`,
    fontSize: 35,
    marginBottom: 10,
  },
  warningText: {
    color: Color.warningColor,
  },
})

export default StyleSheet.create({
  bodyText: StyleSheet.flatten([style.baseStyle]),
  bold: {
    fontWeight: `bold`,
  },
  buttonText: StyleSheet.flatten([style.baseStyle, style.buttonText]),
  cardTitle: StyleSheet.flatten([
    style.baseStyle,
    style.title,
    style.subtitle,
    style.cardTitle,
  ]),
  cardTitleRect: {
    backgroundColor: Color.accentColor,
    height: 5,
    marginBottom: 5,
    marginLeft: 2,
    width: 30,
  },
  centredText: StyleSheet.flatten([style.baseStyle, style.centredText]),
  errorText: StyleSheet.flatten([
    style.baseStyle,
    style.informational,
    style.errorText,
  ]),
  headerText: StyleSheet.flatten([style.baseStyle, style.header]),
  infoText: StyleSheet.flatten([
    style.baseStyle,
    style.informational,
    style.infoText,
  ]),
  infoTextContainer: StyleSheet.flatten([style.infoTextContainer]),
  searchResultBottomText: StyleSheet.flatten([
    style.baseStyle,
    style.searchResultBottomText,
  ]),
  searchResultTopText: StyleSheet.flatten([
    style.baseStyle,
    style.searchResultTopText,
  ]),
  small: {
    fontSize: 12,
  },
  smallButtonText: StyleSheet.flatten([
    style.baseStyle,
    style.buttonText,
    style.smallButtonText,
  ]),
  subtitleText: StyleSheet.flatten([
    style.baseStyle,
    style.title,
    style.subtitle,
  ]),
  titleText: StyleSheet.flatten([style.baseStyle, style.title]),
  warningText: StyleSheet.flatten([
    style.baseStyle,
    style.informational,
    style.warningText,
  ]),
})
