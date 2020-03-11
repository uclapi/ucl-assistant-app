export const NOTIFICATION_TYPES = {
  BROADCAST: `broadcast`,
  DEFAULT: `default`,
  SERVICE_UPDATE: `service-update`,
  STUDYSPACE_CAPACITY: `studyspace-capacity`,
  TIMETABLE_EVENT_REMINDER: `timetable-event-reminder`,
}

export const NOTIFICATION_REGISTRATION_CHANGING = (
  `NOTIFICATION_REGISTRATION_CHANGING`
)
export const NOTIFICATION_STATE_CHANGED = (
  `NOTIFICATION_STATE_CHANGED `
)
export const NOTIFICATION_STATE_CHANGE_ERROR = (
  `NOTIFICATION_STATE_CHANGE_ERROR `
)

export const NotificationType = {
  DEFAULT: NOTIFICATION_TYPES.DEFAULT,
  SERVICE_UPDATE: NOTIFICATION_TYPES.SERVICE_UPDATE,
  STUDYSPACE_CAPACITY: NOTIFICATION_TYPES.STUDYSPACE_CAPACITY,
}

export const NotificationChannels = {
  DEFAULT: {
    id: NOTIFICATION_TYPES.DEFAULT,
    options: {
      name: `Miscellaneous notifications`,
      sound: true,
      vibrate: true,
    },
  },
  STUDYSPACE_CAPACITY: {
    id: NOTIFICATION_TYPES.STUDYSPACE_CAPACITY,
    options: {
      badge: false,
      description: `UCL Assistant service updates.`,
      name: `Service updates`,
      priority: `high`,
      sound: false,
      vibrate: false,
    },
  },
  TIMETABLE_EVENT: {
    id: NOTIFICATION_TYPES.TIMETABLE_EVENT_REMINDER,
    options: {
      badge: true,
      description: `Reminders for events on your timetable`,
      name: `Timetable event reminders`,
      priority: `max`,
      sound: true,
      vibrate: true,
    },
  },
}

export const actions = {
  STATE_CHANGED: NOTIFICATION_STATE_CHANGED,
  STATE_CHANGE_ERROR: NOTIFICATION_STATE_CHANGE_ERROR,
  STATE_CHANGING: NOTIFICATION_REGISTRATION_CHANGING,
}
