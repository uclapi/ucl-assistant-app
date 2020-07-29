import type { RouteProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { Page } from "../../../components/Containers"
import RecentResults from "../RoomsFavouritesScreen/RecentResults"
import type { RoomsNavigatorParamList } from "../RoomsNavigator"
import SearchControl from "./SearchControl"

interface Props {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
  // eslint-disable-next-line quotes
  route: RouteProp<RoomsNavigatorParamList, 'RoomsSearch'>,
}

const RoomsSearchScreen: React.FC<Props> = ({
  navigation,
  route,
}) => (
  <Page>
    <SearchControl navigation={navigation} route={route} />
    <RecentResults navigation={navigation} />
  </Page>
)

export default RoomsSearchScreen
