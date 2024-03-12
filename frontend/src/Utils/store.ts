import { type AxiosError } from 'axios'
import { type TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import { type Dispatch, type ThunkDispatch, type UnknownAction } from '@reduxjs/toolkit'
import type store from '../Store'
import * as ls from './ls'

export const loadState = (): State => {
  try {
    const serializedStore = ls.get('rpgPal')

    if (serializedStore === null || serializedStore === undefined) {
      return {
        userInfo: userInitialState
      }
    }

    return {
      ...serializedStore
    }
  } catch (e) {
    return {
      userInfo: userInitialState
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
  isUserLogged: false,
  authStatus: 'idle',
  token: '',
  errorMessage: ''
}

export const useAppSelector: TypedUseSelectorHook<State> = useSelector
export const useAppDispatch = (): ThunkDispatch<{
  userInfo: UserStore
}, undefined, UnknownAction> & Dispatch<UnknownAction> => useDispatch<typeof store.dispatch>()

export const formatThunkError = (e: unknown): AxiosError =>
  Boolean((e as any).response.data) ? (e as any).response.data : e as AxiosError
