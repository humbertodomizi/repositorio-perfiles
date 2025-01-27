import { Router } from 'express';
import {
  fetchAllPermissions,
  fetchPermissionById,
  createPermission,
  updatePermission,
  deletePermision
} from '../../controllers/permissionController.js';

const permissionRoutes = Router();

permissionRoutes.get('/permissions', fetchAllPermissions);
permissionRoutes.get('/permissions/:id', fetchPermissionById);
permissionRoutes.post('/permissions', createPermission);
permissionRoutes.put('/permissions/:id', updatePermission);
permissionRoutes.delete('/permission/:id', deletePermision);

export { permissionRoutes };
