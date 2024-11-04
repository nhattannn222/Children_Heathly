import axios from "axios"
import { API } from "../constants/api"
import { setSensorData } from "../slices/iotSlice"

export const getSensor = (deviceName) => async (dispatch, rejectWithValue) => {
  
    await axios
      .get(`${API.uri}/devices/${deviceName}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          dispatch(setSensorData(response.data))
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }