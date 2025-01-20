import Permission from '../database/models/Permission.js';

const fetchAllPermissions = async () => {
  try {
    const permissions = await Permission.findAll();
    return permissions;
  } catch (error) {
    console.error('Error en el servicio permisos', error);
    throw error;
  }
};

const fetchPermissionById = async (id) => {
  try {
    const permission = await Permission.findOne({ where: { id } });
    return permission;
  } catch (error) {
    console.error('Error en el servicio permisos por ID', error);
    throw Error;
  }
};

const createPermission = async (id, userData) => {
  try {
    const newPermission = await Permission.create(userData);
    return newPermission;
  } catch (error) {
    console.error('Error en el servicio crear permiso', error);
    throw error;
  }
};

const updatePermission = async (userData) => {
  try {
    const updatedPermision = await Permission.findOne({ where: { id } });

    if (!updatedPermision) {
      return null;
    }

    await updatedPermision.update(userData);

    return updatePermission;
  } catch (error) {
    console.error('Error en el servicio actualizar permiso', error);
    throw error;
  }
};

const deletePermision = async (id) => {
  try {
    const deletedPermission = await Permission.findOne({ where: { id } });

    if (!deletedPermission) {
      return null;
    }

    await deletedPermission.destroy();

    return deletedPermission;
  } catch (error) {
    console.error('Error en el servicio eliminar permiso', error);
  }
};

export default PermissionService;
