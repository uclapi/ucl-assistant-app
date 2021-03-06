import axios from "axios"
import {
  EQUIPMENT_URL, FREE_ROOMS_URL, ROOMBOOKINGS_URL, ROOMS_URL, SITES_URL,
} from "../../constants/API"
import type { JWT, Room, Equipment } from '../../types/uclapi'
import ErrorManager from "../ErrorManager"
import LocalisationManager from "../LocalisationManager"

class roomsController {
  static getBookings = async (
    token: JWT,
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
    token: JWT,
    {
      startDateTime = (new Date()).toISOString(),
      endDateTime = (
        LocalisationManager
          .getMoment()
          .add(1, `hours`)
          .toISOString()
      ),
    } = {},
  ): Promise<Room[]> => {
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

      const {
        data: {
          content: {
            free_rooms: freeRooms,
          },
        },
      }: {
        data: {
          content: {
            free_rooms: Room[],
          },
        },
      } = results

      // return unique only. remove once https://github.com/uclapi/uclapi/issues/3016 is fixed
      return Array.from(new Set(freeRooms
        .map(({ siteid, roomid }) => `${siteid}|${roomid}`))).map((aggregate: string) => {
        const [siteid, roomid] = aggregate.split(`|`)
        return freeRooms.find((r: Room) => (
          siteid === r.siteid && roomid === r.roomid
        ))
      })
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }

  static getEquipment = async (token: JWT, { roomid, siteid }: Room): Promise<Equipment[]> => {
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

  static getAllRooms = async (token: JWT): Promise<Room[]> => {
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

  static search = async (token = null, query = ``): Promise<Room[]> => {
    if (query && query.length < 3) {
      return []
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
