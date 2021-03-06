export interface Coordinates {
  lat?: string,
  lng?: string,
}

export interface Location {
  name?: string,
  type?: string,
  address?: Array<string>,
  coordinates?: Coordinates,
}

export interface Room {
  roomid: string,
  siteid: string,
  sitename?: string,
  roomname?: string,
  classification?: string,
  classification_name?: string,
  capacity?: number,
  location?: Location,
  automated?: `Y` | `N`,
}

export interface Region {
  latitude: number,
  latitudeDelta: number,
  longitude: number,
  longitudeDelta: number,
}

export interface Lecturer {
  department_id?: string,
  department_name?: string,
  email?: string,
  name?: string,
}

export interface Module {
  department_name?: string,
  email?: string,
  lecturer?: Lecturer,
  name?: string,
}

export interface TimetableEvent {
  contact?: string,
  date?: string,
  end_time?: string,
  location?: Location,
  name?: string,
  type?: string,
  module?: Module,
  session_group?: string,
  session_type_str?: string,
  start_time?: string,
}

export interface Person {
  name?: string,
  status?: string,
  department?: string,
  email?: string,
}

export interface StudySpace {
  id?: string,
  surveyId?: string,
  mapId?: string,
  name?: string,
  isFetchingAverages?: boolean,
  location?: Location,
  maps?: Array<unknown>,
  dailyAveragesError?: Error,
  occupied?: number,
  total?: number,
  capacity?: number,
  isFetchingSeatInfo?: boolean,
  dailyAverages?: Array<number>,
}

export type NestedNavigator<T> = {
  screen: keyof T,
  params?: T[keyof T],
  initial?: boolean,
}

export interface IconProps {
  size?: number,
  color?: string,
  name: string,
}

export type JWT = string

export interface User {
  apiToken: string,
  cn: string,
  department: string,
  email: string,
  fullName: string,
  givenName: string,
  scopeNumber: number,
  token: string,
  upi: string,
}

export interface Equipment {
  type: string,
  description: string,
  units: number,
}

export interface RoomBooking {
  slotid: string,
  end_time: Date,
  description?: string,
  roomname: string,
  siteid: string,
  contact?: string,
  weeknumber?: number,
  roomid: string,
  start_time: Date,
  phone?: string,
}
