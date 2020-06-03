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
  roomname?: string,
  classification_name?: string,
  capacity?: number,
  location?: Location,
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

export type NestedNavigator<T> = {
  screen: keyof T,
  params?: T[keyof T],
}
