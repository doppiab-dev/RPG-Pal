export const playerInitialState: PlayerStore = {
  characters: [],
  charactersInfoStatus: 'idle',
  errorMessage: ''
}

export const masterInitialState: MasterStore = {
  campaigns: [],
  campaign: {
    id: 0,
    name: '',
    description: '',
    plot: '',
    placesOfInterest: {
      points: {},
      roots: []
    },
    groups: []
  },
  campaignsInfoStatus: 'idle',
  campaignInfoStatus: 'idle',
  errorMessage: ''
}