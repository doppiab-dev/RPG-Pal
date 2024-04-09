/* eslint-disable @typescript-eslint/naming-convention */
import { tableCampaigns, tableGroups } from '../../config'
import { dbConfig } from '.'
import { type GetCampaignsDTO } from '../../api/types'
import { type DBCampaignsGroups } from '../types'

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
