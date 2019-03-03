import { Feather } from "@expo/vector-icons";
import moment from "moment";
import memoize from "memoize-one";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { momentObj } from "react-moment-proptypes";
import { View, FlatList, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { generate } from "shortid";
import { surveys } from "../../constants/studyspaces";
import { fetchSeatInfos } from "../../actions/studyspacesActions";
import Button from "../../components/Button";
import { Page } from "../../components/Containers";
import {
  BodyText,
  ErrorText,
  SubtitleText,
  TitleText,
} from "../../components/Typography";
import Colors from "../../constants/Colors";
import FavouriteStudySpaces from "./FavouriteStudySpaces";
import StudySpaceSearchResult from "./StudySpaceResult";

const styles = StyleSheet.create({
  favourites: {
    paddingBottom: 20,
  },
  flatList: {
    paddingVertical: 20,
  },
  padder: {
    height: 20,
  },
});

class StudySpaceScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "Study Spaces",
    tabBarIcon: ({ focused }) => (
      <Feather
        name="book"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    token: PropTypes.string,
    fetchInfo: PropTypes.func,
    lastUpdated: PropTypes.oneOfType([momentObj, PropTypes.string]),
  };

  static defaultProps = {
    studyspaces: [],
    token: "",
    fetchInfo: () => {},
    lastUpdated: null,
  };

  static findErrorneousSpaces = spaces =>
    spaces.filter(
      space =>
        typeof space.fetchSeatInfoError === "string" &&
        space.fetchSeatInfoError !== "",
    );

  static mapStateToProps = state => ({
    studyspaces: state.studyspaces.studyspaces,
    lastUpdated: state.studyspaces.lastStatusUpdate,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    fetchInfo: (ids, token) => dispatch(fetchSeatInfos(token, ids)),
  });

  constructor(props) {
    super(props);
    this.updateTextInterval = null;
  }

  state = {
    loadedSeatInfo: false,
    lastUpdated: "never",
  };

  componentDidMount() {
    if (!this.state.loadedSeatInfo && this.props.token) {
      this.fetchSeatInfo();
    }
    this.updateTextInterval = setInterval(
      () => this.updateLastUpdatedText(),
      10000,
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.lastUpdated !== prevProps.lastUpdated) {
      this.updateLastUpdatedText();
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateTextInterval);
  }

  memoizeErrorneousSpaces = memoize(StudySpaceScreen.findErrorneousSpaces);

  updateLastUpdatedText() {
    const { lastUpdated } = this.props;
    this.setState({
      lastUpdated: lastUpdated ? moment(lastUpdated).fromNow() : "never",
    });
  }

  async fetchSeatInfo() {
    console.log("fetch seat info...");
    await this.setState({ loadedSeatInfo: true });
    const ids = this.props.studyspaces.map(space => space.id);
    setTimeout(() => this.props.fetchInfo(ids, this.props.token), 500);
    console.log("action dispatched.");
  }

  render() {
    console.log("begin render calcs");
    const { navigation, studyspaces } = this.props;
    const errorneousSpaces = this.memoizeErrorneousSpaces(studyspaces);
    const isLoading =
      !this.state.loadedSeatInfo ||
      this.props.studyspaces.reduce(
        (res, space) => res || space.isFetchingSeatInfo,
        false,
      );
    console.log("begin drawing");
    return (
      <Page
        mainTabPage
        refreshEnabled
        onRefresh={() => this.fetchSeatInfo()}
        refreshing={isLoading}
      >
        <TitleText>Find Study Spaces</TitleText>

        <FavouriteStudySpaces
          navigation={navigation}
          style={styles.favourites}
        />

        <SubtitleText>All Study Spaces</SubtitleText>
        {errorneousSpaces.length < 5 ? (
          errorneousSpaces.map(space => (
            <ErrorText key={generate()}>
              Error fetching {space.name}: {space.fetchSeatInfoError}
            </ErrorText>
          ))
        ) : (
          <ErrorText>
            Looks like there was an error trying to fetch live seating info.
          </ErrorText>
        )}

        <BodyText>Last updated: {this.state.lastUpdated}</BodyText>

        <FlatList
          data={surveys.sort((s1, s2) => s1.name.localeCompare(s2.name))}
          contentContainerStyle={styles.flatList}
          keyExtractor={item => `${item.id}`}
          initialNumToRender={30}
          renderItem={({ item }) => (
            <StudySpaceSearchResult navigation={navigation} id={item.id} />
          )}
        />
        <View style={styles.padder} />
      </Page>
    );
  }
}

export default connect(
  StudySpaceScreen.mapStateToProps,
  StudySpaceScreen.mapDispatchToProps,
)(StudySpaceScreen);
