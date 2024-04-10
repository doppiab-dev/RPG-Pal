import { dbConnectorPostgreDb } from './postgreDb'
import { type DbType } from '../config'
import { type CampaignDTO, type GetCampaignsDTO, type UserInfoDTO } from '../api/types'

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === 'postgres') return dbConnectorPostgreDb

  throw new Error('DB type not supported: ' + dbType)
}

export interface Connector {
  getUserInfo: (userId: string) => Promise<UserInfoDTO>
  checkUsername: (username: string) => Promise<boolean>
  setUsername: (username: string, userId: string) => Promise<void>
  getCampaigns: (userId: string) => Promise<GetCampaignsDTO>
  createCampaign: (userId: string, name: string) => Promise<CampaignDTO>
}
