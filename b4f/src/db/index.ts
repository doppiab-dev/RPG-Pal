import { dbConnectorPostgreDb } from './postgreDb'
import { type DbType } from '../config'
import { type CampaignStatus, type ListCampaignDTO, type GetCampaignsDTO, type UserInfoDTO, type CampaignDTO } from '../api/types'

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
}
