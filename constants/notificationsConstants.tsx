export const NOTIFICATION_TYPE_DEFAULT: string = "default";
export const NOTIFICATION_TYPE_STUDYSPACE_CAPACITY: string = "studyspace-capacity";
export const NOTIFICATION_TYPE_SERVICE_UPDATE: string = "service-update";
export const NOTIFICATION_TYPE_BROADCAST: string = "broadcast";
export const NOTIFICATION_TYPE_TIMETABLE_EVENT_REMINDER: string =
  "timetable-event-reminder"

export const NOTIFICATION_REGISTRATION_CHANGING: string =
  "NOTIFICATION_REGISTRATION_CHANGING"
export const NOTIFICATION_STATE_CHANGED: string = "NOTIFICATION_STATE_CHANGED ";
export const NOTIFICATION_STATE_CHANGE_ERROR: string =
  "NOTIFICATION_STATE_CHANGE_ERROR "

export const NotificationType = {
  DEFAULT: NOTIFICATION_TYPE_DEFAULT,
  STUDYSPACE_CAPACITY: NOTIFICATION_TYPE_STUDYSPACE_CAPACITY,
  SERVICE_UPDATE: NOTIFICATION_TYPE_SERVICE_UPDATE,
}

export const NotificationChannels = {
  DEFAULT: {
    id: NOTIFICATION_TYPE_DEFAULT,
    options: {
      name: "Miscellaneous notifications",
      sound: true,
      vibrate: true,
    },
  },
  STUDYSPACE_CAPACITY: {
    id: NOTIFICATION_TYPE_STUDYSPACE_CAPACITY,
    options: {
      name: "Service updates",
      sound: false,
      vibrate: false,
      description: "UCL Assistant service updates.",
      priority: "high",
      badge: false,
    },
  },
  TIMETABLE_EVENT: {
    id: NOTIFICATION_TYPE_TIMETABLE_EVENT_REMINDER,
    options: {
      name: "Timetable event reminders",
      description: "Reminders for events on your timetable",
      sound: true,
      vibrate: true,
      priority: "max",
      badge: true,
    },
  },
}

export const actions = {
  STATE_CHANGING: NOTIFICATION_REGISTRATION_CHANGING,
  STATE_CHANGED: NOTIFICATION_STATE_CHANGED,
  STATE_CHANGE_ERROR: NOTIFICATION_STATE_CHANGE_ERROR,
}
