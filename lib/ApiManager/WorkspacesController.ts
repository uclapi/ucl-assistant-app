import axios from 'axios'
import { encode as btoa } from "base-64"
import { WORKSPACES_URL } from '../../constants/API'
import { JWT } from '../../types/uclapi'
import ErrorManager from '../ErrorManager'
import LocalisationManager from '../LocalisationManager'

const workspacesApi = axios.create({
  baseURL: WORKSPACES_URL,
})

class WorkspacesController {
  static getLiveImage = async (token: JWT, { surveyId, mapId }) => {
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
  }

  static getSummary = async (token: JWT) => {
    try {
      const { data, headers } = await workspacesApi.get(`/summary`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if (!data.content || data.error !== ``) {
        throw new Error(data.error || `There was a problem`)
      }
      return {
        data: data.content,
        lastModified: LocalisationManager.parseToMoment(
          headers[`last-modified`],
        ),
      }
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }

  static getWorkspaces = async (token: JWT) => {
    try {
      const { data, headers } = await workspacesApi.get(`/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      if (!data.content || data.error !== ``) {
        throw new Error(data.error)
      }
      return {
        data: data.content,
        lastModified: LocalisationManager.parseToMoment(
          headers[`last-modified`],
        ),
      }
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }
}

export default WorkspacesController
