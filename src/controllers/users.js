import { v4 as uuidv4 } from 'uuid'

import { handleErrors } from '../helpers/handleErrors.js'
import User from '../models/User.js'
import { userSchema } from '../validations/users.js'

export class UsersController {
  static getAll = async (req, res) => {
    try {
      const users = await User.findAll()
      res.status(200).json(users)
    } catch (error) {
      handleErrors(res, error)
    }
  }

  static getByUUID = async (req, res) => {
    try {
      const { uuid } = req.params

      const user = await User.findOne({ where: { uuid } })

      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
        return
      }

      res.status(200).json(user)
    } catch (error) {
      handleErrors(res, error)
    }
  }

  static create = async (req, res) => {
    const validateResult = userSchema.safeParse(req.body)

    if (!validateResult.success) {
      res.status(400).json({ message: 'Hay campos con formatos incorrectos', errors: validateResult.error.errors })
      return
    }

    try {
      const user = await User.create({ ...validateResult.data, uuid: uuidv4() })
      res.status(201).json({
        message: 'Usuario creado',
        user: {
          uuid: user.uuid,
          name: user.name,
          lastName: user.lastName,
          email: user.email
        }
      })
    } catch (error) {
      handleErrors(res, error)
    }
  }

  static update = async (req, res) => {
    const { uuid } = req.params

    const validateResult = userSchema.partial().safeParse(req.body)

    if (!validateResult.success) {
      res.status(400).json({ message: 'Hay campos con formatos incorrectos', errors: validateResult.error.errors })
      return
    }

    try {
      const user = await User.findOne({ where: { uuid } })

      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
        return
      }

      const userUpdated = await user.update(validateResult.data)

      res.status(200).json({ message: 'Usuario actualizado', user: userUpdated })
    } catch (error) {
      handleErrors(res, error)
    }
  }

  static delete = async (req, res) => {
    try {
      const { uuid } = req.params

      const user = await User.findOne({ where: { uuid } })

      if (!user) {
        res.status(404).json({ message: 'Usuario no encontrado' })
        return
      }

      const userDeleted = await user.destroy()

      if (!userDeleted) {
        res.status(404).json({ message: 'Usuario no encontrado' })
        return
      }

      res.status(200).json({ message: 'Usuario eliminado' })
    } catch (error) {
      handleErrors(res, error)
    }
  }
}
