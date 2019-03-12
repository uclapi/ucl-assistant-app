import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import { Page } from "../../components/Containers";
import { TitleText, SubtitleText } from "../../components/Typography";
import LiveSeatingMap from "./LiveSeatingMap";

const styles = StyleSheet.create({
  seatMap: {},
});

class LiveSeatingMapScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };
  renderSeatMap = survey => ({ name, id: mapId }) => (
    <View style={styles.seatMap} key={mapId}>
      {name ? <SubtitleText>{name}</SubtitleText> : null}
      <LiveSeatingMap surveyId={survey.id} mapId={mapId} />
    </View>
  );
  render() {
    const { survey } = this.props.navigation.state.params;
    const seatMaps =
      survey.maps.length === 1
        ? this.renderSeatMap(survey)({ ...survey.maps[0], name: null })
        : survey.maps.map(this.renderSeatMap(survey));

    return (
      <Page>
        <TitleText>{survey.name}</TitleText>
        {seatMaps}
      </Page>
    );
  }
}

export default LiveSeatingMapScreen;
