import { asyncErrWrapper, formatError } from '../errorHandling'
import { missingInBody, validateToken, verifyMissingToken } from './utils'
import { RepositoryType } from '../../config'
import { dbFactory } from '../../db'
import { Logger } from '../../logger'
import { type CreateCampaignBody, type EditCampaignBody } from '../types'
import express from 'express'

export const masterRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.get('/campaigns', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)

    const getCampaignsTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    const data = await db.getCampaigns(userId)
    const fetchTime = Math.round(performance.now() - getCampaignsTimestamp)
    Logger.writeEvent(`Master: fetched campaings in ${fetchTime} ms`)

    return res.status(200).json(data)
  } catch (e) {
    const { status, error } = formatError(e as Error, '006-RESPONSE', 'masterRouter /campaigns get')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.post('/campaign', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const body: CreateCampaignBody = req.body
    const { name } = body
    if (missingInBody(name)) throw new Error('name is missing in body')

    const postCampaignsTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    const data = await db.createCampaign(userId, name)
    const createTime = Math.round(performance.now() - postCampaignsTimestamp)
    Logger.writeEvent(`Master: created campaings in ${createTime} ms`)

    return res.status(200).json(data)
  } catch (e) {
    const { status, error } = formatError(e as Error, '007-RESPONSE', 'masterRouter /campaigns post')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.patch('/campaign/:id', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const body: EditCampaignBody = req.body
    const { name, status } = body
    const { id } = req.params
    if (missingInBody(name)) throw new Error('name is missing in body')
    if (missingInBody(status)) throw new Error('status is missing in body')
    if (missingInBody(id)) throw new Error('id is missing in body')

    const patchCampaignsTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    await db.editCampaign(id, userId, name, status)
    const editTime = Math.round(performance.now() - patchCampaignsTimestamp)
    Logger.writeEvent(`Master: edited campaing in ${editTime} ms`)

    return res.status(204).json()
  } catch (e) {
    const { status, error } = formatError(e as Error, '008-RESPONSE', 'masterRouter /campaign/:id patch')

    return res.status(status).json(error)
  }
}))
