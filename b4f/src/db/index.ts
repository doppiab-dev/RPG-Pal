import { dbConnectorPostgreDb } from './postgreDb'
import { type DbType } from '../config'
import {
  type CampaignStatus,
  type ListCampaignDTO,
  type GetCampaignsDTO,
  type UserInfoDTO,
  type CampaignDTO,
  type PlacesOfInterestType,
  type PlacesOfInterestDTO
} from '../api/types'

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === 'postgres') return dbConnectorPostgreDb

  throw new Error('DB type not supported: ' + dbType)
}

export interface Connector {
  getUserInfo: (userId: string) => Promise<UserInfoDTO>
  checkUsername: (username: string) => Promise<boolean>
  upsetUsername: (username: string, userId: string) => Promise<void>
  deleteUser: (userId: string) => Promise<void>
  getCampaigns: (userId: string) => Promise<GetCampaignsDTO>
  createCampaign: (userId: string, name: string) => Promise<ListCampaignDTO>
  editCampaign: (id: string, userId: string, name: string, status: CampaignStatus) => Promise<void>
  deleteCampaign: (id: string, userId: string) => Promise<void>
  getCampaign: (id: string, userId: string) => Promise<CampaignDTO>
  upsertDescription: (id: string, userId: string, description: string) => Promise<void>
  upsertPlot: (id: string, userId: string, plot: string) => Promise<void>
  createPoi: (id: string, userId: string, name: string, parent: string | null, type: PlacesOfInterestType) => Promise<PlacesOfInterestDTO>
  editPoiName: (id: string, userId: string, name: string, poi: string) => Promise<PlacesOfInterestDTO>
  editPoi: (id: string, userId: string, poi: string, description: string, parent: string | null) => Promise<PlacesOfInterestDTO>
  deletePoi: (id: string, userId: string, poi: string) => Promise<PlacesOfInterestDTO>
}
