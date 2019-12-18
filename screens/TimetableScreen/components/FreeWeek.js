import React from 'react'
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native'

import { CentredText } from "../../../components/Typography"
import { AssetManager, Random } from "../../../lib"
import Styles from "../../../styles/Containers"


const styles = StyleSheet.create({
  container: {
    alignItems: `center`,
    flex: 1,
    justifyContent: `center`,
    paddingBottom: 20,
    paddingTop: 20,
  },
  timetableImage: {
    height: 200,
    marginTop: 5,
    width: 300,
  },
})

const relaxIllustration = Random.array([
  AssetManager.undraw.relaxation,
  AssetManager.undraw.chilling,
  AssetManager.undraw.playfulCat,
  AssetManager.undraw.dogWalking,
  AssetManager.undraw.relaxingAtHome,
])

// eslint-disable-next-line react/prefer-stateless-function
class FreeWeek extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    style: {},
  }

  render() {
    const {
      style,
    } = this.props
    return (
      <View style={[styles.container, style]}>
        <CentredText>
          Nothing scheduled this week.
        </CentredText>
        <CentredText>
          Take it easy!
        </CentredText>
        <Image
          source={relaxIllustration}
          resizeMethod="scale"
          style={[Styles.image, styles.timetableImage]}
          resizeMode="contain"
        />
      </View>
    )
  }
}

export default FreeWeek
