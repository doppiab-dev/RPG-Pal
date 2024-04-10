/* eslint-disable @typescript-eslint/naming-convention */
import { tableCampaigns, tableGroups } from '../../config'
import { dbConfig } from '.'
import { type CampaignStatus, type CampaignDTO, type GetCampaignsDTO } from '../../api/types'
import { type DBCampaigns, type DBCampaignsGroups } from '../types'

export const getCampaigns = async (user_id: string): Promise<GetCampaignsDTO> => {
  const client = await dbConfig.connect()
  const campaignsQuery = `
  SELECT c.*, COUNT(DISTINCT g.id) AS groups
  FROM ${tableCampaigns} c
  LEFT JOIN ${tableGroups} g ON c.id = g.campaign_id
  WHERE c.user_id = $1
  GROUP BY c.id
  `
  const campaignsValues = [user_id]
  const campaigns = await client.query<DBCampaignsGroups>(campaignsQuery, campaignsValues)
  client.release()

  if (campaigns.rowCount == null || campaigns.rowCount === 0) {
    return []
  }

  return campaigns.rows.map(campaign => ({
    groups: campaign.groups,
    id: campaign.id,
    name: campaign.name,
    status: campaign.status
  }))
}

export const createCampaign = async (user_id: string, name: string): Promise<CampaignDTO> => {
  const status = 'active'
  const client = await dbConfig.connect()
  const campaignsQuery = `
  INSERT INTO ${tableCampaigns}
  (user_id, name, status)
  VALUES ($1, $2, $3)
  RETURNING id
  `
  const campaignsValues = [user_id, name, status]
  const campaigns = await client.query<DBCampaigns>(campaignsQuery, campaignsValues)
  client.release()

  if (campaigns.rowCount == null || campaigns.rowCount === 0) throw new Error('create campaign failed')

  return {
    id: campaigns.rows[0].id,
    groups: 0,
    name,
    status
  }
}

export const editCampaign = async (id: string, user_id: string, name: string, status: CampaignStatus): Promise<void> => {
  const numeric_id = Number(id)
  if (isNaN(numeric_id)) throw new Error('Edit failed, id not valid.')

  const client = await dbConfig.connect()
  const campaignsQuery = `
  UPDATE ${tableCampaigns}
  SET user_id = $1, name = $2, status = $3
  WHERE id = $4
  `
  const campaignsValues = [user_id, name, status, id]
  await client.query<DBCampaigns>(campaignsQuery, campaignsValues)
  client.release()
}
