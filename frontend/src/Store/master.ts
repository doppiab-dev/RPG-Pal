import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, masterInitialState } from '../Utils/store'
import { campaigns } from '../Api/master'

export const retrieveMasterInfo = createAsyncThunk(
  'retrieveMasterInfo',
  async ({ token }: Authenticated, thunkApi) => {
    try {
      const response = await campaigns(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e)

      return thunkApi.rejectWithValue(
        Boolean(error.message) ? error.message : 'retrieveMasterInfo error'
      )
    }
  }
)

export const master = createSlice({
  name: 'master',
  initialState: masterInitialState,
  reducers: {
    clearMasterState: () => masterInitialState,
    clearErrorMessage: (state) => {
      state.errorMessage = ''
    },
    setErrorMessage: (state, action: { payload: string }) => {
      state.errorMessage = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(retrieveMasterInfo.pending, (state) => {
      state.campaignsInfoStatus = 'loading'
    })
    builder.addCase(retrieveMasterInfo.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaigns = masterInitialState.campaigns
      state.campaignsInfoStatus = 'error'
    })
    builder.addCase(retrieveMasterInfo.fulfilled, (state, action) => {
      state.campaigns = { ...action.payload }
      state.campaignsInfoStatus = 'success'
    })
  }
})

export const {
  clearMasterState,
  clearErrorMessage,
  setErrorMessage
} = master.actions

export const selectCampaigns = (state: State): State['masterInfo']['campaigns'] => state.masterInfo.campaigns
export const selectCharacterInfoStatus = (state: State): State['masterInfo']['campaignsInfoStatus'] => state.masterInfo.campaignsInfoStatus
export const selectErrorMessage = (state: State): State['masterInfo']['errorMessage'] => state.masterInfo.errorMessage
