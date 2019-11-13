import PropTypes from "prop-types"
import React from "react"
import { momentObj } from "react-moment-proptypes"
import { StyleSheet } from 'react-native'
import DateTimerPicker from "react-native-modal-datetime-picker"

import Button, { RoundButton } from "../../components/Button"
import { Horizontal, Spacer } from "../../components/Containers"
import { LocalisationManager } from "../../lib"

const styles = StyleSheet.create({
  dateControls: {
    paddingLeft: 20,
    paddingRight: 20,
  },
})

class DateControls extends React.Component {
  static propTypes = {
    date: momentObj,
    onDateChanged: PropTypes.func,
  }

  static defaultProps = {
    date: LocalisationManager.getMoment().startOf(`day`),
    onDateChanged: () => { },
  }

  constructor(props) {
    super(props)
    this.state = {
      isDatePickerVisible: false,
    }
  }

  onDatePickerConfirm = (date) => {
    const { onDateChanged } = this.props
    onDateChanged(LocalisationManager.getMoment(date))
    this.setState({ isDatePickerVisible: false })
  }

  render() {
    const { onDateChanged, date } = this.props
    const { isDatePickerVisible } = this.state
    return (
      <Horizontal style={styles.dateControls}>
        <RoundButton
          onPress={() => onDateChanged(date.clone().subtract(1, `day`))}
          icon="chevron-left"
        />
        <Spacer />
        <DateTimerPicker
          isVisible={isDatePickerVisible}
          onConfirm={this.onDatePickerConfirm}
          onCancel={() => this.setState({ isDatePickerVisible: false })}
          date={date.toDate()}
        />
        <Button onPress={() => this.setState({ isDatePickerVisible: true })}>
          Jump To Date
        </Button>
        <Spacer />
        <RoundButton
          onPress={() => onDateChanged(date.clone().add(1, `day`))}
          icon="chevron-right"
        />
      </Horizontal>
    )
  }
}

export default DateControls
