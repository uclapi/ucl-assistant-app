/* eslint react-native/split-platform-components: 0 */
import React from "react"
import { Platform, ToastAndroid } from "react-native"
import { connect, ConnectedProps } from "react-redux"

import {
  toggleFavourite as toggleFavouriteAction,
} from "../../../actions/studyspacesActions"
import { FloatingButton } from "../../../components/Button"
import { AppStateType } from "../../../configureStore"

interface Props extends PropsFromRedux {
  id: string,
}

class FavouriteButton extends React.Component<Props> {
  componentDidUpdate(prevProps) {
    const { id = `-1`, favourites } = this.props
    const wasFavourite = prevProps.favourites.includes(id)
    const isFavourite = favourites.includes(id)
    if (!wasFavourite && isFavourite && Platform.OS === `android`) {
      ToastAndroid.show(`Added to favourites`, ToastAndroid.SHORT)
    }
  }

  render() {
    const { id = `-1`, favourites, toggleFavourite } = this.props
    const isFavourite = favourites.includes(id)
    return (
      <FloatingButton
        active={isFavourite}
        onPress={() => toggleFavourite(id)}
        icon="heart-outlined"
        activeIcon="heart"
      />
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    favourites: state.studyspaces.favourites,
  }),
  (dispatch) => ({
    toggleFavourite: (id) => dispatch(toggleFavouriteAction(id)),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(FavouriteButton)
