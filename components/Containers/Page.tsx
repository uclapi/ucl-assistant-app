import React from "react"
import {
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  ViewStyle,
} from "react-native"

import Colors from "../../constants/Colors"

const styles = StyleSheet.create({
  pageContainer: {
    backgroundColor: Colors.pageBackground,
    flex: 1,
    flexDirection: `column`,
  },
  pageScrollContent: {
    paddingBottom: 60,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
  },
  pageScrollView: {
    backgroundColor: Colors.pageBackground,
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
  },
  pageTopPadding: { height: 10 },
  safeAreaView: {
    flex: 1,
  },
  safeAreaViewTop: {
    flex: 0,
  },
})

interface Props {
  children: React.ReactNode,
  style?: ViewStyle,
  safeAreaViewStyle?: ViewStyle,
  keyboardAvoidingViewStyle?: ViewStyle,
  contentContainerStyle?: ViewStyle,
  refreshEnabled?: boolean,
  onRefresh?: () => void,
  refreshing?: boolean,
  topColour?: string,
}

const Page: React.FC<Props> = ({
  children,
  style,
  safeAreaViewStyle,
  keyboardAvoidingViewStyle,
  contentContainerStyle,
  refreshEnabled = false,
  onRefresh = () => { },
  refreshing = false,
  topColour = Colors.pageBackground,
}) => (
    <>
      <SafeAreaView style={
        StyleSheet.flatten([
          styles.safeAreaViewTop,
          { backgroundColor: topColour },
        ])
      }
      />
      <SafeAreaView style={StyleSheet.flatten([
        styles.safeAreaView,
        safeAreaViewStyle,
      ])}
      >
        <KeyboardAvoidingView
          style={StyleSheet.flatten([
            styles.pageContainer,
            keyboardAvoidingViewStyle,
          ])}
          behavior="padding"
          keyboardVerticalOffset={
            Platform.OS === `android` ? StatusBar.currentHeight : 0
          }
        >
          <ScrollView
            contentContainerStyle={[
              styles.pageScrollContent,
              contentContainerStyle,
            ]}
            style={[styles.pageScrollView, style]}
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
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )

export default Page
