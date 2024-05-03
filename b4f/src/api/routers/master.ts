import { asyncErrWrapper, formatError } from '../errorHandling'
import { missingInBody, validateToken, verifyMissingToken } from './utils'
import { RepositoryType } from '../../config'
import { dbFactory } from '../../db'
import { Logger } from '../../logger'
import {
  type UpsertDescriptionBody,
  type UpsertPlotBody,
  type CreateCampaignBody,
  type EditCampaignBody,
  type CreatePoiBody,
  type UpdatePoiNameBody,
  type UpdatePoiBody
} from '../types'
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

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.delete('/campaign/:id', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const { id } = req.params
    if (missingInBody(id)) throw new Error('id is missing')

    const deleteCampaignsTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    await db.deleteCampaign(id, userId)
    const deleteTime = Math.round(performance.now() - deleteCampaignsTimestamp)
    Logger.writeEvent(`Master: deleted campaing in ${deleteTime} ms`)

    return res.status(204).json()
  } catch (e) {
    const { status, error } = formatError(e as Error, '009-RESPONSE', 'masterRouter /campaign/:id delete')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.get('/campaign/:id', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const { id } = req.params
    if (missingInBody(id)) throw new Error('id is missing')

    const fetchCampaignTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    const data = await db.getCampaign(id, userId)
    const fetchTime = Math.round(performance.now() - fetchCampaignTimestamp)
    Logger.writeEvent(`Master: fetch campaing in ${fetchTime} ms`)

    return res.status(200).json(data)
  } catch (e) {
    const { status, error } = formatError(e as Error, '011-RESPONSE', 'masterRouter /campaign/:id get')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.put('/campaign/:id/description', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const body: UpsertDescriptionBody = req.body
    const { description } = body
    const { id } = req.params
    if (missingInBody(description)) throw new Error('description is missing in body')
    if (missingInBody(id)) throw new Error('id is missing in body')

    const putDescriptionTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    await db.upsertDescription(id, userId, description)
    const upsertTime = Math.round(performance.now() - putDescriptionTimestamp)
    Logger.writeEvent(`Master: upsert description in ${upsertTime} ms`)

    return res.status(204).json()
  } catch (e) {
    const { status, error } = formatError(e as Error, '012-RESPONSE', 'masterRouter /campaign/:id/description put')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.put('/campaign/:id/plot', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const body: UpsertPlotBody = req.body
    const { plot } = body
    const { id } = req.params
    if (missingInBody(plot)) throw new Error('plot is missing in body')
    if (missingInBody(id)) throw new Error('id is missing in body')

    const putPlotTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    await db.upsertPlot(id, userId, plot)
    const upsertTime = Math.round(performance.now() - putPlotTimestamp)
    Logger.writeEvent(`Master: upsert plot in ${upsertTime} ms`)

    return res.status(204).json()
  } catch (e) {
    const { status, error } = formatError(e as Error, '013-RESPONSE', 'masterRouter /campaign/:id/plot put')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.post('/campaign/:id/poi', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const body: CreatePoiBody = req.body
    const { name, parent, type } = body
    const { id } = req.params
    if (missingInBody(name)) throw new Error('name is missing in body')
    if (missingInBody(type)) throw new Error('type is missing in body')
    if (parent === undefined || parent === '') throw new Error('parent value is invalid')
    if (missingInBody(id)) throw new Error('id is missing in body')

    const createPoiTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    const data = await db.createPoi(id, userId, name, parent, type)
    const createTime = Math.round(performance.now() - createPoiTimestamp)
    Logger.writeEvent(`Master: create poi in ${createTime} ms`)

    return res.status(200).json(data)
  } catch (e) {
    const { status, error } = formatError(e as Error, '014-RESPONSE', 'masterRouter /campaign/:id/poi post')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.patch('/campaign/:id/poi/:poi', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const body: UpdatePoiNameBody = req.body
    const { name } = body
    const { id, poi } = req.params
    if (missingInBody(name)) throw new Error('name is missing in body')
    if (missingInBody(poi)) throw new Error('poi id is missing in body')
    if (missingInBody(id)) throw new Error('id is missing in body')

    const editPoiTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    const data = await db.editPoiName(id, userId, name, poi)
    const editTime = Math.round(performance.now() - editPoiTimestamp)
    Logger.writeEvent(`Master: edit poi name in ${editTime} ms`)

    return res.status(200).json(data)
  } catch (e) {
    const { status, error } = formatError(e as Error, '015-RESPONSE', 'masterRouter /campaign/:id/poi/:id patch')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
masterRouter.put('/campaign/:id/poi/:poi', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)
    const body: UpdatePoiBody = req.body
    const { description, parent } = body
    const { id, poi } = req.params
    if (missingInBody(description)) throw new Error('description is missing in body')
    if (missingInBody(poi)) throw new Error('poi id is missing in body')
    if (missingInBody(id)) throw new Error('id is missing in body')
    if (parent === undefined || parent === '') throw new Error('parent value is invalid')

    const editPoiTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    const data = await db.editPoi(id, userId, poi, description, parent)
    const editTime = Math.round(performance.now() - editPoiTimestamp)
    Logger.writeEvent(`Master: edit poi in ${editTime} ms`)

    return res.status(200).json(data)
  } catch (e) {
    const { status, error } = formatError(e as Error, '016-RESPONSE', 'masterRouter /campaign/:id/poi/:id put')

    return res.status(status).json(error)
  }
}))
