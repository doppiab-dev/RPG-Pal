import express, { type Request, type Response } from 'express'
import { ServerPort } from '../config'
import { Logger } from '../logger'
import { userRouter } from './routers/user'
import { masterRouter } from './routers/master'

export const apiRouter = express.Router()

/**
 * @swagger
 * /api/healthcheck:
 *  get:
 *    summary: Restituisce un messaggio di saluto
 *    responses:
 *      200:
 *        message: I'm alive and answering on port XXXX
 *    tags:
 *      - Healthcheck
 *
 *  @swagger
 * components:
 *   schemas:
 *     GenericError:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         code:
 *           type: string
 */
apiRouter.get('/healthcheck', (_req: Request, res: Response) =>
  res.json({ message: `I'm alive and answering on port ${ServerPort}` })
)

apiRouter.use((req, _res, next) => {
  Logger.writeEvent(`Received ${req.method} request to ${req.path}`)
  next()
})

apiRouter.use('/user', userRouter)
apiRouter.use('/master', masterRouter)
