import { usernameIsValid } from '../Api/user'
import { authorization } from './config'
import * as yup from 'yup'

export const apply = <T>(x: T, f: (x: T) => T): T => f(x)

export const effect =
  <T>(action: (x: T) => void) =>
    (x: T): T | PromiseLike<T> => {
      const val = x
      action(val)

      return val
    }

export const vhToPixel = (vh: number, height: number): number =>
  (vh * height) / 100

export const vwToPixel = (vw: number, width: number): number =>
  (vw * width) / 100

export const hexToRgb = (hex: string): string => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgb(${r}, ${g}, ${b})`
}

interface Headers {
  headers: Record<string, string>
}
export const createApiHeaders = (token: string): Headers => ({
  headers: {
    [authorization]: `Bearer ${token}`
  }
})

export const validateUsername = async (token: string, value: string): Promise<boolean> => {
  try {
    const val = value.trim()
    if (val === '') return false

    const res = await usernameIsValid(token, val)
    return res.data
  } catch {
    return false
  }
}

export const parseErrorMessage = (error: any): string => {
  if (typeof error === 'string') {
    return error
  } else if ('message' in error) {
    return error.message
  } else {
    return JSON.stringify(error)
  }
}

export enum CampaignTypeEnum {
  'active' = 'active',
  'on_hold' = 'on_hold',
  'ended' = 'ended'
}

export const shrinkText = (text: string): string => {
  const words = text.split(' ')

  return words.length <= 200
    ? text
    : `${words.slice(0, 200).join(' ')}…`
}

export const formatPOI = (poi: PlacesOfInterestDTO): PlacesOfInterest => {
  const { places, points: pois, roots } = poi
  const points = pois.reduce((acc, curr) => {
    acc[curr.id] = {
      name: curr.name,
      place: curr.place,
      description: curr.description,
      parent: curr.parent,
      children: curr.children
    }
    return acc
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  }, {} as unknown as Record<number, PlaceOfInterestPoint>)

  return {
    points,
    places,
    roots
  } satisfies PlacesOfInterest
}

export const schema = yup.object().shape({
  text: yup.string()
})
