import { configureStore } from '@reduxjs/toolkit'
import authSlice from '../slices/authSlice'
import iotSlice from '../slices/iotSlice'
import deviceSlice from '../slices/deviceSlice'
import notificationSlice from '../slices/notificationSlice'

export const store = configureStore({
  reducer: {
    IoTReducer: iotSlice,
    authReducer: authSlice,
    deviceReducer: deviceSlice,
    notificationReducer: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})
