import { DbName, DbPort, DbPass, DbUser, DbHost } from '../../config'
import { Pool } from 'pg'
import { getUserInfo, checkUsername, setUsername } from './user'
import { getCampaigns } from './master'
import { type Connector } from '..'

export const dbConfig = new Pool({
  host: DbHost,
  user: DbUser,
  database: DbName,
  password: DbPass,
  port: Number(DbPort)
})

export const dbConnectorPostgreDb: Connector = {
  getUserInfo,
  checkUsername,
  setUsername,
  getCampaigns
}
