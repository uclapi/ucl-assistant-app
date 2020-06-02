/* eslint react-native/no-inline-styles: 0 */
import React from "react"
import { ActivityIndicator, View } from "react-native"

import Colors from "../../constants/Colors"
import Styles from "../../styles/Containers"

interface Props {
  color?: string,
  loading?: boolean,
}

const Indicator: React.FC<Props> = ({
  color = Colors.textInputBackground,
  loading = false,
}) => {
  const children = loading ? <ActivityIndicator size={8} /> : null
  return (
    <View
      style={[
        Styles.circle,
        {
          backgroundColor: loading ? Colors.textInputBackground : color,
          left: 44,
          position: `absolute`,
          top: 40,
        },
      ]}
    >
      {children}
    </View>
  )
}

export default Indicator
