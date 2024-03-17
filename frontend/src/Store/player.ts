import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, playerInitialState } from '../Utils/store'
import { characters } from '../Api/player'

export const retrievePlayerInfo = createAsyncThunk(
  'retrievePlayerInfo',
  async ({ token }: Authenticated, thunkApi) => {
    try {
      const response = await characters(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrievePlayerInfo error'
      )
    }
  }
)

export const player = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    clearPlayerState: () => playerInitialState,
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: string }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(retrievePlayerInfo.pending, (state) => {
      state.charactersInfoStatus = 'loading'
    })
    builder.addCase(retrievePlayerInfo.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.characters = playerInitialState.characters
      state.charactersInfoStatus = 'error'
    })
    builder.addCase(retrievePlayerInfo.fulfilled, (state, action) => {
      state.characters = { ...action.payload }
      state.charactersInfoStatus = 'success'
    })
  }
})

export const {
  clearPlayerState,
  clearErrorMessage,
  setErrorMessage
} = player.actions

export const selectCharacters = (state: State): State['playerInfo']['characters'] => state.playerInfo.characters
export const selectCharacterInfoStatus = (state: State): State['playerInfo']['charactersInfoStatus'] => state.playerInfo.charactersInfoStatus
export const selectErrorMessage = (state: State): State['playerInfo']['errorMessage'] => state.playerInfo.errorMessage
