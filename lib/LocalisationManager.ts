import * as Localization from "expo-localization"
import moment, { Moment } from "moment-timezone"

import Timezones from "../constants/Timezones"

const getTimezone = (): string => Localization.timezone
const isLondon = (): boolean => getTimezone() === Timezones.London
const parseWithTz = (date, timezone, format = null): Moment => {
  if (format !== null) {
    return moment.tz(date, format, timezone)
  }
  return moment.tz(date, timezone)
}
const parseToMoment = (
  date: string | Date,
  format = null,
): Moment => parseWithTz(date, Timezones.London, format)
const parseToDate = (
  date: string,
  format = null,
): Date => parseToMoment(date, format).toDate()

const getMoment = (): Moment => moment().tz(Timezones.London)
const now = (): Date => getMoment().toDate()

const local = {
  getMoment: (): Moment => moment().tz(getTimezone()),
  parseToMoment: (
    date: string,
    format = null,
  ): Moment => parseWithTz(date, getTimezone(), format),
}

export default {
  getMoment,
  getTimezone,
  isLondon,
  local,
  now,
  parseToDate,
  parseToMoment,
}
