/* eslint react-native/no-inline-styles: 0 */
import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import {
  Circle, Defs, G, Line, LinearGradient,
  Rect, Stop, Text,
} from "react-native-svg"
import { AreaChart, XAxis } from "react-native-svg-charts"
import { generate } from "shortid"

import Colors from "../../../constants/Colors"
import { LocalisationManager } from "../../../lib"
import MapStyles from "../../../styles/Map"
import ChartLoading from "./ChartLoading"

const styles = StyleSheet.create({
  chart: {
    backgroundColor: Colors.cardBackground,
    height: 200,
  },
})

/* apparently ESLint does not like curried components!! */
/* eslint-disable react/prop-types */

const Gradient = ({ data }) => data.map(() => (
  <Defs key={generate()}>
    <LinearGradient id="gradient" x1="0%" y="0%" x2="0%" y2="100%">
      <Stop offset="0%" stopColor={Colors.accentColor} stopOpacity={0.8} />
      <Stop offset="100%" stopColor={Colors.accentColor} stopOpacity={0.2} />
    </LinearGradient>
  </Defs>
))

const CurrentTimeBar = ({
  x, y, width, height, time, occupied,
}) => (
    <G key="tooltip" x={x(time)}>
      <Rect
        height={height}
        width={Math.round(width / 24)}
        opacity={0.3}
        fill={Colors.graphCurrentTime}
      />
      <Rect
        y={y(occupied)}
        height={height - y(occupied)}
        width={Math.round(width / 24)}
        fill={Colors.graphCurrentTime}
      />
    </G>
)

const CapacityLine = ({
  y, capacity, selectedIndex, data,
}) => (
    <G key="capacity" x={0} y={y(capacity) < 0 ? 0 : y(capacity)}>
      <Line
        x1="0%"
        x2="100%"
        y1={0}
        y2={0}
        stroke={Colors.textColor}
        strokeDasharray={[8, 6]}
      />
      <Text x={3} y={18} fill={Colors.textColor} fontSize={15}>
        {`Capacity (${capacity} seats)`}
      </Text>
      {selectedIndex !== null ? (
        <>
          <Text
            x={3}
            y={38}
            fill={Colors.textColor}
            fontSize={15}
            key={selectedIndex}
          >
            {LocalisationManager.parseToMoment(selectedIndex, `H`).format(`h:00a`)}
            {` - ${Math.round(data[selectedIndex])} seats occupied`}
          </Text>
        </>
      ) : null}
    </G>
)

const HighlightBar = ({
  x, y, selectedIndex, data,
}) => (
    <G key="tooltip" x={x(selectedIndex)}>
      <Line
        key={generate()}
        y1="100%"
        y2={y(data[selectedIndex])}
        x1={0}
        x2={0}
        stroke={Colors.graphCurrentBar}
        strokeDasharray={[3, 2]}
      />
      <Circle
        cy={y(data[selectedIndex])}
        r={5}
        stroke={Colors.accentColor}
        fill={Colors.cardBackground}
      />
    </G>
)

const CustomGrid = ({
  x, data, width, setIndex,
}) => (
    <G>
      {// Vertical grid
        data.map((val, index) => (
          <Line
            key={generate()}
            y1="0%"
            y2="100%"
            x1={x(index)}
            x2={x(index)}
            stroke="rgba(0,0,0,0)"
            strokeWidth={Math.round(width / 24)}
            onPress={() => {
              setIndex(index)
            }}
          />
        ))
      }
    </G>
)

/* eslint-enable react/prop-types */

class CapacityChart extends Component {
  static propTypes = {
    capacity: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.number),
    isLoading: PropTypes.bool,
    occupied: PropTypes.number,
  }

  static defaultProps = {
    capacity: 500,
    data: [],
    isLoading: false,
    occupied: 0,
  }

  constructor() {
    super()
    this.state = {
      selectedIndex: null,
    }
  }

  formatXLabel = (value) => {
    const time = value - 1
    const selectTimes = [2, 8, 14, 20]
    if (selectTimes.includes(time)) {
      return LocalisationManager.parseToMoment(time, `H`).format(`h:00a`)
    }
    // returning an empty or string or null makes the chart
    // makes the chart library think all labels have zero height
    // labels have zero height, so we return this blank character
    // as a workaround to hide labels
    return `⠀`
  }

  render() {
    const {
      capacity,
      data,
      isLoading,
      occupied,
    } = this.props
    const { selectedIndex } = this.state

    if (isLoading) {
      return (
        <View style={[MapStyles.wideMap, { height: undefined }]}>
          <ChartLoading />
        </View>
      )
    }

    const hour = parseInt(
      LocalisationManager.getMoment()
        .format(`HH`),
      10,
    )
    return (
      <View style={[MapStyles.wideMap, { height: undefined }]}>
        <AreaChart
          animate
          animationDuration={500}
          data={data}
          showGrid={false}
          gridMin={0}
          gridMax={capacity}
          svg={{
            fill: `url(#gradient)`,
            stroke: Colors.accentColor,
            strokeWidth: 2,
          }}
          style={styles.chart}
        >
          <Gradient />
          <CapacityLine capacity={capacity} selectedIndex={selectedIndex} />
          <CurrentTimeBar
            data={data}
            time={hour}
            occupied={occupied}
          />
          {selectedIndex ? (
            <HighlightBar selectedIndex={selectedIndex} />
          ) : null}
          <CustomGrid
            setIndex={(index) => this.setState({ selectedIndex: index })}
          />
        </AreaChart>
        <XAxis
          style={{ marginHorizontal: -10, marginTop: 10 }}
          contentInset={{ right: 15 }}
          data={Object.keys(data).map((v) => Number.parseInt(v, 10))}
          formatLabel={this.formatXLabel}
          svg={{ fill: `black`, fontSize: 16 }}
        />
      </View>
    )
  }
}

export default CapacityChart
