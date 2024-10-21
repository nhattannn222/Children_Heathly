import axios from "axios"
import { setAllNotification } from "../slices/notificationSlice"
import { API } from "../constants/api"

export const getNotification = (id) => async (dispatch, rejectWithValue) => {
    await axios
      .get(`${API.uri}/sensors/alert/user/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setAllNotification(response?.data?.alert))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }