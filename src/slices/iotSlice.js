import { createSlice } from '@reduxjs/toolkit'

const initState = {
  allSensor: [],
  searchSensor: [],
  singleSensor: {},
  paginationSensor: {},
  errors: {},
  sensorData: {}
}
const SensorsSlice = createSlice({
  name: 'Sensor',
  initialState: initState,
  reducers: {
    setAllSensor: (state, { payload }) => {
      state.allSensor = payload
    },
    setSearchSensor: (state, { payload }) => {
      state.searchSensor = payload
    },
    setSingleSensor: (state, { payload }) => {
      state.singleSensor = payload
    },
    setErrors: (state, { payload }) => {
      state.errors = payload
    },
    setPaginationSensor: (state, { payload }) => {
      state.paginationSensor = payload
    },
    setSensorData: (state, { payload }) => {
      state.sensorData = payload
    },
  },
})

export const {
  setAllSensor,
  setSearchSensor,
  setSingleSensor,
  setErrors,
  setPaginationSensor,
  setSensorData
} = SensorsSlice.actions

export default SensorsSlice.reducer
