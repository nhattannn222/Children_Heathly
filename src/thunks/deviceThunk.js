import axios from 'axios'
import { API } from '../constants/api'
import { loadTokenFromStorage } from '../services/AuthService'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import Toast from 'react-native-toast-message'

export const getSensorDevice = (id) => async (dispatch, rejectWithValue) => {
  await axios
    .get(`${API.uri}/sensors/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response) {
        dispatch(setSingleJob(response?.data?.result?.content))
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

export const connectDevice = (id, data) => async (
  dispatch,
  rejectWithValue,
) => {
  try {
    await axios
      .put(`${API.uri}/sensors/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          Toast.show({
            type: TOAST_SUCCESS,
            text1: 'Thành công',
          })
        }
      })
      .catch((error) => {
        Toast.show({
          type: TOAST_ERROR,
          text1: 'Hãy kiểm tra lại thiết bị',
        })
      })
  } catch (error) {
    console.log('error', error)
  }
}
