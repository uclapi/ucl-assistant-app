import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TimetableDetailView from "./TimetableDetailView";

class TimetableDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Event: ${navigation.state.params.code}`,
  });

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    timetable: PropTypes.shape(),
  };

  static defaultProps = {
    timetable: {},
  };

  static mapStateToProps = state => ({
    timetable: state.timetable.timetable,
  });

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const { date = "2018-01-01", time, code } = params;
    this.state = {
      // pre-defined
      date,
      time,
      code,
      // from timetable
      event: {},
    };
  }

  componentDidMount() {
    this.timetableLoadedTest();
  }

  timetableLoadedTest() {
    if (Object.keys(this.props.timetable).length > 0) {
      this.findEvent();
    }
  }

  async findEvent() {
    const { date, time, code } = this.state;
    const timetableDay = (this.props.timetable[date] || {}).timetable || [];
    const event = timetableDay.filter(
      ev => ev.module.module_id === code && ev.start_time === time,
    )[0];
    await this.setState({ event });
  }

  render() {
    const initialRegion = {
      latitude: 51.5246586,
      longitude: -0.1339784,
      latitudeDelta: 0.0012,
      longitudeDelta: 0.0071,
    };
    const { navigation } = this.props;
    return (
      <TimetableDetailView
        initialRegion={initialRegion}
        date={this.state.date}
        {...this.state.event}
        navigation={navigation}
      />
    );
  }
}

export default connect(TimetableDetailScreen.mapStateToProps)(
  TimetableDetailScreen,
);
