import Permission from '../models/Permission.js'
import { permissionSchema } from '../validations/permission.js'

export class PermissionsController {
  static getAll = async (req, res) => {
    const permissions = await Permission.findAll()
    res.status(200).json(permissions)
  }

  static getByID = async (req, res) => {
    const { id } = req.params
    const permission = await Permission.findOne({ where: { id } })

    if (!permission) {
      return res.status(404).json({ message: 'Permiso no encontrado' })
    }

    res.status(200).json(permission)
  }

  static create = async (req, res) => {
    const validateResult = permissionSchema.safeParse(req.body)

    if (!validateResult.success) {
      return res.status(400).json({ message: 'Hay campos con formatos incorrectos', errors: validateResult.error.errors })
    }

    const permission = await Permission.create(validateResult.data)

    res.status(201).json({
      message: 'Permiso creado',
      permission: {
        action: permission.action
      }
    })
  }

  static update = async (req, res) => {
    const { id } = req.params
    const validateResult = permissionSchema.partial().safeParse(req.body)

    if (!validateResult.success) {
      return res.status(400).json({ message: 'Hay campos con formatos incorrectos', errors: validateResult.error.errors })
    }

    const permission = await Permission.findOne({ where: { id } })

    if (!permission) {
      return res.status(404).json({ message: 'Permiso no encontrado' })
    }

    const updatedPermission = await permission.update(validateResult.data)

    res.status(200).json(updatedPermission)
  }

  static delete = async (req, res) => {
    const { id } = req.params

    const deletedPermission = await Permission.findOne({ where: { id } })

    if (!deletedPermission) {
      return res.status(404).json({ message: 'Permiso no encontrado' })
    }

    await deletedPermission.destroy()

    res.status(200).json({ message: 'Permiso eliminado' })
  }
}
