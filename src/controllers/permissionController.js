import permissionService from '../services/permissionService.js';
import { handleErrors } from '../helpers/handleErrors.js';

const fetchAllPermissions = async (req, res) => {
  try {
    const permissions = await permissionService.fetchAllPermissions();
    res.status(200).json(permissions);
  } catch (error) {
    handleErrors(res, error);
  }
};

const fetchPermissionById = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await permissionService.fetchPermissionById(id);

    if (!permission) {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(permission);
  } catch (error) {
    handleErrors(res, error);
  }
};

const createPermission = async (req, res) => {
  try {
    const { action } = req.body;

    if (action && typeof action !== 'string') {
      const invalidFields = [];

      if (typeof action !== 'string') {
        invalidFields.push('action');
      }

      return res
        .status(400)
        .json(`Hay campos con formatos incorrectos ${invalidFields}`);
    }

    const newPermission = await permissionService.createPermission(req.body);

    res.status(201).json(newPermission);
  } catch (error) {
    handleErrors(res, error);
  }
};

const updatePermission = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;

    if (action && typeof action !== 'string') {
      const invalidFields = [];

      if (typeof action !== 'string') {
        invalidFields.push('action');
      }
      return res
        .status(400)
        .json(`Hay campos con formatos incorrectos ${invalidFields}`);
    }

    const updatedPermision = await permissionService.updatePermission(
      id,
      action
    );

    if (!updatedPermision) {
      return res.status(404).json({ message: 'Petición no encontrada' });
    }

    res.status(200).json(updatedPermision);
  } catch (error) {
    handleErrors(res, error);
  }
};

const deletePermision = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPermision = await permissionService.deletePermision(id);

    if (!deletedPermision) {
      return res.status(404).json({ message: 'Permiso no encontrado' });
    }

    res.status(200).json(deletedPermision);
  } catch (error) {}
};

export {
  fetchAllPermissions,
  fetchPermissionById,
  createPermission,
  updatePermission,
  deletePermision
};
