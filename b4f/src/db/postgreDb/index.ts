import { DbName, DbPort, DbPass, DbUser, DbHost } from '../../config'
import { Pool } from 'pg'
import { getUserInfo, checkUsername, upsetUsername, deleteUser } from './user'
import {
  getCampaigns,
  createCampaign,
  editCampaign,
  deleteCampaign,
  getCampaign,
  upsertPlot,
  upsertDescription,
  createPoi,
  editPoiName,
  editPoi
} from './master'
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
  upsetUsername,
  deleteUser,
  getCampaigns,
  createCampaign,
  editCampaign,
  deleteCampaign,
  getCampaign,
  upsertDescription,
  upsertPlot,
  createPoi,
  editPoiName,
  editPoi
}
