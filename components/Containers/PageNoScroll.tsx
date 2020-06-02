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
  },
  pageNoScrollContainer: {
    paddingTop: 10,
  },
})

interface Props {
  children: React.ReactNode,
  style?: ViewStyle,
}

const PageNoScroll: React.FC<Props> = ({
  children,
  style,
  ...props
}) => (
    <SafeAreaView style={styles.pageContainer}>
      <KeyboardAvoidingView
        style={[
          styles.pageContainer,
          styles.pageNoScrollContainer,
        ]}
        {...props}
        behavior="padding"
      >
        <View style={[styles.page, style]}>{children}</View>
      </KeyboardAvoidingView>
    </SafeAreaView>
)

export default PageNoScroll
