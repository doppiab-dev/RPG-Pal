import { usernameIsValid } from '../Api/user'
import { maxWords, authorization } from './config'
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

  return words.length <= maxWords
    ? text
    : `${words.slice(0, maxWords).join(' ')}…`
}

export const formatPOI = (poi: PlacesOfInterestDTO): PlacesOfInterest => {
  const { points: pois, roots } = poi
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
    roots
  } satisfies PlacesOfInterest
}

export enum PlacesOfInterestValues {
  'world' = 0,
  'continent' = 1,
  'region' = 2,
  'area' = 3,
  'city' = 3,
  'camp' = 3,
  'neighborhood' = 4,
  'point' = 5
}

export enum PlacesOfInterestEnum {
  'world' = 'world',
  'continent' = 'continent',
  'region' = 'region',
  'area' = 'area',
  'city' = 'city',
  'camp' = 'camp',
  'neighborhood' = 'neighborhood',
  'point' = 'point'
}

export const buttonStyle = {
  width: '15vw',
  maxWidth: '250px',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  height: '5vh',
  maxHeight: '40px'
}

export const schema = yup.object().shape({
  text: yup.string()
})

export const removeHtmlTags = (text: string): string =>
  text.replace(/<[^>]*>/g, ' ')
