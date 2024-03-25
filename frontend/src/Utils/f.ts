import { usernameIsValid } from '../Api/user'
import { authorization } from './config'

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

export const validateUsername = async (value: string, token: string): Promise<boolean> => {
  try {
    const res = await usernameIsValid(value, token)
    return res.data
  } catch {
    return false
  }
}
export const parseErrorMessage = (error: any): string => typeof error === 'string'
  ? error
  : 'message' in error
    ? error.message
    : JSON.stringify(error)
