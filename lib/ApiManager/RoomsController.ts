import axios from "axios"
import {
  EQUIPMENT_URL, FREE_ROOMS_URL, ROOMBOOKINGS_URL, ROOMS_URL, SITES_URL,
} from "../../constants/API"
import ErrorManager from "../ErrorManager"
import LocalisationManager from "../LocalisationManager"

class roomsController {
  static getBookings = async (
    token = null,
    {
      roomid,
      siteid,
      date = LocalisationManager.getMoment().format(`YYYYMMDD`),
    },
  ) => {
    if (!roomid || !siteid) {
      throw new Error(`Must specify roomid and siteid`)
    }
    try {
      const results = await axios.get(ROOMBOOKINGS_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          date,
          roomid,
          siteid,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.bookings
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }

  static getEmptyRooms = async (
    token = null,
    {
      startDateTime = (new Date()).toISOString(),
      endDateTime = (
        LocalisationManager
          .getMoment()
          .add(1, `hours`)
          .toISOString()
      ),
    } = {},
  ) => {
    try {
      const results = await axios.get(FREE_ROOMS_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          endDateTime,
          startDateTime,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.free_rooms
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }

  static getEquipment = async (token = null, { roomid, siteid }) => {
    if (!roomid || !siteid) {
      throw new Error(`Must specify roomid and siteid`)
    }
    try {
      const results = await axios.get(EQUIPMENT_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          roomid,
          siteid,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.equipment
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }

  static getSites = async (token = null) => {
    try {
      const results = await axios.get(SITES_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.sites
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }

  static search = async (token = null, query = ``) => {
    if (query && query.length < 3) {
      return {}
    }
    try {
      const results = await axios.get(ROOMS_URL, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          query,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      return results.data.content.rooms
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }
}

export default roomsController
