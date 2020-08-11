import { Request, Response } from 'express'
import { v4 } from 'uuid'

import _debug from 'debug'
const debug = _debug('peercalls:otl')

import * as turn from '../turn'
import { config } from '../peerCallsConfig'
import { validateOneTimeJwt, generateOneTimeLink } from '../oneTimeUrl'
import { clientUrl } from '../config'
const cfgIceServers = config.iceServers

class OneTimeLinkController {

  static decode = async (req: Request, res: Response) => {
    const { oneTimeJwt } = req.params
    if (!oneTimeJwt) {
      return res.redirect(`${clientUrl}`)
    }
    const roomId = await validateOneTimeJwt(oneTimeJwt, req.app.locals.stores)
    debug('decode: oneTimeJwt %s, roomId %s', oneTimeJwt, roomId)

    if (!roomId) {
      debug('decode: link isn\'t available %s', oneTimeJwt)
      return res.redirect(`${clientUrl}`)
    }

    const iceServers = turn.processServers(cfgIceServers)
    res.render('call', {
      callId: roomId,
      userId: v4(),
      nickname: req.headers['x-forwarded-user'] || '',
      iceServers,
      oneTimeJwt,
      clientUrl,
    })

  }

  static generateOneTimeLink = async (req: Request, res: Response) => {
    const { room } = req.params

    if (!room) {
      return res.redirect(`${clientUrl}`)
    }

    const oneTimeLink = await generateOneTimeLink(room, req.app.locals.stores)

    res.send({
      room,
      oneTimeLink,
    })
  }

}

export default OneTimeLinkController