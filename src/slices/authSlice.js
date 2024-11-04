import { createSlice } from "@reduxjs/toolkit";
import { loadTokenFromStorage, removeAuthRefreshFromStorage, removeTokenFromStorage } from "../services/AuthService";

const initState = {
  logged: false,
  isRegistered: false,
  authToken: "",
  user: {},
  account: {},
  refresh: null,
  actionStatus: '',
  isFetching: false,
  errors: {},
  errorsRegister: {},
  code: '',
};
const AuthSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setErrors: (state, { payload }) => {
      state.errors = payload;
    },
    setErrorsRegister: (state, { payload }) => {
      state.errorsRegister = payload;
    },
    setAccount: (state, { payload }) => {
      state.account = payload;
    },
    setLogged: (state, { payload }) => {
      state.logged = payload;
    },
    setIsRegisted:(state, { payload }) => {
      state.logged = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setActionStatus: (state, { payload }) => {
      state.actionStatus = payload;
    },
    setRefresh: (state, { payload }) => {
      state.refresh = { fresh: !state.refresh, uri: payload };
    },
    setAuthFetching: (state, { payload }) => {
      state.isFetching = payload;
    },
    setEmailAuth: (state, { payload }) => {
      state.email = payload;
    },
    setCode: (state, { payload }) => {
      state.code = payload;
    },
    loadUser: (state) => {
      state.logged = true;
    },
    logout: (state) => {
      state.logged = false;
    },
  },
});

export const {
  setLogged,
  setIsRegisted,
  loadUser,
  logout,
  setRefresh,
  setActionStatus,
  setUser,
  setEmailAuth,
  setErrors,
  setAuthFetching,
  setErrorsRegister,
  setAccount,
  setCode
} = AuthSlice.actions;

export default AuthSlice.reducer;
