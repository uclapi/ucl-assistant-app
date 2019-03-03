// @flow
import { WORKSPACES_URL } from "../constants/API";
import {
  WORKSPACES_FETCH_SEATINFOS_FAILURE,
  WORKSPACES_IS_FETCHING_SEATINFOS,
  WORKSPACES_FETCH_SEATINFOS_SUCCESS,
  WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
  WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
  WORKSPACES_IS_FETCHING_HISTORIC_DATA,
  STUDYSPACE_TOGGLE_FAVOURITE,
} from "../constants/studyspacesConstants";

export const setIsFetchingSeatInfos = () => ({
  type: WORKSPACES_IS_FETCHING_SEATINFOS,
});

export const fetchSeatInfosSuccess = data => ({
  data,
  type: WORKSPACES_FETCH_SEATINFOS_SUCCESS,
});

export const fetchSeatInfosFailure = error => ({
  error,
  type: WORKSPACES_FETCH_SEATINFOS_FAILURE,
});

// This action appears to be unused
// export const fetchSeatInfo = (token, id) => async dispatch => {
//   await dispatch(setIsFetchingSeatInfo([id]));
//   try {
//     const res = await fetch(`${WORKSPACES_URL}/${id}/seatinfo`, {
//       headers: {
//         authorization: `Bearer ${token}`,
//       },
//     });
//     const json = await res.json();
//     if (!res.ok) {
//       throw new Error(json.error || "There was a problem");
//     }
//     return dispatch(
//       fetchSeatInfoSuccess(id, {
//         occupied: json.content.occupied,
//         capacity: json.content.total,
//       }),
//     );
//   } catch (error) {
//     return dispatch(
//       fetchSeatInfoFailure(
//         id,
//         typeof error === "string" ? error : error.message,
//       ),
//     );
//   }
// };

export const fetchSeatInfos = (token: String) => async (dispatch: Function) => {
  await dispatch(setIsFetchingSeatInfos());
  try {
    const res = await fetch(`${WORKSPACES_URL}/summary`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    return dispatch(fetchSeatInfosSuccess(json.content));
  } catch (error) {
    return dispatch(
      fetchSeatInfosFailure(typeof error === "string" ? error : error.message),
    );
  }
};

export const setIsFetchingAverages = id => ({
  id,
  type: WORKSPACES_IS_FETCHING_HISTORIC_DATA,
});

export const fetchAveragesSuccess = (id, dailyAverages) => ({
  id,
  dailyAverages,
  type: WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
});

export const fetchAveragesFailure = (id, error) => ({
  id,
  error,
  type: WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
});

export const fetchAverages = (token: String, id: Number) => async (
  dispatch: Function,
) => {
  await dispatch(setIsFetchingAverages(id));
  try {
    const res = await fetch(`${WORKSPACES_URL}/historic?id=${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    return dispatch(fetchAveragesSuccess(id, json.content));
  } catch (error) {
    return dispatch(
      fetchAveragesFailure(
        id,
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};

export const toggleFavourite = id => ({
  id,
  type: STUDYSPACE_TOGGLE_FAVOURITE,
});
