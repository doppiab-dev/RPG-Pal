import {
  type EnhancedStore,
  type StoreEnhancer,
  type ThunkDispatch,
  type Tuple,
  type UnknownAction,
  configureStore
} from '@reduxjs/toolkit'
import { loadState, saveState } from '../Utils/store'
import { user } from './users'
import { player } from './player'
import { master } from './master'

const setupStore = (state: State): EnhancedStore<{
  userInfo: UserStore
  masterInfo: MasterStore
  playerInfo: PlayerStore
}, UnknownAction, Tuple<[StoreEnhancer<{
  dispatch: ThunkDispatch<{ userInfo: UserStore, masterInfo: MasterStore, playerInfo: PlayerStore }, undefined, UnknownAction>
}>, StoreEnhancer]>> =>
  configureStore({
    reducer: {
      userInfo: user.reducer,
      masterInfo: master.reducer,
      playerInfo: player.reducer
    },
    preloadedState: state
  })

const store = setupStore(loadState())

store.subscribe(() => saveState(store.getState()))

export default store
