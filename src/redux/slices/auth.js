import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const registration = createAsyncThunk('auth/registration', async (params) => {
  const { data } = await axios.post('/auth/register', params)
  return data
})

export const login = createAsyncThunk('auth/login', async (params) => {
  const { data } = await axios.post('/auth/login', params)
  return data
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  const { data } = await axios.get('/auth/me')
  return data
})

const initialState = {
  userName: null,
  data: null,
  status: 'loading',
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
      state.userName = null
    },
  },
  extraReducers: {
    [registration.pending]: (state) => {
      state.userName = null
      state.status = 'loading'
    },
    [registration.fulfilled]: (state, action) => {
      state.userName = action.payload.fullName
      state.status = 'loaded'
    },
    [registration.rejected]: (state) => {
      state.userName = null
      state.status = 'error'
    },
    [login.pending]: (state) => {
      state.userName = null
      state.status = 'loading'
    },
    [login.fulfilled]: (state, action) => {
      state.userName = action.payload.fullName
      state.status = 'loaded'
    },
    [login.rejected]: (state) => {
      state.userName = null
      state.status = 'error'
    },
    [fetchAuthMe.pending]: (state) => {
      state.data = null
      state.status = 'loading'
    },
    [fetchAuthMe.fulfilled]: (state, action) => {
      state.data = action.payload
      state.status = 'loaded'
    },
    [fetchAuthMe.rejected]: (state) => {
      state.data = null
      state.status = 'error'
    },
  },
})

export const isAuthSelector = (state) => Boolean(state.auth.userName)
export const isUserInfoSelector = (state) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
