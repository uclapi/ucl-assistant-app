import * as Localization from "expo-localization"
import moment from "moment-timezone"

import Timezones from "../constants/Timezones"

const getTimezone = () => Localization.timezone
const isLondon = () => getTimezone() === Timezones.London
const parseWithTz = (date, timezone, format = null) => {
  if (format !== null) {
    return moment.tz(date, format, timezone)
  }
  return moment.tz(date, timezone)
}
const parseToMoment = (
  date,
  format = null,
) => parseWithTz(date, Timezones.London, format)
const parseToDate = (
  date,
  format = null,
) => parseToMoment(date, format).toDate()

const getMoment = () => moment().tz(Timezones.London)
const now = () => getMoment().toDate()

const local = {
  getMoment: () => moment().tz(getTimezone()),
  parseToMoment: (
    date,
    format = null,
  ) => parseWithTz(date, getTimezone(), format),
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
