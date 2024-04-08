import { DbName, DbPort, DbPass, DbUser, DbHost } from '../../config'
import { Pool } from 'pg'
import { getUserInfo, checkUsername } from './user'
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
  checkUsername
}
