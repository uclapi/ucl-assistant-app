import PropTypes from "prop-types"
import React, { Component } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { connect } from "react-redux"

import Svg from "../../components/Svg"
import ApiManager from "../../lib/ApiManager"

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: `center`,
    flex: 1,
    justifyContent: `center`,
  },
  webview: {
    flex: 1,
  },
})

class LiveSeatingMapScreen extends Component {
  static navigationOptions = ({ route }) => ({
    title: route.params?.name ?? `Live Seating Map`,
  })

  static mapStateToProps = (state) => ({
    token: state.user.token,
  })

  static mapDispatchToProps = () => ({})

  static propTypes = {
    route: PropTypes.shape().isRequired,
    token: PropTypes.string.isRequired,
  }

  constructor() {
    super()
    this.state = {
      svg: null,
    }
  }

  componentDidMount() {
    const { route, token } = this.props
    const { surveyId, mapId } = route.state.params
    ApiManager.workspaces
      .getLiveImage(token, { mapId, surveyId })
      .then((base64) => {
        this.setState({ svg: base64 })
      })
  }

  render() {
    const { svg } = this.state
    if (!svg) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <Svg
        uri={svg}
        style={styles.webview}
        scrollEnabled
        bounces
        pointerEvents="auto"
      />
    )
  }
}

export default connect(
  LiveSeatingMapScreen.mapStateToProps,
  LiveSeatingMapScreen.mapDispatchToProps,
)(LiveSeatingMapScreen)
