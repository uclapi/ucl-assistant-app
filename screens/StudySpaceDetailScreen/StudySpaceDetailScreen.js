/* eslint-disable react-native/no-inline-styles */
// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { connect } from "react-redux";
import { surveys } from "../../constants/studyspaces";
import { fetchAverages } from "../../actions/studyspacesActions";
import { Page, Horizontal } from "../../components/Containers";
import { BodyText, TitleText, SubtitleText } from "../../components/Typography";
import CapacityChart from "./CapacityChart";
import LiveIndicator from "./LiveIndicator";
// import OpeningHours from "./OpeningHours";
import FavouriteButton from "./FavouriteButton";
import LiveSeatingMapList from "./LiveSeatingMapList";

const busyText = (
  time = 0,
  data = Array.from(Array(24)).map(() => 0),
  occupied = 0,
  capacity = 1,
) => {
  const diff = data[time] - occupied;
  if (Math.abs(diff) / capacity < 0.05) {
    return "about as busy as normal";
  }
  if (diff > 0) {
    return "quieter than usual";
  }
  return "busier than usual";
};

const styles = StyleSheet.create({
  facilities: {
    marginBottom: 20,
    marginTop: 10,
  },
  liveIndicator: {
    justifyContent: "flex-start",
    marginBottom: 10,
  },
  popularTimes: {
    marginVertical: 10,
  },
});

class StudySpaceDetailScreen extends Component {
  static navigationOptions = {
    title: "Study Space Detail",
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    /* eslint-disable react/no-unused-prop-types */
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    /* eslint-enable react/no-unused-prop-types */
    fetchAverages: PropTypes.func.isRequired,
    token: PropTypes.string,
  };

  static defaultProps = {
    studyspaces: [],
    token: "",
  };

  static getDerivedStateFromProps(props, state) {
    if (props.studyspaces && props.studyspaces.length > 0) {
      const space = props.studyspaces.filter(s => s.id === state.id)[0];
      return { data: space.dailyAverages, space };
    }
    return null;
  }

  static mapStateToProps = state => ({
    studyspaces: state.studyspaces.studyspaces,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    fetchAverages: (token, id) => dispatch(fetchAverages(token, id)),
  });

  static capacityTextStyle = {
    marginBottom: 0,
    marginTop: 5,
  };

  constructor(props) {
    super(props);
    const { id, name, occupied, total } = this.props.navigation.state.params;
    this.state = {
      name,
      id,
      total,
      occupied,
      data: Array.from(Array(24)).map(() => 0),
      fetchingData: false,
      space: {
        isFetchingAverages: false,
      },
      survey: surveys.filter(
        ({ id: surveyId }) =>
          Number.parseInt(id, 10) === Number.parseInt(surveyId, 10),
      )[0],
    };
  }

  componentDidMount() {
    const { fetchingData, id } = this.state;
    const { token } = this.props;
    if (!fetchingData && token.length > 0) {
      this.props.fetchAverages(token, id);
      setTimeout(() => this.setState({ fetchingData: true }), 100);
    }
  }

  navigateToLiveSeatMap = () => {
    const { navigation } = this.props;
    const { survey } = this.state;
    navigation.navigate("LiveSeatingMap", { survey });
  };

  render() {
    const { id, name, data, total, occupied, space } = this.state;
    const { isFetchingAverages, maps } = space;
    const hour = parseInt(moment().format("HH"), 10);
    return (
      <View style={{ flex: 1 }}>
        <Page style={{ flex: 1 }}>
          <TitleText>{name}</TitleText>
          <Horizontal>
            <View style={{ flex: 1 }}>
              <TitleText style={StudySpaceDetailScreen.capacityTextStyle}>
                {total - occupied}
              </TitleText>
              <BodyText>Seats Available</BodyText>
            </View>
            <View style={{ flex: 1 }}>
              <TitleText style={StudySpaceDetailScreen.capacityTextStyle}>
                {occupied}
              </TitleText>
              <BodyText>Seats Occupied</BodyText>
            </View>
          </Horizontal>
          <View style={styles.popularTimes}>
            <SubtitleText>Popular Times</SubtitleText>
            <CapacityChart
              id={id}
              data={data}
              occupied={occupied}
              capacity={total}
              loading={isFetchingAverages}
            />
          </View>
          <Horizontal style={styles.liveIndicator}>
            <LiveIndicator />
            <BodyText>
              {moment().format("HH:mm")} -{" "}
              {busyText(hour, data, occupied, total)}
            </BodyText>
          </Horizontal>
          <LiveSeatingMapList style={styles.liveSeatingMapList} maps={maps} />
          {/* {survey ? (
            <Button onPress={this.navigateToLiveSeatMap}>Live Seat Map</Button>
          ) : null} */}
          {/* <SubtitleText>Opening Hours</SubtitleText>
          <OpeningHours /> */}
          <View style={styles.facilities}>
            <SubtitleText>Facilities</SubtitleText>
            <BodyText>
              See the libraries website for more information about what
              facilities are offered.
            </BodyText>
          </View>
        </Page>
        <FavouriteButton id={id} />
      </View>
    );
  }
}

export default connect(
  StudySpaceDetailScreen.mapStateToProps,
  StudySpaceDetailScreen.mapDispatchToProps,
)(StudySpaceDetailScreen);
