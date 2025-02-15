import Role from '../models/Role.js'
import { roleSchema } from '../validations/role.js'

export class RolesController {
  static getAll = async (req, res) => {
    const roles = await Role.findAll()
    res.status(200).json(roles)
  }

  static getByID = async (req, res) => {
    const { id } = req.params
    const role = await Role.findOne({ where: { id } })

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' })
    }

    res.status(200).json(role)
  }

  static create = async (req, res) => {
    const validateResult = roleSchema.safeParse(req.body)

    if (!validateResult.success) {
      return res.status(400).json({ message: 'Hay campos con formatos incorrectos', errors: validateResult.error.errors })
    }

    const role = await Role.create(validateResult.data)

    res.status(201).json({
      message: 'Rol creado',
      role: {
        name: role.name
      }
    })
  }

  static update = async (req, res) => {
    const { id } = req.params
    const validateResult = roleSchema.partial().safeParse(req.body)

    if (!validateResult.success) {
      return res.status(400).json({ message: 'Hay campos con formatos incorrectos', errors: validateResult.error.errors })
    }
    const role = await Role.findOne({ where: { id } })

    if (!role) {
      return res.status(404).json({ message: 'Rol no encontrado' })
    }

    const updatedRole = await role.update(validateResult.data)

    res.status(200).json(updatedRole)
  }

  static delete = async (req, res) => {
    const { id } = req.params

    const deletedRole = await Role.findOne({ where: { id } })

    if (!deletedRole) {
      return res.status(404).json({ message: 'Rol no encontrado' })
    }

    await deletedRole.destroy()

    res.status(200).json({ message: 'Rol eliminado' })
  }
}
