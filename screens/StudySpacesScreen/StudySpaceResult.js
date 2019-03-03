import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { generate } from "shortid";
import SearchResult from "../../components/SearchResult";
import Colors from "../../constants/Colors";

const StudySpaceResult = ({
  name,
  onPress,
  occupied,
  total,
  fetchingSeatInfo,
}) => {
  const occupation = occupied / total;
  let capacityString = "Unable to get data";
  let indicatorColor = Colors.textInputBackground;
  if (total > 0) {
    switch (true) {
      case occupation > 0.9:
        capacityString = "Very busy";
        indicatorColor = Colors.indicatorRed;
        break;
      case occupation > 0.65:
        capacityString = "Quite busy";
        indicatorColor = Colors.indicatorOrange;
        break;
      case occupation > 0.5:
        capacityString = "A little busy";
        indicatorColor = Colors.indicatorYellow;
        break;
      case occupation > 0.2:
        capacityString = "Rather quiet";
        indicatorColor = Colors.indicatorLime;
        break;
      default:
        capacityString = "Very quiet";
        indicatorColor = Colors.indicatorGreen;
    }
  }
  return (
    <SearchResult
      key={generate()}
      topText={name}
      bottomText={`${capacityString} (${total - occupied} seats free)`}
      type="location"
      buttonText="View"
      indicator
      indicatorLoading={fetchingSeatInfo}
      indicatorColor={indicatorColor}
      onPress={onPress}
    />
  );
};

StudySpaceResult.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string,
  occupied: PropTypes.number,
  total: PropTypes.number,
  fetchingSeatInfo: PropTypes.bool,
};

StudySpaceResult.defaultProps = {
  onPress: () => {},
  name: "Study Space Name",
  occupied: 0,
  total: 0,
  fetchingSeatInfo: false,
};

const ConnectedStudySpaceResult = ({ id, studyspaces, navigation }) => {
  const space = studyspaces.filter(x => x.id === id)[0];

  // There may be non-studyspace results e.g. 1 Saint Martin Le Grand
  // occupancy information is not available for these locations
  if (!space || space.capacity === 0) {
    return null;
  }

  return (
    <StudySpaceResult
      {...space}
      onPress={() =>
        navigation.navigate("StudySpaceDetail", {
          id: space.id,
          name: space.name,
          occupied: space.occupied,
          total: space.total,
        })
      }
    />
  );
};

ConnectedStudySpaceResult.propTypes = {
  id: PropTypes.number.isRequired,
  studyspaces: PropTypes.arrayOf(PropTypes.shape()),
  navigation: PropTypes.shape().isRequired,
};

ConnectedStudySpaceResult.defaultProps = {
  studyspaces: [],
};

ConnectedStudySpaceResult.mapStateToProps = state => ({
  studyspaces: state.studyspaces.studyspaces,
});

export default connect(ConnectedStudySpaceResult.mapStateToProps)(
  ConnectedStudySpaceResult,
);
