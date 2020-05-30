import DateTimerPicker from "@react-native-community/datetimepicker"
import { BlurView } from "expo-blur"
import PropTypes from "prop-types"
import React from "react"
import { momentObj } from "react-moment-proptypes"
import {
  Modal, Platform, StyleSheet, View,
} from 'react-native'

import Button, { RoundButton } from "../../../../components/Button"
import { Horizontal } from "../../../../components/Containers"
import { LocalisationManager } from "../../../../lib"

const styles = StyleSheet.create({
  buttonContainer: { alignItems: `center` },
  dateControls: {
    justifyContent: `space-around`,
    width: `100%`,
  },
  iosPicker: { width: `100%` },
  modal: {
    alignItems: `center`,
    backgroundColor: `#fff`,
    flex: 1,
    justifyContent: `center`,
  },
})

class DateControls extends React.Component {
  static propTypes = {
    date: momentObj,
    onDateChanged: PropTypes.func,
    onIndexChanged: PropTypes.func,
  }

  static defaultProps = {
    date: LocalisationManager.getMoment().startOf(`week`),
    onDateChanged: () => { },
    onIndexChanged: () => { },
  }

  constructor(props) {
    super(props)
    this.state = {
      isDatePickerVisible: false,
    }
  }

  dismissDatePicker = () => this.setState({ isDatePickerVisible: false })

  onDatePickerAction = ({ type, nativeEvent: { timestamp } }) => {
    if (type === `dismissed`) {
      return this.dismissDatePicker()
    }
    const { onDateChanged } = this.props
    onDateChanged(LocalisationManager.parseToMoment(timestamp))

    if (Platform.OS === `android`) {
      this.dismissDatePicker()
    } else {
      return null
    }
  }

  onIndexChanged = (change) => () => {
    const { onIndexChanged } = this.props
    onIndexChanged(change)
  }

  showDatePicker = () => this.setState({ isDatePickerVisible: true })

  renderDatePicker = () => {
    const { isDatePickerVisible } = this.state
    if (!isDatePickerVisible) {
      return null
    }
    const { date } = this.props
    if (Platform.OS === `ios`) {
      return (
        <Modal
          animationType="fade"
          transparent
          presentationStyle="overFullScreen"
          visible
        >
          <BlurView style={styles.modal} intensity={100}>
            <DateTimerPicker
              mode="date"
              onChange={this.onDatePickerAction}
              value={date.toDate()}
              locale="en-GB"
              style={styles.iosPicker}
            />
            <View style={styles.buttonContainer}>
              <Button onPress={this.dismissDatePicker}>Done</Button>
            </View>
          </BlurView>
        </Modal>
      )
    }
    if (Platform.OS === `android`) {
      return (
        <DateTimerPicker
          mode="date"
          display="calendar"
          onChange={this.onDatePickerAction}
          value={date.toDate()}
        />
      )
    }
    return null
  }

  render() {
    return (
      <Horizontal style={styles.dateControls}>
        <RoundButton
          onPress={this.onIndexChanged(-1)}
          icon="chevron-left"
        />
        {this.renderDatePicker()}
        <Button onPress={this.showDatePicker}>
          Jump To Date
        </Button>
        <RoundButton
          onPress={this.onIndexChanged(1)}
          icon="chevron-right"
        />
      </Horizontal>
    )
  }
}

export default DateControls
