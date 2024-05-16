export const playerInitialState = {
  characters: [],
  charactersInfoStatus: 'idle',
  errorMessage: ''
}

export const masterInitialState = {
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
    timeline: [],
    groups: []
  },
  campaignsInfoStatus: 'idle',
  campaignInfoStatus: 'idle',
  errorMessage: ''
}