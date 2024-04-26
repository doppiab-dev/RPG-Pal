import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, masterInitialState } from '../Utils/store'
import { campaign, campaigns, createCampaign, deleteCampaign, editCampaign } from '../Api/master'

export const retrieveMasterInfo = createAsyncThunk(
  'retrieveMasterInfo',
  async ({ token }: Authenticated, thunkApi) => {
    try {
      const response = await campaigns(token)
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'retrieveMasterInfo error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type CreateACampaign = Authenticated & {
  name: string
}

export const createACampaign = createAsyncThunk(
  'createCampaign',
  async ({ token, name }: CreateACampaign, thunkApi) => {
    try {
      const response = await createCampaign(token, name)
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'createACampaign error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type EditACampaign = Authenticated & {
  name: string
  status: CampaignStatus
  id: number
}

export const editACampaign = createAsyncThunk(
  'editACampaign',
  async ({ token, name, status, id }: EditACampaign, thunkApi) => {
    try {
      await editCampaign(token, name, status, id)
      return { name, id, status }
    } catch (e) {
      const error = formatThunkError(e, 'editACampaign error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type DeleteACampaign = Authenticated & {
  id: number
}

export const deleteACampaign = createAsyncThunk(
  'deleteACampaign',
  async ({ token, id }: DeleteACampaign, thunkApi) => {
    try {
      await deleteCampaign(token, id)
      return { id }
    } catch (e) {
      const error = formatThunkError(e, 'deleteACampaign error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type FetchACampaign = Authenticated & {
  id: number
}

export const fetchACampaign = createAsyncThunk(
  'fetchACampaign',
  async ({ token, id }: FetchACampaign, thunkApi) => {
    try {
      const response = await campaign(token, id)
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'fetchACampaign error')

      return thunkApi.rejectWithValue(error)
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
      state.campaigns = [...action.payload]
      state.campaignsInfoStatus = 'success'
    })
    builder.addCase(createACampaign.pending, (state) => {
      state.campaignsInfoStatus = 'loading'
    })
    builder.addCase(createACampaign.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignsInfoStatus = 'error'
    })
    builder.addCase(createACampaign.fulfilled, (state, action) => {
      state.campaigns = [...state.campaigns, action.payload]
      state.campaignsInfoStatus = 'success'
    })
    builder.addCase(editACampaign.pending, (state) => {
      state.campaignsInfoStatus = 'loading'
    })
    builder.addCase(editACampaign.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignsInfoStatus = 'error'
    })
    builder.addCase(editACampaign.fulfilled, (state, action) => {
      const { id, name, status } = action.payload
      const campaigns = [...state.campaigns]
      state.campaigns = campaigns.map(campaign => ({
        ...campaign,
        name: id === campaign.id ? name : campaign.name,
        status: id === campaign.id ? status : campaign.status
      }))
      state.campaignsInfoStatus = 'success'
    })
    builder.addCase(deleteACampaign.pending, (state) => {
      state.campaignsInfoStatus = 'loading'
    })
    builder.addCase(deleteACampaign.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignsInfoStatus = 'error'
    })
    builder.addCase(deleteACampaign.fulfilled, (state, action) => {
      const { id } = action.payload
      const campaigns = [...state.campaigns]
      state.campaigns = campaigns.filter(campaign => campaign.id !== id)
      state.campaignsInfoStatus = 'success'
    })
    builder.addCase(fetchACampaign.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(fetchACampaign.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(fetchACampaign.fulfilled, (state, action) => {
      state.campaign = action.payload
      state.campaignInfoStatus = 'success'
    })
  }
})

export const {
  clearMasterState,
  clearErrorMessage,
  setErrorMessage
} = master.actions

export const selectCampaigns = (state: State): State['masterInfo']['campaigns'] => state.masterInfo.campaigns
export const selectCampaignsInfoStatus = (state: State): State['masterInfo']['campaignsInfoStatus'] => state.masterInfo.campaignsInfoStatus
export const selectCampaignInfoStatus = (state: State): State['masterInfo']['campaignInfoStatus'] => state.masterInfo.campaignInfoStatus
export const selectErrorMessage = (state: State): State['masterInfo']['errorMessage'] => state.masterInfo.errorMessage
