import axios from 'axios'
import { API } from '../constants/api'
import { loadTokenFromStorage } from '../services/AuthService'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import Toast from 'react-native-toast-message'
import { setAllSensor } from '../slices/iotSlice'


export const connectDevice = (deviceId, data) => async (
  dispatch,
  rejectWithValue,
) => {
  try {
    await axios
      .get(`${API.uri}/devices/status/${deviceId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response) {
          
          if(response.data[0].status){
            Toast.show({
              type: TOAST_SUCCESS,
              text1: 'Thành công',
            })
            dispatch(setAllSensor(response.data))
          }
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
