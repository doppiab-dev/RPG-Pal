import { type PlacesOfInterestType } from '../../api/types'
import { type DBPlacesOfInterest } from '../types'

interface ComposePoi {
  roots: number[]
}
export const composePoi = (rows: DBPlacesOfInterest[]): ComposePoi => {
  const roots: number[] = []
  rows.reduce((acc, row) => { // TODO: use this to set places if needed
    if (acc[row.place] === undefined) {
      acc[row.place] = [row.id]
    } else {
      acc[row.place] = [...acc[row.place], row.id]
    }

    if (row.parent === null) {
      roots.push(row.id)
    }

    return acc
    // eslint-disable-next-line @typescript-eslint/prefer-reduce-type-parameter
  }, {} as unknown as Record<PlacesOfInterestType, number[]>)

  return { roots }
}
