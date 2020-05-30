import React, { ReactElement } from 'react'
import {
  Image,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import { CentredText } from "../../../../components/Typography"
import { AssetManager, Random } from "../../../../lib"


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: `center`,
    paddingBottom: 20,
    paddingTop: 20,
  },
  timetableImage: {
    alignSelf: `center`,
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

const FreeWeek = ({ style }: { style?: ViewStyle, }): ReactElement => (
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

export default FreeWeek
