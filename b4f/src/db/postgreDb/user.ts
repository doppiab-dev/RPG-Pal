/* eslint-disable @typescript-eslint/naming-convention */
import { tableCampaigns, tablePlayers, tableUsers } from '../../config'
import { dbConfig } from '.'
import { type UserInfoDTO } from '../../api/types'
import { type DBCheckUsername, type DBUserInfo } from '../types'

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
    master: { campaigns: userInfo.campaigns != null ? Number(userInfo.campaigns) : 0 },
    player: { characters: userInfo.characters != null ? Number(userInfo.characters) : 0 }
  }
}

export const checkUsername = async (username: string): Promise<boolean> => {
  const client = await dbConfig.connect()
  const checkUsernameQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM ${tableUsers}
      WHERE username = $1
    ) as exists;
  `
  const checkUsernameValues = [username.toLocaleLowerCase()]
  const check = await client.query<DBCheckUsername>(checkUsernameQuery, checkUsernameValues)
  client.release()

  if (check.rowCount == null) return false

  return !check.rows[0].exists
}

export const upsetUsername = async (username: string, google_id: string): Promise<void> => {
  const client = await dbConfig.connect()
  const upsertUsernameQuery = `
  INSERT INTO ${tableUsers}
  (username, google_id)
  VALUES ($1, $2)
  ON CONFLICT (google_id) DO UPDATE
  SET username = EXCLUDED.username;
  `
  const upsertUsernameValues = [username.toLocaleLowerCase(), google_id]
  await client.query(upsertUsernameQuery, upsertUsernameValues)
  client.release()
}

export const deleteUser = async (google_id: string): Promise<void> => {
  const client = await dbConfig.connect()
  const deleteUserQuery = `
  DELETE FROM ${tableUsers}
  WHERE google_id = $1;
  `
  const deleteUserValues = [google_id]
  await client.query(deleteUserQuery, deleteUserValues)
  client.release()
}
