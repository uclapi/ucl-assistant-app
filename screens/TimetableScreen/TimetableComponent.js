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
import { CentredText, Link, SubtitleText } from "../../components/Typography"
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
  lastModified: {
    marginTop: 20,
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

  jumpToToday = () => {
    const { changeDate } = this.props
    changeDate(LocalisationManager.getMoment())
  }

  renderTimetableCard = (item) => {
    const { date, navigation } = this.props
    const dateISO = date.format(`YYYY-MM-DD`)
    const past = LocalisationManager.parseToDate(
      `${dateISO}T${item.end_time}`,
    ) - LocalisationManager.now() < 0
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
    const { date } = this.props
    if (!date.isSame(LocalisationManager.getMoment().startOf(`day`))) {
      return (
        <Button onPress={this.jumpToToday}>
          Jump To Today
        </Button>
      )
    }
    return null
  }

  renderItem = ({ index }) => {
    const { date, timetable } = this.props
    const dateISO = date.clone().add(index - 1, `days`).format(`YYYY-MM-DD`)
    const {
      timetable: dayTimetable = [],
      lastModified = null,
    } = (timetable[dateISO] || {})

    const items = dayTimetable.sort(
      (a, b) => LocalisationManager.parseToDate(`${dateISO}T${a.start_time}:00`)
        - LocalisationManager.parseToDate(`${dateISO}T${b.start_time}:00`),
    )
    const pastItems = items.filter(
      (item) => LocalisationManager.parseToDate(
        `${dateISO}T${item.end_time}`,
      ) - LocalisationManager.now() < 0,
    )
    const futureItems = items.filter(
      (item) => LocalisationManager.parseToDate(
        `${dateISO}T${item.end_time}`,
      ) - LocalisationManager.now() > 0,
    )

    if (dayTimetable.length > 0) {
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
          {this.renderLastModified(lastModified)}
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
        {this.renderLastModified(lastModified)}
      </View>
    )
  }

  renderLastModified = (lastModified) => (
    <View style={[styles.container, styles.lastModified]}>
      <Link onPress={this.openFAQ}>
        <CentredText>
          {`Last updated ${
            LocalisationManager.parseToMoment(
              lastModified,
            ).calendar().toLowerCase()
          }`}
        </CentredText>
      </Link>
    </View>

  )

  render() {
    const {
      timetable,
      date,
      isLoading,
    } = this.props

    const dateISO = date.format(`YYYY-MM-DD`)
    const {
      timetable: dayTimetable = [],
      lastModified = null,
    } = (timetable[dateISO] || {})

    if (isLoading && dayTimetable.length === 0) {
      return (
        <View>
          <CentredText>Loading timetable...</CentredText>
        </View>
      )
    }

    if (lastModified === null) {
      return (
        <View>
          <CentredText>Could not load personal timetable...</CentredText>
        </View>
      )
    }

    return this.renderItem(1)
  }
}

export default TimetableComponent
