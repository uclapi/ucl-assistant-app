import PropTypes from "prop-types"
import React from "react"
import { momentObj } from "react-moment-proptypes"
import { StyleSheet } from 'react-native'
import DateTimerPicker from "react-native-modal-datetime-picker"

import Button, { RoundButton } from "../../../components/Button"
import { Horizontal } from "../../../components/Containers"
import { LocalisationManager } from "../../../lib"

const styles = StyleSheet.create({
  dateControls: {
    justifyContent: `space-around`,
    width: `100%`,
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

  onDatePickerConfirm = (date) => {
    const { onDateChanged } = this.props
    onDateChanged(LocalisationManager.parseToMoment(date))
    this.setState({ isDatePickerVisible: false })
  }

  onIndexChanged = (change) => () => {
    const { onIndexChanged } = this.props
    onIndexChanged(change)
  }

  showDatePicker = () => this.setState({ isDatePickerVisible: true })

  hideDatePicker = () => this.setState({ isDatePickerVisible: false })

  render() {
    const { date } = this.props
    const { isDatePickerVisible } = this.state
    return (
      <Horizontal style={styles.dateControls}>
        <RoundButton
          onPress={this.onIndexChanged(-1)}
          icon="chevron-left"
        />
        <DateTimerPicker
          isVisible={isDatePickerVisible}
          onConfirm={this.onDatePickerConfirm}
          onCancel={this.hideDatePicker}
          date={date.toDate()}
          locale="en_GB"
        />
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
