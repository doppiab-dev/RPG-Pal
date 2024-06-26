import { asyncErrWrapper, formatError } from '../errorHandling'
import { validateToken, verifyMissingToken } from './utils'
import { RepositoryType } from '../../config'
import { dbFactory } from '../../db'
import { Logger } from '../../logger'
import { type UsernameBody } from '../types'
import express from 'express'

export const userRouter = express.Router()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.get('/info', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)

    const getUserInfoTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    const data = await db.getUserInfo(userId)
    const fetchTime = Math.round(performance.now() - getUserInfoTimestamp)
    Logger.writeEvent(`User: fetched user in ${fetchTime} ms`)

    return res.status(200).json(data)
  } catch (e) {
    const { status, error } = formatError(e as Error, '003-RESPONSE', 'userRouter /info get')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.get('/username/:username', asyncErrWrapper(async (req, res) => {
  try {
    const { username } = req.params
    const token = verifyMissingToken(req.headers.authorization)
    validateToken(token)

    const checkUsernameTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    const data = await db.checkUsername(username)
    const fetchTime = Math.round(performance.now() - checkUsernameTimestamp)
    Logger.writeEvent(`User: check username in ${fetchTime} ms`)

    return res.status(200).json(data)
  } catch (e) {
    formatError(e as Error, '004-RESPONSE', 'userRouter /username/:username get')

    return res.status(200).json(false)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.post('/username', asyncErrWrapper(async (req, res) => {
  try {
    const body: UsernameBody = req.body
    const { username } = body
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)

    const setUsernameTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    await db.upsetUsername(username, userId)
    const fetchTime = Math.round(performance.now() - setUsernameTimestamp)
    Logger.writeEvent(`User: set username in ${fetchTime} ms`)

    return res.status(204).json()
  } catch (e) {
    const { status, error } = formatError(e as Error, '005-RESPONSE', 'userRouter /username/ post')

    return res.status(status).json(error)
  }
}))

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.delete('/', asyncErrWrapper(async (req, res) => {
  try {
    const token = verifyMissingToken(req.headers.authorization)
    const { userId } = validateToken(token)

    const deleteUserTimestamp = performance.now()
    const db = dbFactory(RepositoryType)
    await db.deleteUser(userId)
    const fetchTime = Math.round(performance.now() - deleteUserTimestamp)
    Logger.writeEvent(`User: delete user in ${fetchTime} ms`)

    return res.status(204).json()
  } catch (e) {
    const { status, error } = formatError(e as Error, '010-RESPONSE', 'userRouter / delete')

    return res.status(status).json(error)
  }
}))
