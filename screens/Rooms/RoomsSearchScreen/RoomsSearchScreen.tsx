
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"

import { Page } from "../../../components/Containers"
import RecentResults from "../RoomsFavouritesScreen/RecentResults"
import type { RoomsNavigatorParamList } from "../RoomsNavigator"
import SearchControl from "./SearchControl"

interface Props {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
}

class RoomsSearchScreen extends React.Component<Props> {
  static navigationOptions = {
    title: `Rooms`,
  }

  render(): React.ReactElement {
    const { navigation } = this.props
    return (
      <Page>
        <SearchControl navigation={navigation} />
        <RecentResults navigation={navigation} />
      </Page>
    )
  }
}

export default RoomsSearchScreen
