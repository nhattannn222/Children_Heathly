import axios from 'axios';
import { delaySynC, setToken } from '../services/AuthService';
import { setAuthFetching, setLogged, setUser } from '../slices/authSlice';
import { API } from '../constants/api';
import Toast from 'react-native-toast-message';
import { TOAST_ERROR, TOAST_SUCCESS } from '../constants/toast';
import { setAllSensor } from '../slices/iotSlice';
import { useNavigation } from "@react-navigation/native";

export const login = (data) => async (dispatch) => {
  try {
    dispatch(setAuthFetching(true));
    console.log('data', data);

    const response = await axios.post(`${API.uri}/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    console.log(response.data);
    
    Toast.show({
      type: 'success',
      text1: 'Đăng nhập thành công',
    });
    dispatch(setUser(response.data));
    dispatch(setLogged(true));

  } catch (error) {
    console.log('Error details:', {
      message: error.message,
      responseData: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });

    if (error.response) {
      Toast.show({
        type: 'error',
        text1: 'Đăng nhập không thành công',
        text2: error.response.data.message || 'Kiểm tra lại dữ liệu của bạn',
      });
    } else if (error.request) {
      console.log('Request made but no response:', error.request);
      Toast.show({
        type: 'error',
        text1: 'Không nhận được phản hồi từ máy chủ',
      });
    } else {
      console.log('Error setting up the request:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Đã xảy ra lỗi khi thiết lập yêu cầu',
      });
    }
  } finally {
    dispatch(setAuthFetching(false));
  }
};

// Cập nhật hàm register
export const register = (data, navigation) => async (dispatch) => {
  dispatch(setAuthFetching(true)); // Start loading state

  try {
    const response = await axios.post(`${API.uri}/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    console.log(response.data); // Consider removing or handling logging in production

    Toast.show({
      type: TOAST_SUCCESS,
      text1: 'Đăng ký thành công',
    });

    // Navigate to the login page
    navigation.navigate("Đăng Nhập"); // Ensure route name is correct

  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      responseData: error.response ? error.response.data : null,
      status: error.response ? error.response.status : null,
    });

    if (error.response) {
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Đăng ký không thành công',
        text2: error.response.data.message || 'Kiểm tra lại dữ liệu của bạn',
      });
    } else if (error.request) {
      console.error('Request made but no response:', error.request);
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Không nhận được phản hồi từ máy chủ',
      });
    } else {
      console.error('Error setting up the request:', error.message);
      Toast.show({
        type: TOAST_ERROR,
        text1: 'Đã xảy ra lỗi khi thiết lập yêu cầu',
      });
    }
  } finally {
    dispatch(setAuthFetching(false)); // End loading state
  }
};
