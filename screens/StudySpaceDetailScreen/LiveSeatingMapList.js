// @flow
import React, { Component } from "react";
import { View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SubtitleText, BodyText } from "../../components/Typography";
import Svg from "../../components/Svg";

const { width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  liveSeatingMap: {
    height: 200,
    marginBottom: 20,
    marginTop: 10,
    width: windowWidth - 40,
  },
  liveSeatingMaps: {
    marginVertical: 20,
  },
});

const studySpaceNames = ["Student Centre "];
// remove the name of the studyspace from the name
// of the map if it is present because it's just redundant
// e.g. Student Centre Level 1 => Level 1
const fixNames = ({ name, ...otherProps }) => ({
  ...otherProps,
  name: name.replace(new RegExp(`(${studySpaceNames.join("|")})`), ""),
});

class LiveSeatingMapList extends Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    maps: PropTypes.arrayOf(PropTypes.shape()),
    surveyId: PropTypes.number.isRequired,
  };

  static defaultProps = {
    maps: [],
  };

  static mapStateToProps = (state: Object) => ({
    token: state.user.token,
  });

  static mapDispatchToProps = () => ({});

  openLiveMap = ({ surveyId, mapId }) => () => {
    const { navigation } = this.props;
    navigation.navigate("LiveSeatingMap", { surveyId, mapId });
  };

  renderMapInfo = ({ id, name, total, occupied }) => {
    const { surveyId } = this.props;
    return (
      <View key={id}>
        <BodyText>
          {name}: {total - occupied} seats free (total: {total})
        </BodyText>
        <TouchableOpacity
          onPress={this.openLiveMap({
            surveyId,
            mapId: id,
          })}
        >
          <Svg
            uri="https://a.uguu.se/XG7RLe0MrSaL.svg"
            style={styles.liveSeatingMap}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { maps } = this.props;
    const hasMaps = maps && Array.isArray(maps) && maps.length > 1;
    // No breakdown needed if there is only one map in the survey
    // the map data == the survey data
    if (!hasMaps) {
      return null;
    }

    const mapsList = maps.map(fixNames).map(this.renderMapInfo);

    return (
      <View style={styles.liveSeatingMaps}>
        <SubtitleText>Breakdown</SubtitleText>
        {mapsList}
      </View>
    );
  }
}

export default connect(
  LiveSeatingMapList.mapStateToProps,
  LiveSeatingMapList.mapDispatchToProps,
)(LiveSeatingMapList);
