import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { formatThunkError, masterInitialState } from '../Utils/store'
import {
  campaign,
  campaigns,
  createCampaign,
  createPoi,
  deleteCampaign,
  deletePoi,
  deleteTimelineEvent,
  editCampaign,
  editPoi,
  editPoiName,
  upsertDescription,
  upsertPlot,
  upsertTimelineEvent
} from '../Api/master'
import { formatPOI } from '../Utils/f'
import { sanitize } from 'dompurify'

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
      const response = await createCampaign(token, sanitize(name))
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
      const newName = sanitize(name)
      await editCampaign(token, newName, status, id)
      return { name: newName, id, status }
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

type UpsertADescription = Authenticated & {
  id: number
  description: string
}

export const upsertADescription = createAsyncThunk(
  'upsertADescription',
  async ({ token, id, description }: UpsertADescription, thunkApi) => {
    try {
      const newDescription = sanitize(description)
      await upsertDescription(token, id, newDescription)
      return { description: newDescription }
    } catch (e) {
      const error = formatThunkError(e, 'upsertADescription error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type UpsertAPlot = Authenticated & {
  id: number
  plot: string
}

export const upsertAPlot = createAsyncThunk(
  'upsertAPlot',
  async ({ token, id, plot }: UpsertAPlot, thunkApi) => {
    try {
      const newPlot = sanitize(plot)
      await upsertPlot(token, id, newPlot)
      return { plot: newPlot }
    } catch (e) {
      const error = formatThunkError(e, 'upsertAPlot error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type DeleteAPoi = Authenticated & {
  id: number
  poi: number
}

export const deleteAPoi = createAsyncThunk(
  'deleteAPoi',
  async ({ token, id, poi }: DeleteAPoi, thunkApi) => {
    try {
      const response = await deletePoi(token, id, poi)
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'deleteAPoi error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type EditAPoiName = Authenticated & {
  id: number
  poi: number
  name: string
}

export const editAPoiName = createAsyncThunk(
  'editAPoiName',
  async ({ token, id, poi, name }: EditAPoiName, thunkApi) => {
    try {
      const response = await editPoiName(token, id, poi, sanitize(name))
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'editAPoiName error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type CreateAPoi = Authenticated & {
  id: number
  parent: string | null
  name: string
  type: PlacesOfInterestType
}

export const createAPoi = createAsyncThunk(
  'createAPoi',
  async ({ token, id, name, parent, type }: CreateAPoi, thunkApi) => {
    try {
      const response = await createPoi(token, id, parent, sanitize(name), type)
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'createAPoi error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type EditAPoi = Authenticated & {
  id: number
  poi: number
  description: string
  thumbnail: string
  parent: string | null
}

export const editAPoi = createAsyncThunk(
  'editAPoi',
  async ({ token, id, poi, description, parent, thumbnail }: EditAPoi, thunkApi) => {
    try {
      const response = await editPoi(token, id, poi, sanitize(description), parent, sanitize(thumbnail))
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'editAPoi error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type UpsertATimelineEvent = Authenticated & {
  id: number
  position: number | null
  name: string
  description: string
  date: string
  event: number | null
}

export const upsertATimelineEvent = createAsyncThunk(
  'upsertATimelineEvent',
  async ({ token, date, description, event, name, id, position }: UpsertATimelineEvent, thunkApi) => {
    try {
      const response = await upsertTimelineEvent(token, id, position, name, description, date, event)
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'upsertATimelineEvent error')

      return thunkApi.rejectWithValue(error)
    }
  }
)

type DeleteATimelineEvent = Authenticated & {
  id: number
  event: number
}

export const deleteATimelineEvent = createAsyncThunk(
  'deleteATimelineEvent',
  async ({ token, id, event }: DeleteATimelineEvent, thunkApi) => {
    try {
      const response = await deleteTimelineEvent(token, id, event)
      return response.data
    } catch (e) {
      const error = formatThunkError(e, 'deleteATimelineEvent error')

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
    },
    setTabs: (state, action: { payload: TabTypes }) => {
      state.tabs = action.payload
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
      state.errorMessage = ''
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
      state.errorMessage = ''
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
      state.errorMessage = ''
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
      state.errorMessage = ''
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
      const { description, groups, id, name, plot, placesOfInterest: poi, timeline } = action.payload
      const placesOfInterest = formatPOI(poi)
      state.campaign = {
        description,
        groups,
        id,
        name,
        plot,
        placesOfInterest,
        timeline
      }
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
    builder.addCase(upsertADescription.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(upsertADescription.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(upsertADescription.fulfilled, (state, action) => {
      const { description } = action.payload
      state.campaign.description = description
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
    builder.addCase(upsertAPlot.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(upsertAPlot.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(upsertAPlot.fulfilled, (state, action) => {
      const { plot } = action.payload
      state.campaign.plot = plot
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
    builder.addCase(editAPoiName.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(editAPoiName.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(editAPoiName.fulfilled, (state, action) => {
      const placesOfInterest = formatPOI(action.payload)
      state.campaign = {
        ...state.campaign,
        placesOfInterest
      }
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
    builder.addCase(deleteAPoi.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(deleteAPoi.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(deleteAPoi.fulfilled, (state, action) => {
      const placesOfInterest = formatPOI(action.payload)
      state.campaign = {
        ...state.campaign,
        placesOfInterest
      }
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
    builder.addCase(createAPoi.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(createAPoi.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(createAPoi.fulfilled, (state, action) => {
      const placesOfInterest = formatPOI(action.payload)
      state.campaign = {
        ...state.campaign,
        placesOfInterest
      }
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
    builder.addCase(editAPoi.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(editAPoi.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(editAPoi.fulfilled, (state, action) => {
      const placesOfInterest = formatPOI(action.payload)
      state.campaign = {
        ...state.campaign,
        placesOfInterest
      }
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
    builder.addCase(upsertATimelineEvent.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(upsertATimelineEvent.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(upsertATimelineEvent.fulfilled, (state, action) => {
      state.campaign = {
        ...state.campaign,
        timeline: action.payload
      }
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
    builder.addCase(deleteATimelineEvent.pending, (state) => {
      state.campaignInfoStatus = 'loading'
    })
    builder.addCase(deleteATimelineEvent.rejected, (state, action) => {
      state.errorMessage = Boolean(action.error) && typeof action.error === 'string'
        ? action.error
        : action.payload as string
      state.campaignInfoStatus = 'error'
    })
    builder.addCase(deleteATimelineEvent.fulfilled, (state, action) => {
      state.campaign = {
        ...state.campaign,
        timeline: action.payload
      }
      state.campaignInfoStatus = 'success'
      state.errorMessage = ''
    })
  }
})

export const {
  clearMasterState,
  clearErrorMessage,
  setErrorMessage,
  setTabs
} = master.actions

export const selectCampaigns = (state: State): State['masterInfo']['campaigns'] => state.masterInfo.campaigns
export const selectCampaignsInfoStatus = (state: State): State['masterInfo']['campaignsInfoStatus'] => state.masterInfo.campaignsInfoStatus
export const selectCampaignInfoStatus = (state: State): State['masterInfo']['campaignInfoStatus'] => state.masterInfo.campaignInfoStatus
export const selectErrorMessage = (state: State): State['masterInfo']['errorMessage'] => state.masterInfo.errorMessage
export const selectCampaign = (state: State): State['masterInfo']['campaign'] => state.masterInfo.campaign
export const selectTabs = (state: State): State['masterInfo']['tabs'] => state.masterInfo.tabs
