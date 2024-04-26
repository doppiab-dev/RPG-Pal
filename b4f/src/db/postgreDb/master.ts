/* eslint-disable @typescript-eslint/naming-convention */
import { tableCampaigns, tableGroups, tablePlacesOfInterest } from '../../config'
import { dbConfig } from '.'
import { type CampaignStatus, type ListCampaignDTO, type GetCampaignsDTO, type CampaignDTO, type CampaignPlaceOfInterestDTO } from '../../api/types'
import { type DBCampaignGroup, type DBPlacesOfInterest, type DBCampaigns, type DBCampaignsGroups } from '../types'

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

  if (campaigns.rowCount === null || campaigns.rowCount === 0) {
    return []
  }

  return campaigns.rows.map(campaign => ({
    groups: Number(campaign.groups),
    id: campaign.id,
    name: campaign.name,
    status: campaign.status
  }))
}

export const createCampaign = async (user_id: string, name: string): Promise<ListCampaignDTO> => {
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

  if (campaigns.rowCount === null || campaigns.rowCount === 0) throw new Error('create campaign failed')

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

export const deleteCampaign = async (id: string, user_id: string): Promise<void> => {
  const numeric_id = Number(id)
  if (isNaN(numeric_id)) throw new Error('Delete failed, id not valid.')

  const client = await dbConfig.connect()
  const campaignsQuery = `
  DELETE FROM ${tableCampaigns}
  WHERE user_id = $1 AND id = $2
  `
  const campaignsValues = [user_id, id]
  await client.query<DBCampaigns>(campaignsQuery, campaignsValues)
  client.release()
}

export const getCampaign = async (id: string, user_id: string): Promise<CampaignDTO> => {
  const numeric_id = Number(id)
  if (isNaN(numeric_id)) throw new Error('fetch failed, id not valid.')
  const client = await dbConfig.connect()
  const campaignQuery = `
  SELECT c.*, g.id AS group_id, g.name AS group_name
  FROM ${tableCampaigns} c
  LEFT JOIN ${tableGroups} g ON c.id = g.campaign_id
  WHERE c.user_id = $1 AND c.id = $2
  `
  const POIQuery = `
  SELECT * FROM ${tablePlacesOfInterest}
  WHERE user_id = $1 AND campaign_id = $2 AND parent IS NULL
  `
  const values = [user_id, id]
  const campaign = await client.query<DBCampaignGroup>(campaignQuery, values)
  const poi = await client.query<DBPlacesOfInterest>(POIQuery, values)

  client.release()
  if (campaign.rowCount === null || campaign.rowCount === 0) throw new Error('fetch campaign failed')
  if (poi.rowCount === null) throw new Error('fetch poi failed')

  const row = campaign.rows[0]
  const firstPOI = poi.rows.length === 0
    ? null
    : {
      id: poi.rows[0].id,
      name: poi.rows[0].description,
      place: poi.rows[0].place
    } satisfies CampaignPlaceOfInterestDTO

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    plot: row.plot,
    firstPOI,
    groups: campaign.rows.map(row => ({ id: row.group_id, name: row.group_name }))
  }
}
