import { type PlacesOfInterestType } from '../../api/types'
import { type DBPlacesOfInterest } from '../types'

interface ComposePoi {
  places: Record<PlacesOfInterestType, number[]>
  roots: number[]
}
export const composePoi = (rows: DBPlacesOfInterest[]): ComposePoi => {
  const roots: number[] = []
  const places = rows.reduce((acc, row) => {
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

  return { places, roots }
}
