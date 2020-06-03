import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"

import { FloatingButton, FloatingButtonProps } from "../../../components/Button"
import Colors from "../../../constants/Colors"
import type { RoomsNavigatorParamList } from "../RoomsNavigator"

interface Props extends FloatingButtonProps {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
}

class SearchButton extends React.Component<Props> {
  navigateToRoomSearch = (): void => {
    const { navigation } = this.props
    navigation.navigate(`RoomsSearch`)
  }

  render(): React.ReactElement {
    return (
      <FloatingButton
        {...this.props}
        onPress={this.navigateToRoomSearch}
        icon="magnifying-glass"
        buttonColor={Colors.accentColor}
      />
    )
  }
}

export default SearchButton
