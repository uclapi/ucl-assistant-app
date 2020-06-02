import React from 'react'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native"

import Colors from "../../constants/Colors"

const styles = StyleSheet.create({
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
    paddingBottom: 60,
  },
})

interface Props {
  children: React.ReactNode,
  style?: ViewStyle,
  keyboardAvoidingViewStyle?: ViewStyle,
}

const PageNoScroll: React.FC<Props> = ({
  children,
  style,
  keyboardAvoidingViewStyle,
}) => (
    <SafeAreaView style={styles.pageContainer}>
      <KeyboardAvoidingView
        style={StyleSheet.flatten([
          styles.pageContainer,
          keyboardAvoidingViewStyle,
        ])}
        behavior="padding"
      >
        <View style={[styles.page, style]}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
)

export default PageNoScroll
