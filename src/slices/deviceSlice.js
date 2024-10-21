import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allDevice: [],
  searchDevice: [],
  singleDevice: {},
  paginationDevice: {},
  errors: {},
}
const DevicesSlice = createSlice({
  name: 'Device',
  initialState: initState,
  reducers: {
    setAllDevice: (state, { payload }) => {
      state.allDevice = payload
    },
    setSearchDevice: (state, { payload }) => {
      state.searchDevice = payload
    },
    setSingleDevice: (state, { payload }) => {
      state.singleDevice = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationDevice: (state, { payload }) => {
      state.paginationDevice = payload
    },
  },
})

export const {
  setAllDevice,
  setSearchDevice,
  setSingleDevice,
  setErrors,
  setPaginationDevice
} = DevicesSlice.actions

export default DevicesSlice.reducer
