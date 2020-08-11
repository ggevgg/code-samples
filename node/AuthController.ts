import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { User } from '../entity/User'
import { jwtSecret, jwtValidityTime } from '../config'
import { USER } from '../constants/userRoles'
import { OK, ERROR } from '../constants/statuses'
import { BAD_CREDENTIALS, EMAIL_IN_USE, PASSWORD_CHANGED } from '../constants/messages'

class AuthController {
  static login = async (req: Request, res: Response) => {

    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send({
        status: ERROR,
        message: BAD_CREDENTIALS,
      })
    }

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail({ where: { email } })
    } catch (error) {
      return res.status(401).send()
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send()
      return
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, username: user.username, role: user.role },
      jwtSecret,
      { expiresIn: jwtValidityTime },
    )

    res.setHeader('token', token)
    res.json({
      user: {
        email: user.email,
        username: user.username,
      },
      status: OK,
    })
  }

  static register = async (req: Request, res: Response) => {

    const { username, email, password } = req.body
    const user = new User()
    user.email = email
    user.username = username
    user.password = password
    user.role = USER

    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send({
        status: ERROR,
        errors,
      })
      return
    }

    user.hashPassword()

    const userRepository = getRepository(User)
    try {
      await userRepository.save(user)
      const token = jwt.sign(
        { userId: user.id, email: user.email, username: user.username, role: user.role },
        jwtSecret,
        { expiresIn: jwtValidityTime },
      )
  
      res.setHeader('token', token)
      res.json({
        user: {
          email: user.email,
          username: user.username,
        },
        status: OK,
      })

    } catch (e) {
      res.status(409).send({
        status: ERROR,
        message: EMAIL_IN_USE,
      })
      return
    }

  }

  static changePassword = async (req: Request, res: Response) => {
    const id = res.locals.jwtPayload.userId

    const { oldPassword, newPassword } = req.body
    if (!(oldPassword && newPassword)) {
      res.status(400).send({
        status: ERROR,
        message: BAD_CREDENTIALS,
      })
    }

    const userRepository = getRepository(User)
    let user: User
    try {
      user = await userRepository.findOneOrFail(id)
    } catch (id) {
      return res.status(401).send()
    }

    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send()
      return
    }

    user.password = newPassword
    const errors = await validate(user)
    if (errors.length > 0) {
      res.status(400).send({
        status: ERROR,
        errors,
      })
      return
    }
    user.hashPassword()
    userRepository.save(user)

    res.status(200).send({
      status: OK,
      message: PASSWORD_CHANGED,
    })
  }

  static refresh = async (req: Request, res: Response) => {
    const { username, email } = res.locals.jwtPayload
    res.send({
      status: OK,
      user: {
        username,
        email,
      },
    })
  }
}
export default AuthController