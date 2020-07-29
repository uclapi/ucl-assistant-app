import { StackNavigationProp } from "@react-navigation/stack"
import React, { useCallback } from "react"
import { FloatingButton, FloatingButtonProps } from "../../../components/Button"
import Colors from "../../../constants/Colors"
import type { RoomsNavigatorParamList } from "../RoomsNavigator"

interface Props extends FloatingButtonProps {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
}

const SearchButton: React.FC<Props> = ({
  navigation,
  ...otherProps
}) => {
  const navigateToRoomSearch = useCallback(
    () => navigation.navigate(`RoomsSearch`),
    [navigation],
  )
  return (
    <FloatingButton
      {...otherProps}
      onPress={navigateToRoomSearch}
      icon="magnifying-glass"
      buttonColor={Colors.accentColor}
    />
  )
}

export default SearchButton
