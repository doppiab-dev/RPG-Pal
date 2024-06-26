/* eslint-disable @typescript-eslint/naming-convention */
import { tableCampaigns, tableGroups, tablePlacesOfInterest, tableTimeline } from '../../config'
import { dbConfig } from '.'
import {
  type CampaignStatus,
  type ListCampaignDTO,
  type GetCampaignsDTO,
  type CampaignDTO,
  type PlacesOfInterestDTO,
  type PlacesOfInterestType,
  PlacesOfInterestValues,
  type TimelineDTO
} from '../../api/types'
import { type DBCampaignGroup, type DBPlacesOfInterest, type DBCampaigns, type DBCampaignsGroups, type DBTimeline } from '../types'
import { composePoi } from './utils'

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
  const values = [user_id, numeric_id]
  const campaign = await client.query<DBCampaignGroup>(campaignQuery, values)

  client.release()
  if (campaign.rowCount === null || campaign.rowCount === 0) throw new Error('fetch campaign failed')

  const { placesOfInterest } = await fetchPoi(id, user_id)
  const timeline = await fetchTimeline(id, user_id)
  const row = campaign.rows[0]

  return {
    id: row.id,
    name: row.name,
    description: row.description ?? '',
    plot: row.plot ?? '',
    placesOfInterest,
    timeline,
    groups: row.group_id === null ? [] : campaign.rows.map(row => ({ id: row.group_id, name: row.group_name }))
  }
}

export const upsertDescription = async (id: string, user_id: string, description: string): Promise<void> => {
  const client = await dbConfig.connect()
  const upsertDescriptionQuery = `
  UPDATE ${tableCampaigns}
  SET description = $1
  WHERE id = $2 AND user_id = $3
  `
  const upsertDescriptionValues = [description, id, user_id]
  await client.query(upsertDescriptionQuery, upsertDescriptionValues)
  client.release()
}

export const upsertPlot = async (id: string, user_id: string, plot: string): Promise<void> => {
  const client = await dbConfig.connect()
  const upsertPlotQuery = `
  UPDATE ${tableCampaigns}
  SET plot = $1
  WHERE id = $2 AND user_id = $3
  `
  const upsertPlotValues = [plot, id, user_id]
  await client.query(upsertPlotQuery, upsertPlotValues)
  client.release()
}

const fetchPoi = async (campaign_id: string, user_id: string): Promise<{ placesOfInterest: PlacesOfInterestDTO }> => {
  const numeric_id = Number(campaign_id)
  if (isNaN(numeric_id)) throw new Error('fetch failed, id not valid.')

  const client = await dbConfig.connect()
  const POIQuery = `
  SELECT * FROM ${tablePlacesOfInterest}
  WHERE user_id = $1 AND campaign_id = $2
  `
  const values = [user_id, numeric_id]
  const pois = await client.query<DBPlacesOfInterest>(POIQuery, values)
  client.release()

  if (pois.rowCount === null) throw new Error('fetch poi failed')
  const { roots } = composePoi(pois.rows)

  return {
    placesOfInterest: {
      roots,
      points: pois.rows.map(row => ({
        ...row,
        description: row.description ?? '',
        thumbnail: row.thumbnail ?? '',
        children: row.children ?? []
      }))
    }
  }
}

const getLocations = async (campaign_id: string, user_id: string): Promise<number[]> => {
  const numeric_id = Number(campaign_id)
  if (isNaN(numeric_id)) throw new Error('fetch failed, id not valid.')

  const client = await dbConfig.connect()
  const locationsQuery = `
  SELECT id FROM ${tablePlacesOfInterest}
  WHERE user_id = $1 AND campaign_id = $2
  `
  const locationsValues = [user_id, numeric_id]
  const locationRes = await client.query<DBPlacesOfInterest>(locationsQuery, locationsValues)
  client.release()

  if (locationRes.rowCount === null || locationRes.rowCount === 0) throw new Error('location list poi failed')

  return locationRes.rows.map(l => l.id)
}

const appendChild = async (campaign_id: string, user_id: string, id: number, parent: string): Promise<void> => {
  const numeric_id = Number(campaign_id)
  if (isNaN(numeric_id)) throw new Error('fetch failed, id not valid.')

  const client = await dbConfig.connect()

  const locations = await getLocations(campaign_id, user_id)
  if (!locations.some(l => l === id)) { // Check for DB consistency
    client.release()
    throw new Error('invalid poi id')
  }

  const updateParentPoiQuery = `
    UPDATE ${tablePlacesOfInterest}
    SET children = array_append(children, $1)
    WHERE campaign_id = $2 AND user_id = $3 AND id = $4
    `
  const updateParentPoiValues = [id, numeric_id, user_id, Number(parent)]
  const rows = await client.query<DBPlacesOfInterest>(updateParentPoiQuery, updateParentPoiValues)
  if (rows.rowCount === null || rows.rowCount === 0) {
    client.release()
    throw new Error('update poi parent failed')
  }
}

const removeChild = async (id: number, numeric_id: number, user_id: string, parent: number): Promise<void> => {
  const client = await dbConfig.connect()

  const updateParentPoiQuery = `
  UPDATE ${tablePlacesOfInterest}
  SET children = array_remove(children, $1)
  WHERE campaign_id = $2 AND user_id = $3 AND id = $4
  `
  const updateParentPoiValues = [id, numeric_id, user_id, Number(parent)]

  const res = await client.query<DBPlacesOfInterest>(updateParentPoiQuery, updateParentPoiValues)
  client.release()

  if (res.rowCount === null || res.rowCount === 0) throw new Error('update poi parent failed')
}

const getParent = async (user_id: string, numeric_id: number, id: number): Promise<number | null> => {
  const client = await dbConfig.connect()

  const parentQuery = `
  SELECT parent FROM ${tablePlacesOfInterest}
  WHERE user_id = $1 AND campaign_id = $2 AND id = $3
  `
  const parentValues = [user_id, numeric_id, id]
  const res = await client.query<DBPlacesOfInterest>(parentQuery, parentValues)
  client.release()

  if (res.rowCount === null || res.rowCount === 0) throw new Error('edit poi failed')

  return res.rows[0].parent
}

const checkValidPlaceParentType = async (user_id: string, numeric_id: number, id: string, place: PlacesOfInterestType): Promise<void> => {
  const client = await dbConfig.connect()
  const query = `
  SELECT place FROM ${tablePlacesOfInterest}
  WHERE user_id = $1 AND campaign_id = $2 AND id = $3
  `
  const values = [user_id, numeric_id, Number(id)]
  const res = await client.query<DBPlacesOfInterest>(query, values)
  client.release()

  if (res.rowCount === null || res.rowCount === 0) throw new Error('fetch failed, parent not valid')

  const parentPlace = res.rows[0].place
  if (PlacesOfInterestValues[parentPlace] >= PlacesOfInterestValues[place]) throw new Error('fetch failed, parent not valid.')
}

export const createPoi = async (
  campaign_id: string,
  user_id: string,
  name: string,
  parent: string | null,
  place: PlacesOfInterestType
): Promise<PlacesOfInterestDTO> => {
  const numeric_id = Number(campaign_id)
  if (isNaN(numeric_id)) throw new Error('fetch failed, id not valid.')
  if (parent !== null && isNaN(Number(parent))) throw new Error('fetch failed, parent not valid.')
  if (parent !== null) await checkValidPlaceParentType(user_id, numeric_id, parent, place)

  const client = await dbConfig.connect()
  const createPoiQuery = `
  INSERT INTO ${tablePlacesOfInterest}
  (user_id, campaign_id, name, place, parent)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id
  `
  const createPoiValues = [user_id, numeric_id, name, place, parent === null ? parent : Number(parent)]
  const res = await client.query<DBPlacesOfInterest>(createPoiQuery, createPoiValues)
  client.release()
  if (res.rowCount === null || res.rowCount === 0) throw new Error('create poi failed')

  if (parent !== null) {
    const { id } = res.rows[0]
    await appendChild(campaign_id, user_id, id, parent)
  }

  const { placesOfInterest } = await fetchPoi(campaign_id, user_id)

  return placesOfInterest
}

export const editPoiName = async (
  campaign_id: string,
  user_id: string,
  name: string,
  poi: string
): Promise<PlacesOfInterestDTO> => {
  const numeric_id = Number(campaign_id)
  const id = Number(poi)
  if (isNaN(numeric_id)) throw new Error('fetch failed, campaign id not valid.')
  if (isNaN(id)) throw new Error('fetch failed, id not valid.')

  const client = await dbConfig.connect()
  const editPoiNameQuery = `
  UPDATE ${tablePlacesOfInterest}
  SET name = $1
  WHERE campaign_id = $2 AND user_id = $3 AND id = $4
  `
  const editPoiNameValues = [name, numeric_id, user_id, id]
  const res = await client.query<DBPlacesOfInterest>(editPoiNameQuery, editPoiNameValues)
  client.release()

  if (res.rowCount === null || res.rowCount === 0) throw new Error('edit poi failed')

  const { placesOfInterest } = await fetchPoi(campaign_id, user_id)

  return placesOfInterest
}

export const editPoi = async (
  campaign_id: string,
  user_id: string,
  poi: string,
  description: string,
  thumbnail: string,
  parent: string | null
): Promise<PlacesOfInterestDTO> => {
  const numeric_id = Number(campaign_id)
  const id = Number(poi)
  if (isNaN(numeric_id)) throw new Error('fetch failed, campaign id not valid.')
  if (isNaN(id)) throw new Error('fetch failed, id not valid.')
  if (parent !== null && isNaN(Number(parent))) throw new Error('fetch failed, parent not valid.')

  const client = await dbConfig.connect()
  const poiQuery = `
  SELECT place FROM ${tablePlacesOfInterest}
  WHERE user_id = $1 AND campaign_id = $2 AND id = $3
  `
  const poiValues = [user_id, numeric_id, Number(id)]
  const poiRes = await client.query<DBPlacesOfInterest>(poiQuery, poiValues)
  if (poiRes.rowCount === null || poiRes.rowCount === 0) {
    client.release()
    throw new Error('edit poi failed')
  }
  const place = poiRes.rows[0].place
  if (parent !== null) await checkValidPlaceParentType(user_id, numeric_id, parent, place)

  const oldParent = await getParent(user_id, numeric_id, id)

  const editPoiQuery = `
  UPDATE ${tablePlacesOfInterest}
  SET description = $1, parent = $2, thumbnail = $3
  WHERE campaign_id = $4 AND user_id = $5 AND id = $6
  `
  const editPoiValues = [description, parent === null ? parent : Number(parent), thumbnail, numeric_id, user_id, id]
  const res = await client.query<DBPlacesOfInterest>(editPoiQuery, editPoiValues)

  client.release()

  if (res.rowCount === null || res.rowCount === 0) throw new Error('edit poi failed')

  if (oldParent !== Number(parent)) {
    if (oldParent !== null) {
      await removeChild(id, numeric_id, user_id, oldParent)
    }
    if (parent !== null) {
      await appendChild(campaign_id, user_id, id, parent)
    }
  }

  const { placesOfInterest } = await fetchPoi(campaign_id, user_id)

  return placesOfInterest
}

export const deletePoi = async (campaign_id: string, user_id: string, poi: string): Promise<PlacesOfInterestDTO> => {
  const numeric_id = Number(campaign_id)
  const id = Number(poi)
  if (isNaN(numeric_id)) throw new Error('fetch failed, campaign id not valid.')
  if (isNaN(id)) throw new Error('fetch failed, id not valid.')

  const client = await dbConfig.connect()

  const parent = await getParent(user_id, numeric_id, id)

  const deletePoiQuery = `
  DELETE FROM ${tablePlacesOfInterest}
  WHERE user_id = $1 AND campaign_id = $2 AND id = $3
  RETURNING id
  `
  const deletePoiValues = [user_id, numeric_id, id]
  const res = await client.query<DBPlacesOfInterest>(deletePoiQuery, deletePoiValues)
  client.release()

  if (res.rowCount === null || res.rowCount === 0) throw new Error('delete poi failed')

  if (parent !== null) {
    await removeChild(id, numeric_id, user_id, parent)
  }

  const { placesOfInterest } = await fetchPoi(campaign_id, user_id)

  return placesOfInterest
}

const fetchTimeline = async (id: string, user_id: string): Promise<TimelineDTO[]> => {
  const numeric_id = Number(id)
  if (isNaN(numeric_id)) throw new Error('fetch failed, id not valid.')

  const client = await dbConfig.connect()
  const timelineQuery = `
  SELECT *
  FROM ${tableTimeline}
  WHERE user_id = $1 AND campaign_id = $2
  ORDER BY position
  `
  const timelineValues = [user_id, numeric_id]
  const timeline = await client.query<DBTimeline>(timelineQuery, timelineValues)

  client.release()
  if (timeline.rowCount === null || timeline.rowCount === 0) return []

  return timeline.rows.map(row => ({
    id: row.id,
    description: row.description ?? '',
    name: row.name,
    date: row.date,
    position: row.position
  }))
}

export const upsertTimelineEvent = async (
  campaign_id: string,
  user_id: string,
  name: string,
  date: string,
  position: number | null,
  description: string,
  event: number | null
): Promise<TimelineDTO[]> => {
  const numeric_id = Number(campaign_id)
  if (isNaN(numeric_id)) throw new Error('fetch failed, id not valid.')

  const client = await dbConfig.connect()

  if (position !== null) {
    const checkTimelineQuery = `
      SELECT * FROM ${tableTimeline}
      WHERE user_id = $1 AND campaign_id = $2 AND position = $3
    `
    const checkTimelineValues = [user_id, numeric_id, position]
    const res = await client.query<DBTimeline>(checkTimelineQuery, checkTimelineValues)
    if (res.rowCount !== null && res.rowCount > 0) {
      const toMoveEventsQuery = `
      SELECT * FROM ${tableTimeline}
      WHERE user_id = $1 AND campaign_id = $2 AND position >= $3
      ORDER BY position DESC
      `
      const toMoveEvents = [user_id, numeric_id, position]
      const toMove = await client.query<DBTimeline>(toMoveEventsQuery, toMoveEvents)
      if (toMove.rowCount !== null && toMove.rowCount > 0) {
        let updateQuery = `
          UPDATE ${tableTimeline}
          SET position = CASE
        `
        toMove.rows.forEach(row => {
          updateQuery += `
          WHEN id = ${row.id} THEN ${row.position + 1}
        `
        })
        updateQuery += `
            ELSE position
          END
          WHERE id IN (${toMove.rows.map(row => row.id).join(', ')})
        `
        await client.query<DBTimeline>(updateQuery)
      }
    }
  }

  const upsertTimelineQuery = event === null
    ? `
      INSERT INTO ${tableTimeline}
      (user_id, campaign_id, name, description, date, position)
      VALUES ($1, $2, $3, $4, $5, $6)
    `
    : `
      UPDATE ${tableTimeline}
      SET name = $3, description = $4, date = $5
      WHERE campaign_id = $2 AND user_id = $1 AND id = $6
    `
  const upsertTimelineValues = [user_id, numeric_id, name, description, date]
  const res = await client.query<DBTimeline>(upsertTimelineQuery, event === null ? [...upsertTimelineValues, position] : [...upsertTimelineValues, event])
  client.release()
  if (res.rowCount === null || res.rowCount === 0) throw new Error('upsert timeline event failed')

  const timeline = await fetchTimeline(campaign_id, user_id)

  return timeline
}

export const deleteTimelineEvent = async (campaign_id: string, user_id: string, event: string): Promise<TimelineDTO[]> => {
  const numeric_id = Number(campaign_id)
  const id = Number(event)
  if (isNaN(numeric_id)) throw new Error('fetch failed, campaign id not valid.')
  if (isNaN(id)) throw new Error('fetch failed, event not valid.')

  const client = await dbConfig.connect()
  const deleteTimelineEventQuery = `
  DELETE FROM ${tableTimeline}
  WHERE user_id = $1 AND campaign_id = $2 AND id = $3
  RETURNING id
  `
  const deleteTimelineEventValues = [user_id, numeric_id, id]
  const res = await client.query<DBTimeline>(deleteTimelineEventQuery, deleteTimelineEventValues)
  client.release()
  if (res.rowCount === null || res.rowCount === 0) throw new Error('delete timeline event failed')

  const timeline = await fetchTimeline(campaign_id, user_id)

  return timeline
}
