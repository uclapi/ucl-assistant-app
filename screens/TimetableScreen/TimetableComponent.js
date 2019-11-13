import PropTypes from "prop-types"
import React from "react"
import { momentObj } from "react-moment-proptypes"
import {
  Dimensions,
  Image,
  StyleSheet,
  View,
} from "react-native"
import { generate } from "shortid"

import Button from "../../components/Button"
import TimetableCard from "../../components/Card/TimetableCard"
import { CentredText, SubtitleText } from "../../components/Typography"
import { AssetManager, LocalisationManager, Random } from "../../lib"
import Styles from "../../styles/Containers"

const relaxIllustration = Random.array([
  AssetManager.undraw.relaxation,
  AssetManager.undraw.chilling,
  AssetManager.undraw.playfulCat,
  AssetManager.undraw.dogWalking,
  AssetManager.undraw.relaxingAtHome,
])

const timetableImageStyle = { height: 200, marginTop: 5, width: 300 }
const topPadding = { height: 50 }
const { width: windowWidth } = Dimensions.get(`window`)

const styles = StyleSheet.create({
  dayView: {
    alignContent: `center`,
    alignItems: `center`,
    paddingLeft: 20,
    paddingRight: 20,
    width: windowWidth,
  },
})

class TimetableComponent extends React.Component {
  static propTypes = {
    changeDate: PropTypes.func,
    date: momentObj,
    isLoading: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    timetable: PropTypes.shape(),
  }

  static defaultProps = {
    changeDate: () => { },
    date: LocalisationManager.getMoment(),
    isLoading: false,
    timetable: {},
  }

  renderTimetableCard = (item) => {
    const { date, navigation } = this.props
    const dateISO = date.format(`YYYY-MM-DD`)
    const past = LocalisationManager.parseToDate(`${dateISO}T${item.end_time}`) - LocalisationManager.now() < 0
    return (
      <TimetableCard
        moduleName={item.module.name}
        moduleCode={item.module.module_id}
        startTime={`${dateISO} ${item.start_time}`}
        endTime={`${dateISO} ${item.end_time}`}
        location={item.location.name || `TBA`}
        lecturer={item.contact ? item.contact : `Unknown Lecturer`}
        pastEvent={past}
        key={generate()}
        navigation={navigation}
      />
    )
  }

  renderJumpToToday = () => {
    const { date, changeDate } = this.props
    if (!date.isSame(LocalisationManager.getMoment().startOf(`day`))) {
      return (
        <Button onPress={() => changeDate(LocalisationManager.getMoment())}>
          Jump To Today
        </Button>
      )
    }
    return null
  }

  renderItem = ({ index }) => {
    const { date, timetable } = this.props
    const dateISO = date.clone().add(index - 1, `days`).format(`YYYY-MM-DD`)
    const filteredTimetable = (timetable[dateISO] || {}).timetable || []

    const items = filteredTimetable.sort(
      (a, b) => LocalisationManager.parseToDate(`${dateISO}T${a.start_time}:00`)
        - LocalisationManager.parseToDate(`${dateISO}T${b.start_time}:00`),
    )
    const pastItems = items.filter(
      (item) => LocalisationManager.parseToDate(`${dateISO}T${item.end_time}`) - LocalisationManager.now() < 0,
    )
    const futureItems = items.filter(
      (item) => LocalisationManager.parseToDate(`${dateISO}T${item.end_time}`) - LocalisationManager.now() > 0,
    )

    if (filteredTimetable.length > 0) {
      return (
        <View style={styles.dayView}>
          {futureItems.map(this.renderTimetableCard)}
          {pastItems.length > 0 && (
            <>
              <SubtitleText>Past Events</SubtitleText>
              {pastItems.map(this.renderTimetableCard)}
            </>
          )}
          {this.renderJumpToToday()}
        </View>
      )
    }

    return (
      <View style={styles.dayView}>
        <View style={topPadding} />
        <CentredText>
          Nothing scheduled on&nbsp;
          {date.format(`dddd`)}
          . Take it easy!
        </CentredText>
        <Image
          source={relaxIllustration}
          resizeMethod="scale"
          style={[Styles.image, timetableImageStyle]}
          resizeMode="contain"
        />
        {this.renderJumpToToday()}
      </View>
    )
  }

  render() {
    const {
      timetable,
      date,
      isLoading,
    } = this.props

    const dateISO = date.format(`YYYY-MM-DD`)
    const filteredTimetable = (timetable[dateISO] || {}).timetable || []

    if (isLoading && filteredTimetable.length === 0) {
      return (
        <View>
          <CentredText>Loading timetable...</CentredText>
        </View>
      )
    }

    return this.renderItem(1)
  }
}

export default TimetableComponent
