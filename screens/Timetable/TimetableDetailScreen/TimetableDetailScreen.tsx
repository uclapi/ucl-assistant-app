
import { RouteProp } from "@react-navigation/native"
import React from "react"
import { connect, ConnectedProps } from "react-redux"

import type { AppStateType } from "../../../configureStore"
import { timetableSelector } from "../../../selectors/timetableSelectors"
import type {
  TimetableNavigatorNavigationType,
  TimetableNavigatorParamList,
} from '../TimetableNavigator'
import TimetableDetailView from "./TimetableDetailView"

// eslint-disable-next-line quotes
type RouteType = RouteProp<TimetableNavigatorParamList, 'TimetableDetail'>

interface Props extends PropsFromRedux {
  navigation: TimetableNavigatorNavigationType,
  route: RouteType,
}

interface State {
  date: string,
  time: string,
  code: string,
  event: unknown,
}

export class TimetableDetailScreen extends React.Component<Props, State> {
  static navigationOptions = ({ route }: { route: RouteType, }) => ({
    title: `Event: ${route.params.code}`,
  })

  constructor(props: Props) {
    super(props)
    const { params } = props.route
    const { date = `2018-01-01`, time, code } = params
    this.state = {
      // pre-defined
      code,
      date,
      event: {},
      // from timetable
      time,
    }
  }

  componentDidMount(): void {
    this.timetableLoadedTest()
  }

  timetableLoadedTest = (): void => {
    const { timetable } = this.props
    if (Object.keys(timetable).length > 0) {
      this.findEvent()
    }
  }

  async findEvent(): Promise<void> {
    const { date, time, code } = this.state
    const { timetable } = this.props
    const timetableDay = (timetable[date] || {}).timetable || []
    const event = timetableDay.filter(
      (ev) => ev.module.module_id === code && ev.start_time === time,
    )[0]
    await this.setState({ event })
  }

  render(): React.ReactElement {
    const initialRegion = {
      latitude: 51.5246586,
      latitudeDelta: 0.0012,
      longitude: -0.1339784,
      longitudeDelta: 0.0071,
    }
    const { navigation } = this.props
    const { date, event } = this.state
    return (
      <TimetableDetailView
        initialRegion={initialRegion}
        date={date}
        {...event}
        navigation={navigation}
      />
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    timetable: timetableSelector(state),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TimetableDetailScreen)
