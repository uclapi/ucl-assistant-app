import React from "react"
import { ActivityIndicator, Alert, Switch } from "react-native"
import { connect, ConnectedProps } from "react-redux"

/* import {
  registerForNotifications
} from "../../../actions/notificationsActions" */
import { Horizontal } from "../../../components/Containers"
import { BodyText, ErrorText } from "../../../components/Typography"
import { AppStateType } from "../../../configureStore"
import common from "../../../styles/common"

interface State {
  spin: boolean,
}

class NotificationSwitch extends React.Component<PropsFromRedux, State> {
  constructor(props) {
    super(props)
    this.state = {
      spin: false,
    }
  }

  onSwitchChange = async () => {
    const { registered, register, token } = this.props
    if (!registered) {
      await this.setState({ spin: true })
      Alert.alert(
        `Register for notifications?`,
        `The only information stored on our servers is a unique key`
        + ` used to send notifications to your device.`
        + ` Are you sure you want to continue?`,
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
                onValueChange={this.onSwitchChange}
                value={registered}
              />
          )}
        </Horizontal>
      </>
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    changing: state.notifications.stateChanging,
    error: state.notifications.stateChangeError,
    registered: state.notifications.registered,
    token: state.user.token,
  }),
  (dispatch) => ({
    register: (token) => dispatch(token/* registerForNotifications(token) */),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(NotificationSwitch)
