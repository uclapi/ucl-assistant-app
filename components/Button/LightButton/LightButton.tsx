import React from 'react'
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'

import Colors from '../../../constants/Colors'
import { SmallButtonText } from '../../Typography'

interface StyleSheetType {
  active: TextStyle,
  activeText: TextStyle,
  lightButton: ViewStyle,
  text: TextStyle
}

const styles = StyleSheet.create<StyleSheetType>({
  active: {
    backgroundColor: Colors.accentColor,
  },
  activeText: {
    color: Colors.pageBackground,
  },
  lightButton: {
    backgroundColor: Colors.pageBackground,
    borderColor: Colors.textColor,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  text: {
    color: Colors.textColor,
  },
})

interface Props {
  style: any,
  children: any,
  active: boolean,
  onPress: () => void
}

const LightButton: React.FC<Props> = ({
  onPress,
  style,
  children,
  active,
}) => (
    <TouchableOpacity
      style={style}
      onPress={(e) => setTimeout(onPress, 200, e)}
    >
      <View style={[styles.lightButton, active ? styles.active : {}]}>
        {
          (typeof children === `string`) ? (
            <SmallButtonText
              style={[
                styles.text,
                active ? styles.activeText : {},
              ]}
            >
              {children}
            </SmallButtonText>
          ) : children
        }
      </View>
    </TouchableOpacity>
  )

LightButton.defaultProps = {
  active: false,
  children: ``,
  onPress: () => { },
  style: {},
}


export default LightButton
