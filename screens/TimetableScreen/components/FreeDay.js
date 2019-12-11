import PropTypes from "prop-types"
import React from 'react'
import { momentObj } from "react-moment-proptypes"
import {
  Image,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native'

import { CentredText } from "../../../components/Typography"
import { AssetManager, LocalisationManager, Random } from "../../../lib"
import Styles from "../../../styles/Containers"


const styles = StyleSheet.create({
  timetableImage: {
    height: 200,
    marginTop: 5,
    width: 300,
  },
  topPadding: {
    height: 50,
  },
})

const relaxIllustration = Random.array([
  AssetManager.undraw.relaxation,
  AssetManager.undraw.chilling,
  AssetManager.undraw.playfulCat,
  AssetManager.undraw.dogWalking,
  AssetManager.undraw.relaxingAtHome,
])

class FreeDay extends React.Component {
  static propTypes = {
    date: momentObj,
    renderBottom: PropTypes.func,
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    date: LocalisationManager.getMoment(),
    renderBottom: () => null,
    style: {},
  }

  renderDate = () => {
    const { date } = this.props
    return date.format(`dddd`)
  }

  render() {
    const {
      style,
      renderBottom,
    } = this.props
    return (
      <View style={style}>
        <View style={styles.topPadding} />
        <CentredText>
          Nothing scheduled on&nbsp;
          {this.renderDate()}
          . Take it easy!
        </CentredText>
        <Image
          source={relaxIllustration}
          resizeMethod="scale"
          style={[Styles.image, styles.timetableImage]}
          resizeMode="contain"
        />
        {renderBottom()}
      </View>
    )
  }
}

export default FreeDay
