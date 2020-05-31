import notifications, {
  initialState as notificationsState,
} from "./notificationsReducer"
import people, { initialState as peopleState } from "./peopleReducer"
import rooms, { initialState as roomsState } from "./roomsReducer"
import studyspaces, {
  initialState as studyspacesState,
} from "./studyspacesReducer"
import timetable, { initialState as timetableState } from "./timetableReducers"
import user, { initialState as userState } from "./userReducer"

export const initialState = {
  notifications: notificationsState,
  people: peopleState,
  rooms: roomsState,
  studyspaces: studyspacesState,
  timetable: timetableState,
  user: userState,
}

export default {
  notifications, people, rooms, studyspaces, timetable, user,
}
