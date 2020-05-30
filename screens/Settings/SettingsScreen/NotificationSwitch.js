import PropTypes from "prop-types"
import React, { Component } from "react"
import { ActivityIndicator, Alert, Switch } from "react-native"
import { connect } from "react-redux"

// import { registerForNotifications } from "../../../actions/notificationsActions"
import { Horizontal } from "../../../components/Containers"
import { BodyText, ErrorText } from "../../../components/Typography"
import common from "../../../styles/common"

class NotificationSwitch extends Component {
  static mapStateToProps = (state) => ({
    changing: state.notifications.stateChanging,
    error: state.notifications.stateChangeError,
    registered: state.notifications.registered,
    token: state.user.token,
  })

  static mapDispatchToProps = (dispatch) => ({
    register: (token) => dispatch(token/* registerForNotifications(token) */),
  })

  static propTypes = {
    changing: PropTypes.bool,
    error: PropTypes.string,
    register: PropTypes.func,
    registered: PropTypes.bool,
    token: PropTypes.string,
  }

  static defaultProps = {
    changing: false,
    error: ``,
    register: () => { },
    registered: false,
    token: ``,
  }

  // state = {
  //   spin: false,
  // }

  async onSwitchChange() {
    const { registered, register, token } = this.props
    if (!registered) {
      await this.setState({ spin: true })
      Alert.alert(
        `Register for notifications?`,
        `The only information stored on our servers is a unique key used to send notifications to your device. Are you sure you want to continue?`,
        [
          {
            onPress: () => this.setState({ spin: false }),
            style: `cancel`,
            text: `Cancel`,
          },
          {
            onPress: () => {
              this.setState({ spin: false })
              register(token)
            },
            text: `Continue`,
          },
        ],
      )
    } else {
      // not yet implemented on API
      this.setState({ spin: false })
      Alert.alert(
        `Can't yet unregister notifications.`,
        `Can't yet unregister for notifications.`,
      )
    }
  }

  render() {
    const { registered, changing, error } = this.props
    const { spin } = this.state
    return (
      <>
        {error.length > 0 && (
          <ErrorText>
            Error:
            {error}
          </ErrorText>
        )}
        <Horizontal>
          <BodyText style={common.flex}>Enable notifications</BodyText>
          {changing || spin ? (
            <ActivityIndicator />
          ) : (
            <Switch
              onValueChange={(b) => this.onSwitchChange(b)}
              value={registered}
            />
          )}
        </Horizontal>
      </>
    )
  }
}

export default connect(
  NotificationSwitch.mapStateToProps,
  NotificationSwitch.mapDispatchToProps,
)(NotificationSwitch)
