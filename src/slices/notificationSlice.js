import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allNotification: [],
  searchNotification: [],
  singleNotification: {},
  paginationNotification: {},
  errors: {},
}
const NotificationsSlice = createSlice({
  name: 'Notification',
  initialState: initState,
  reducers: {
    setAllNotification: (state, { payload }) => {
      state.allNotification = payload
    },
    setSearchNotification: (state, { payload }) => {
      state.searchNotification = payload
    },
    setSingleNotification: (state, { payload }) => {
      state.singleNotification = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationNotification: (state, { payload }) => {
      state.paginationNotification = payload
    },
  },
})

export const {
  setAllNotification,
  setSearchNotification,
  setSingleNotification,
  setErrors,
  setPaginationNotification
} = NotificationsSlice.actions

export default NotificationsSlice.reducer
