import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, userInitialState } from '../Utils/store'
import { googleLogin } from '../Api/login'
import { updateUsername, userInfo } from '../Api/user'

export const authenticateUser = createAsyncThunk(
  'authenticateUser',
  async (id: string, thunkApi: { rejectWithValue: (arg0: string) => any }) => {
    try {
      const response = await googleLogin(id)

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

export const retrieveUserInfo = createAsyncThunk(
  'retrieveUserInfo',
  async ({ token }: Authenticated, thunkApi) => {
    try {
      const response = await userInfo(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveUserInfo error'
      )
    }
  }
)

type UpdateTheUsername = Authenticated & {
  username: string
}

export const updateTheUsername = createAsyncThunk(
  'updateTheUsername',
  async ({ token, username }: UpdateTheUsername, thunkApi) => {
    try {
      await updateUsername(token, username)
      return { username }
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'updateTheUsername error'
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
    builder.addCase(retrieveUserInfo.pending, (state) => {
      state.userInfoStatus = 'loading'
    })
    builder.addCase(retrieveUserInfo.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.userInfo = userInitialState.userInfo
      state.userInfoStatus = 'error'
    })
    builder.addCase(retrieveUserInfo.fulfilled, (state, action) => {
      state.userInfo = { ...action.payload }
      state.userInfoStatus = 'success'
    })
    builder.addCase(updateTheUsername.pending, (state) => {
      state.usernameStatus = 'loading'
    })
    builder.addCase(updateTheUsername.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.username = userInitialState.username
      state.usernameStatus = 'error'
    })
    builder.addCase(updateTheUsername.fulfilled, (state, action) => {
      const { username } = { ...action.payload }
      state.username = username
      state.usernameStatus = 'success'
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
export const selectAuthStatus = (state: State): State['userInfo']['authStatus'] => state.userInfo.authStatus
export const selectUsernameStatus = (state: State): State['userInfo']['authStatus'] => state.userInfo.usernameStatus
export const selectUserInfoStatus = (state: State): State['userInfo']['authStatus'] => state.userInfo.userInfoStatus
export const selectToken = (state: State): State['userInfo']['token'] => state.userInfo.user.id // TODO: change this to state.userInfo.token when implement login BE explicit flow
export const selectUsername = (state: State): State['userInfo']['username'] => state.userInfo.username
export const selectUserInfo = (state: State): State['userInfo']['userInfo'] => state.userInfo.userInfo
export const selectErrorMessage = (state: State): State['userInfo']['errorMessage'] => state.userInfo.errorMessage
