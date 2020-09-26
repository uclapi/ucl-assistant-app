import React, { useCallback } from 'react'
import { Switch, ViewStyle } from 'react-native'

interface Props {
  value: boolean,
  onValueChange: (b: boolean) => void,
  testID?: string,
  style?: ViewStyle,
}

const CheckBox: React.FC<Props> = ({ value, onValueChange, ...props }) => {
  const onPress = useCallback(() => onValueChange(!value), [onValueChange, value])
  return (
    <Switch
      onValueChange={onPress}
      value={value}
      {...props}
    />
  )
}

export default CheckBox
