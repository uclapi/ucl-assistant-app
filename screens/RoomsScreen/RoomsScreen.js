import React, { Component } from "react";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { TitleText } from "../../components/Typography";
import { Page } from "../../components/Containers";
import Colors from "../../constants/Colors";
import SearchControl from "./SearchControl";

class RoomsScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="map-pin"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    const { navigation } = this.props;
    return (
      <Page mainTabPage>
        <TitleText>Rooms</TitleText>
        <SearchControl navigation={navigation} />
      </Page>
    );
  }
}

export default RoomsScreen;
