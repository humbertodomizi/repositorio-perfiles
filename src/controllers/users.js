import { v4 as uuidv4 } from 'uuid'

import User from '../models/User.js'
import { userSchema } from '../validations/users.js'

export class UsersController {
  static getAll = async (req, res) => {
    const users = await User.findAll()
    res.status(200).json(users)
  }

  static getByUUID = async (req, res) => {
    const { uuid } = req.params

    const user = await User.findOne({ where: { uuid } })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    res.status(200).json(user)
  }

  static create = async (req, res) => {
    const validateResult = userSchema.safeParse(req.body)

    if (!validateResult.success) {
      return res.status(400).json({ message: 'Hay campos con formatos incorrectos', errors: validateResult.error.errors })
    }

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
  }

  static update = async (req, res) => {
    const { uuid } = req.params

    const validateResult = userSchema.partial().safeParse(req.body)

    if (!validateResult.success) {
      return res.status(400).json({ message: 'Hay campos con formatos incorrectos', errors: validateResult.error.errors })
    }
    const user = await User.findOne({ where: { uuid } })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const userUpdated = await user.update(validateResult.data)

    res.status(200).json({ message: 'Usuario actualizado', user: userUpdated })
  }

  static delete = async (req, res) => {
    const { uuid } = req.params

    const user = await User.findOne({ where: { uuid } })

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    await user.destroy()

    res.status(200).json({ message: 'Usuario eliminado' })
  }
}
