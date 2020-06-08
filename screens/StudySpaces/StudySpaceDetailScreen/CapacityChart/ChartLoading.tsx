import Lottie from "lottie-react-native"
import React from "react"
import { StyleSheet, View } from "react-native"

import { BodyText } from "../../../../components/Typography"
import Colors from "../../../../constants/Colors"

const styles = StyleSheet.create({
  chartLoading: {
    alignItems: `center`,
    backgroundColor: Colors.textInputBackground,
    flexDirection: `column`,
    height: 200,
    justifyContent: `center`,
  },
  lottie: {
    height: 200,
    width: 200,
  },
  text: {
    bottom: 75,
    position: `relative`,
  },
})

interface State {
  animation: {
    uri: string,
  },
}

class ChartLoading extends React.Component<unknown, State> {
  private animationRef = React.createRef<Lottie>()

  constructor(props) {
    super(props)
    this.state = {
      animation: null,
    }
  }

  componentDidMount(): void {
    this.playAnimation()
  }

  playAnimation = (): void => {
    const { animation } = this.state
    if (!animation) {
      this.loadAnimation()
    } else {
      this.animationRef.current.reset()
      this.animationRef.current.play()
    }
  }

  loadAnimation = (): void => {
    this.setState({
      animation: require(`../../../../assets/animations/bar-chart.json`),
    }, this.playAnimation)
  }

  render(): React.ReactElement {
    const { animation } = this.state
    return (
      <View
        style={styles.chartLoading}
      >
        {animation && (
          <Lottie
            ref={this.animationRef}
            loop
            style={styles.lottie}
            source={animation}
          />
        )}
        <BodyText style={styles.text}>
          Loading chart...
        </BodyText>
      </View>
    )
  }
}

export default ChartLoading
