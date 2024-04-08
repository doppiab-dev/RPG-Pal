import { dbConnectorPostgreDb } from './postgreDb'
import { type DbType } from '../config'
import { type UserInfoDTO } from '../api/types'

export const dbFactory = (dbType: DbType): Connector => {
  if (dbType === 'postgres') return dbConnectorPostgreDb

  throw new Error('DB type not supported: ' + dbType)
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Connector {
  getUserInfo: (userId: string) => Promise<UserInfoDTO>
}
