import axios from 'axios'
import { delaySynC, setToken } from '../services/AuthService'
import { setAuthFetching, setLogged, setUser } from '../slices/authSlice'
import { API } from '../constants/api'
import Toast from 'react-native-toast-message'
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast'
import { setAllSensor } from '../slices/iotSlice'

export const login = (data) => async (dispatch, rejectWithValue) => {
  try {
    dispatch(setAuthFetching(true))
    await delaySynC(1)
    console.log('data', data)
    await axios
      .post(`${API.uri}/login`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      .then((response) => {
        
        Toast.show({
          type: TOAST_SUCCESS,
          text1: 'Đăng nhập thành công',
        })
        dispatch(setUser(response?.data?.data))
        dispatch(setLogged(true))
      })
      .catch((error) => {
        console.log('data', error)
        Toast.show({
            type: TOAST_ERROR,
            text1: "Đăng nhập không thành công hãy kiểm tra lại dữ liệu",
          })
      })
  } catch (e) {
    console.log('e', e)
  }
}
