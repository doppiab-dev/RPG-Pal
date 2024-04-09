import { asyncErrWrapper, formatError } from '../errorHandling'
import { validateToken, verifyMissingToken } from './utils'
import { RepositoryType } from '../../config'
import { dbFactory } from '../../db'
import { Logger } from '../../logger'
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
