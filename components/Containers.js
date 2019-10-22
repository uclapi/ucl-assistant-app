/* eslint react/require-default-props: 0 */
import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from "react"
import {
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  ViewPropTypes,
} from "react-native"

import Colors from "../constants/Colors"
import Styles from "../styles/Containers"

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  bottomColour: PropTypes.string,
  children: PropTypes.node,
  contentContainerStyle: ViewPropTypes.style,
  keyboardAvoidingViewStyle: ViewPropTypes.style,
  mainTabPage: PropTypes.bool,
  onRefresh: PropTypes.func,
  refreshEnabled: PropTypes.bool,
  refreshing: PropTypes.bool,
  safeAreaViewStyle: ViewPropTypes.style,
  style: ViewPropTypes.style,
  topColour: PropTypes.string,
}
/* eslint-enable react/no-unused-prop-types */
const defaultProps = {
  bottomColour: Colors.pageBackground,
  children: ``,
  contentContainerStyle: {},
  keyboardAvoidingViewStyle: {},
  mainTabPage: false,
  onRefresh: () => { },
  refreshEnabled: false,
  refreshing: false,
  safeAreaViewStyle: {},
  style: {},
  topColour: Colors.pageBackground,
}

const pageTopPadding = { height: 10 }

const styles = StyleSheet.create({
  safeAreaViewTop: {
    flex: 0,
  },
})

export const Page = ({
  children,
  style,
  safeAreaViewStyle,
  keyboardAvoidingViewStyle,
  contentContainerStyle,
  refreshEnabled,
  onRefresh,
  refreshing,
  mainTabPage,
  topColour,
  bottomColour,
  ...props
}) => (
    <>
      <SafeAreaView style={[styles.safeAreaViewTop, { backgroundColor: topColour }]} />
      <SafeAreaView style={[
        Styles.pageContainer,
        safeAreaViewStyle,
      ]}
      >
        <KeyboardAvoidingView
          style={[
            Styles.pageContainer,
            mainTabPage ? Styles.mainTab : null,
            keyboardAvoidingViewStyle,
          ]}
          {...props}
          behavior="padding"
        >
          <ScrollView
            contentContainerStyle={[Styles.pageScrollContent, contentContainerStyle]}
            style={[Styles.page, Styles.pageScrollView, style]}
            refreshControl={
              refreshEnabled ? (
                <RefreshControl
                  enabled={refreshEnabled}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                />
              ) : null
            }
            keyboardDismissMode="on-drag"
          >
            <View style={pageTopPadding} />
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
)
Page.propTypes = propTypes
Page.defaultProps = defaultProps

export const PageNoScroll = ({ children, style, ...props }) => (
  <SafeAreaView style={[Styles.pageContainer]}>
    <KeyboardAvoidingView
      style={[Styles.pageContainer, Styles.pageNoScrollContainer]}
      {...props}
      behavior="padding"
    >
      <View style={[Styles.page, style]}>{children}</View>
    </KeyboardAvoidingView>
  </SafeAreaView>
)
PageNoScroll.propTypes = propTypes
PageNoScroll.defaultProps = defaultProps

export const Spacer = () => <View style={Styles.spacer} />

export const Horizontal = ({ children, style }) => (
  <View style={[Styles.horizontal, style]}>{children}</View>
)
Horizontal.propTypes = propTypes
Horizontal.defaultProps = defaultProps

export const PaddedIcon = (props) => (
  <Feather {...props} style={Styles.paddedIcon} />
)
PaddedIcon.propTypes = Feather.propTypes
PaddedIcon.defaultProps = Feather.defaultProps

export const CircularIcon = (props) => (
  <View style={Styles.circularIcon}>
    <Feather {...props} />
  </View>
)
CircularIcon.propTypes = Feather.propTypes
CircularIcon.defaultProps = Feather.defaultProps

export default {}
