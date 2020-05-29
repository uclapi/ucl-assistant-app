import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"

import { timetableSelector } from "../../../selectors/timetableSelectors"
import TimetableDetailView from "./TimetableDetailView"

export class TimetableDetailScreen extends Component {
  static navigationOptions = ({ route }) => ({
    title: `Event: ${route.params.code}`,
  })

  static mapStateToProps = (state) => ({
    timetable: timetableSelector(state),
  })

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    timetable: PropTypes.shape(),
  }

  static defaultProps = {
    timetable: {},
  }

  constructor(props) {
    super(props)
    const { params } = props.route
    const { date = `2018-01-01`, time, code } = params
    this.state = {
      // pre-defined
      code,
      date,
      event: {},
      // from timetable
      time,
    }
  }

  componentDidMount() {
    this.timetableLoadedTest()
  }

  timetableLoadedTest = () => {
    const { timetable } = this.props
    if (Object.keys(timetable).length > 0) {
      this.findEvent()
    }
  }

  async findEvent() {
    const { date, time, code } = this.state
    const { timetable } = this.props
    const timetableDay = (timetable[date] || {}).timetable || []
    const event = timetableDay.filter(
      (ev) => ev.module.module_id === code && ev.start_time === time,
    )[0]
    await this.setState({ event })
  }

  render() {
    const initialRegion = {
      latitude: 51.5246586,
      latitudeDelta: 0.0012,
      longitude: -0.1339784,
      longitudeDelta: 0.0071,
    }
    const { navigation } = this.props
    const { date, event } = this.state
    return (
      <TimetableDetailView
        initialRegion={initialRegion}
        date={date}
        {...event}
        navigation={navigation}
      />
    )
  }
}

export default connect(TimetableDetailScreen.mapStateToProps)(
  TimetableDetailScreen,
)
