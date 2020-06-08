import React from "react"
import { StyleSheet, View } from "react-native"
import {
  Circle, Defs, G, Line, LinearGradient,
  Rect, Stop, Text,
} from "react-native-svg"
import {
  AreaChart,
  GridProps, XAxis,
} from "react-native-svg-charts"
import { generate } from "shortid"

import Colors from "../../../../constants/Colors"
import { LocalisationManager } from "../../../../lib"
import MapStyles from "../../../../styles/Map"
import ChartLoading from "./ChartLoading"

const styles = StyleSheet.create({
  chart: {
    backgroundColor: Colors.cardBackground,
    height: 200,
  },
  xaxis: {
    marginHorizontal: -10,
    marginTop: 10,
  },
})

interface GradientProps {
  data?: Array<number>,
}

const Gradient = ({ data = [] }: GradientProps) => (
  <>
    {data.map(
      () => (
        <Defs key={generate()}>
          <LinearGradient
            id="gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <Stop
              offset="0%"
              stopColor={Colors.accentColor}
              stopOpacity={0.8}
            />
            <Stop
              offset="100%"
              stopColor={Colors.accentColor}
              stopOpacity={0.2}
            />
          </LinearGradient>
        </Defs>
      ),
    )}
  </>
)

interface CurrentTimeBarProps extends GridProps<number> {
  width?: number,
  height?: number,
  time: number,
  occupied: number,
}

const CurrentTimeBar: React.FC<CurrentTimeBarProps> = ({
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

interface CapacityLineProps {
  y?: (t: number) => number,
  capacity: number,
  selectedIndex: number,
  data?: Array<number>,
}

const CapacityLine: React.FC<CapacityLineProps> = ({
  y, capacity, selectedIndex, data = [],
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
            {LocalisationManager
              .parseToMoment(`${selectedIndex}`, `H`)
              .format(`h:00a`)}
            {` - ${Math.round(data[selectedIndex])} seats occupied`}
          </Text>
        </>
      ) : null}
    </G>
)

interface HighlightBarProps extends GridProps<number> {
  data?: number[],
  selectedIndex: number,
}
const HighlightBar: React.FC<HighlightBarProps> = ({
  x, y, selectedIndex, data = [],
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


interface CustomGridProps {
  setIndex: (n: number) => void,
  data?: Array<number>,
  width?: number,
}
const CustomGrid: React.FC<
  CustomGridProps
  & GridProps<number>
> = ({
  x,
  data = [],
  width,
  setIndex,
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

interface Props {
  capacity?: number,
  data?: Array<number>,
  isLoading?: boolean,
  occupied?: number,
}

interface State {
  selectedIndex: number,
}

class CapacityChart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedIndex: null,
    }
  }

  formatXLabel = (value: number): string => {
    const time = value - 1
    const selectTimes = [2, 8, 14, 20]
    if (selectTimes.includes(time)) {
      return LocalisationManager.parseToMoment(`${time}`, `H`).format(`h:00a`)
    }
    // returning an empty or string or null makes the chart
    // makes the chart library think all labels have zero height
    // labels have zero height, so we return this blank character
    // as a workaround to hide labels
    return `⠀`
  }

  render(): React.ReactElement {
    const {
      capacity = 500,
      data = [],
      isLoading = false,
      occupied = 0,
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
          <CapacityLine
            capacity={capacity}
            selectedIndex={selectedIndex}
          />
          <CurrentTimeBar
            time={hour}
            occupied={occupied}
          />
          {selectedIndex ? (
            <HighlightBar
              selectedIndex={selectedIndex}
            />
          ) : null}
          <CustomGrid
            setIndex={(index) => this.setState({ selectedIndex: index })}
          />
        </AreaChart>
        <XAxis
          style={styles.xaxis}
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
