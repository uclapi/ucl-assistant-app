import Constants from 'expo-constants'
import PeopleController from './PeopleController'
import RoomsController from './RoomsController'
import TimetableController from './TimetableController'
import WorkspacesController from './WorkspacesController'

const clientId = Constants.manifest.extra?.uclapi?.clientId

export default {
  people: PeopleController,
  rooms: RoomsController,
  timetable: TimetableController,
  workspaces: WorkspacesController,
  clientId,
}
