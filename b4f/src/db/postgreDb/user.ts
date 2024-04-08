/* eslint-disable @typescript-eslint/naming-convention */
import { tableCampaigns, tablePlayers, tableUsers } from '../../config'
import { dbConfig } from '.'
import { type UserInfoDTO } from '../../api/types'
import { type DBUserInfo } from '../types'

export const getUserInfo = async (user_id: string): Promise<UserInfoDTO> => {
  const client = await dbConfig.connect()
  const userInfoQuery = `
  SELECT u.username, COUNT(DISTINCT p.id) AS characters, COUNT(DISTINCT c.id) AS campaigns
  FROM ${tableUsers} u
  LEFT JOIN ${tablePlayers} p ON u.google_id = p.user_id
  LEFT JOIN ${tableCampaigns} c ON u.google_id = c.user_id
  WHERE u.google_id = $1
  GROUP BY u.username
  `
  const userInfoValues = [user_id]
  const userInfos = await client.query<DBUserInfo>(userInfoQuery, userInfoValues)
  client.release()

  if (userInfos.rowCount == null || userInfos.rowCount === 0) {
    return {
      username: null,
      master: { campaigns: 0 },
      player: { characters: 0 }
    }
  }

  const userInfo = userInfos.rows[0]

  return {
    username: userInfo.username ?? null,
    master: { campaigns: userInfo.campaigns ?? 0 },
    player: { characters: userInfo.characters ?? 0 }
  }
}
