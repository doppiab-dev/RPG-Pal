import { type TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { type Dispatch, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit'
import type store from '../Store'
import * as ls from './ls'

export const loadState = (): State => {
  try {
    const serializedStore = ls.get('rpgPal')

    if (serializedStore === null || serializedStore === undefined) {
      return {
        userInfo: userInitialState,
        masterInfo: masterInitialState,
        playerInfo: playerInitialState
      }
    }

    return {
      ...serializedStore
    }
  } catch (e) {
    return {
      userInfo: userInitialState,
      masterInfo: masterInitialState,
      playerInfo: playerInitialState
    }
  }
}

export const saveState = (state: State): boolean => {
  const { ...stateToSave } = state
  try {
    ls.set('rpgPal', stateToSave)

    return ls.has('rpgPal')
  } catch (e) {
    return false
  }
}

export const userInitialState: UserStore = {
  user: {
    email: '',
    familyName: '',
    givenName: '',
    hd: '',
    id: '',
    locale: '',
    name: '',
    picture: '',
    verifiedEmail: false
  },
  authStatus: 'idle',
  userInfoStatus: 'idle',
  usernameStatus: 'idle',
  isUserLogged: false,
  token: '',
  userInfo: {
    master: { campaigns: 0 },
    player: { characters: 0 },
    username: null
  },
  errorMessage: ''
}

export const playerInitialState: PlayerStore = {
  characters: [],
  charactersInfoStatus: 'idle',
  errorMessage: ''
}

export const masterInitialState: MasterStore = {
  campaigns: [],
  campaignsInfoStatus: 'idle',
  errorMessage: ''
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector
export const useAppDispatch = (): ThunkDispatch<{
  userInfo: UserStore
}, undefined, UnknownAction> & Dispatch<UnknownAction> => useDispatch<typeof store.dispatch>()

export const formatThunkError = (e: unknown, fallback: string): string =>
  Boolean((e as any).response.data)
    ? toString((e as any).response.data, fallback)
    : toString(e, fallback)

const toString = (data: unknown, fallback: string): string => {
  if (typeof data === 'string') return data
  if (typeof data === 'object') {
    if (data !== null && 'message' in data) { return toString(data.message, fallback) }
    return fallback
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (data as unknown as any).toString()
  }
}
