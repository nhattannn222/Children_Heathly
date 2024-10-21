import axios from "axios"
import { API } from "../constants/api"
import { setAllSensor } from "../slices/iotSlice"

export const getSensor = (id) => async (dispatch, rejectWithValue) => {
    await axios
      .get(`${API.uri}/sensors/user/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setAllSensor(response?.data?.data?.sensors))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }