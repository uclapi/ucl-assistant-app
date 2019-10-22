/* eslint react-native/no-inline-styles: 0 */
import Lottie from "lottie-react-native"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

import { BodyText } from "../../../components/Typography"
import Colors from "../../../constants/Colors"

const styles = StyleSheet.create({
  chartLoading: {
    alignItems: `center`,
    backgroundColor: Colors.textInputBackground,
    flexDirection: `column`,
    height: 200,
    justifyContent: `center`,
  },
})

class ChartLoading extends Component {
  constructor() {
    super()
    this.state = {
      animation: null,
    }
  }

  componentDidMount() {
    this.playAnimation()
  }

  playAnimation = () => {
    const { animation } = this.state
    if (!animation) {
      this.loadAnimation()
    } else {
      this.animationRef.reset()
      this.animationRef.play()
    }
  }

  loadAnimation = () => {
    const animation = require(`../../../assets/animations/bar-chart.json`)

    this.setState({ animation }, this.playAnimation)
  }

  render() {
    const { animation } = this.state
    return (
      <View
        style={styles.chartLoading}
      >
        {animation && (
          <Lottie
            ref={(animRef) => {
              this.animationRef = animRef
            }}
            loop
            style={{ height: 200, width: 200 }}
            source={animation}
          />
        )}
        <BodyText style={{ bottom: 75, position: `relative` }}>
          Loading chart...
        </BodyText>
      </View>
    )
  }
}

export default ChartLoading
