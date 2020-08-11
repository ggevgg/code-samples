import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { validate } from 'class-validator'

import { User } from '../entity/User'
import { USER_NOT_FOUND, EMAIL_IN_USE, USER_CREATED, USER_UPDATED, USER_DELETED } from '../constants/messages'
import { ERROR, OK } from '../constants/statuses'

class UserController{

static listAll = async (req: Request, res: Response) => {
  const userRepository = getRepository(User)
  const users = await userRepository.find({
    select: ['id', 'email', 'username', 'role'],
  })

  res.send(users)
}

static getOneById = async (req: Request, res: Response) => {
  const id: string = req.params.id

  const userRepository = getRepository(User)
  try {
    const user = await userRepository.findOneOrFail(id, {
      select: ['id', 'email', 'username', 'role'],
    })
    res.send({
      status: OK,
      user,
    })
  } catch (error) {
    res.status(404).send({
      status: ERROR,
      message: USER_NOT_FOUND,
    })
  }
}

static newUser = async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body
  const user = new User()
  user.email = email
  user.username = username
  user.password = password
  user.role = role

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
  } catch (e) {
    res.status(409).send({
      status: ERROR,
      message: EMAIL_IN_USE,
    })
    return
  }

  res.status(201).send({
    status: OK,
    message: USER_CREATED,
  })
}

static editUser = async (req: Request, res: Response) => {
  const id = req.params.id

  const { email, username, role } = req.body

  const userRepository = getRepository(User)
  let user
  try {
    user = await userRepository.findOneOrFail(id)
  } catch (error) {
    res.status(404).send({
      status: ERROR,
      message: USER_NOT_FOUND,
    })
    return
  }

  user.email = email
  user.username = username
  user.role = role
  const errors = await validate(user)
  if (errors.length > 0) {
    res.status(400).send({
      status: ERROR,
      errors,
    })
    return
  }

  try {
    await userRepository.save(user)
  } catch (e) {
    res.status(409).send({
      status: ERROR,
      message: EMAIL_IN_USE,
    })
    return
  }
  res.status(204).send({
    status: OK,
    message: USER_UPDATED,
  })
}

static deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id

  const userRepository = getRepository(User)
  let user: User
  try {
    user = await userRepository.findOneOrFail(id)
  } catch (error) {
    res.status(404).send({
      status: ERROR, 
      message: USER_NOT_FOUND,
    })
    return
  }
  userRepository.delete(id)

  res.status(204).send({
    status: OK,
    message: USER_DELETED,
  })
  }
}

export default UserController