import axios from "axios"
import { encode as btoa } from "base-64"

import {
  EQUIPMENT_URL,
  FREE_ROOMS_URL,
  ROOMBOOKINGS_URL,
  ROOMS_URL,
  WORKSPACES_URL,
} from "../constants/API"
import ErrorManager from "./ErrorManager"
import LocalisationManager from './LocalisationManager'

const roomsController = {
  getBookings: async (
    token = null,
    { roomid, siteid, date = LocalisationManager.getMoment().format(`YYYYMMDD`) },
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
  },
  getEmptyRooms: async (
    token = null,
    {
      startDateTime = (new Date()).toISOString(),
      endDateTime = LocalisationManager.getMoment().add(1, `hour`).toISOString(),
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
  },
  getEquipment: async (token = null, { roomid, siteid }) => {
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
  },
  search: async (token = null, query) => {
    if (query && query.length < 3) {
      return {}
    }
    try {
      const results = await axios.get(ROOMS_URL, {
        headers: {
          authorization: `Bearer ${token}`,
          "uclapi-roombookings-version": `1`,
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
  },
}

const workspacesApi = axios.create({
  baseURL: WORKSPACES_URL,
})

const workspacesController = {
  getLiveImage: async (token = null, { surveyId, mapId }) => {
    try {
      const result = await workspacesApi.get(`/getliveimage/map.svg`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          map_id: mapId,
          survey_id: surveyId,
        },
        responseType: `arraybuffer`,
      })
      const image = btoa(
        new Uint8Array(result.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ``,
        ),
      )
      // there may be no need to base64 SVGs
      // but I have yet to test this extensively
      // https://css-tricks.com/probably-dont-base64-svg/
      return `data:image/svg+xml;base64,${image}`
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
  getWorkspaces: async (token = null) => {
    try {
      const results = await workspacesApi.get(`/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if (!results.data.content.ok) {
        throw new Error(results.data.content.error)
      }
      console.log(results)
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  },
}

export default {
  rooms: roomsController,
  workspaces: workspacesController,
}
