import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, userInitialState } from '../Utils/store'
import { userInfo } from '../Api/login'

export const authenticateUser = createAsyncThunk(
  'user/authenticate',
  async (id: string, thunkApi: { rejectWithValue: (arg0: string) => any }) => {
    try {
      const response = await userInfo(id)

      return {
        user: response.data,
        token: id
      }
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'authenticateUser error'
      )
    }
  }
)

export const user = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    clearUserState: () => userInitialState,
    logout: (state) => {
      state.isUserLogged = false
    },
    clearUserAuthStatus: (state) => {
      state.authStatus = 'idle'
    },
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: string }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authenticateUser.pending, (state) => {
      state.authStatus = 'loading'
    })
    builder.addCase(authenticateUser.rejected, (state, action) => {
      state.isUserLogged = false
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.user = userInitialState.user
      state.authStatus = 'error'
    })
    builder.addCase(authenticateUser.fulfilled, (state, action) => {
      const { user, token } = action.payload
      state.user = user
      state.token = token
      state.isUserLogged = true
      state.authStatus = 'success'
    })
  }
})

export const {
  clearUserState,
  clearUserAuthStatus,
  logout,
  clearErrorMessage,
  setErrorMessage
} = user.actions

export const selectIsUserLogged = (state: State): State['userInfo']['isUserLogged'] => state.userInfo.isUserLogged
export const selectUser = (state: State): State['userInfo']['user'] => state.userInfo.user
export const selectUserInfoStatus = (state: State): State['userInfo']['authStatus'] => state.userInfo.authStatus
export const selectToken = (state: State): State['userInfo']['token'] => state.userInfo.token
export const selectErrorMessage = (state: State): State['userInfo']['errorMessage'] => state.userInfo.errorMessage
