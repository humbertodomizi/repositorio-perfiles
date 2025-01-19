import { v4 as uuidv4 } from 'uuid';

import {
  fetchAllUsers,
  fetchUserByUUID,
  deleteUserByUUID,
  updateUserByUUID,
  createUser
} from '../services/usersService.js';

import { handleErrors } from '../helpers/handleErrors.js';

export const getUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const getUserByUUID = async (req, res) => {
  try {
    const { uuid } = req.params;

    const user = await fetchUserByUUID(uuid);

    if (!user) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const newUser = async (req, res) => {
  try {
    const { name, lastName, email, password, roleId } = req.body;

    if (
      (name && typeof name !== 'string') ||
      (lastName && typeof lastName !== 'string') ||
      (email && typeof email !== 'string') ||
      (password && typeof password !== 'string') ||
      (roleId && typeof roleId !== 'number')
    ) {
      const invalidFields = [];

      if (typeof name !== 'string') invalidFields.push('name');
      if (typeof lastName !== 'string') invalidFields.push('lastName');
      if (typeof email !== 'string') invalidFields.push('email');
      if (typeof password !== 'string') invalidFields.push('password');
      if (typeof roleId !== 'number') invalidFields.push('roleId');

      return res.status(400).json({
        message: `Hay campos con formatos incorrectos: ${invalidFields}`
      });
    }

    const payload = { ...req.body, uuid: uuidv4() };

    const user = await createUser(payload);
    const userPlain = user.toJSON();

    delete userPlain.password;
    delete userPlain.createdAt;
    delete userPlain.updatedAt;

    res.status(201).json(userPlain);
  } catch (error) {
    handleErrors(res, error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { uuid } = req.params;
    const { name, lastName, email, password, roleId } = req.body;

    if (
      (name && typeof name !== 'string') ||
      (lastName && typeof lastName !== 'string') ||
      (email && typeof email !== 'string') ||
      (password && typeof password !== 'string') ||
      (roleId && typeof roleId !== 'number')
    ) {
      const invalidFields = [];

      if (name && typeof name !== 'string') invalidFields.push('name');
      if (lastName && typeof lastName !== 'string')
        invalidFields.push('lastName');
      if (email && typeof email !== 'string') invalidFields.push('email');
      if (password && typeof password !== 'string')
        invalidFields.push('password');
      if (roleId && typeof roleId !== 'number') invalidFields.push('roleId');

      return res.status(400).json({
        message: `Hay campos con formatos incorrectos: ${invalidFields}`
      });
    }

    const payload = { ...req.body };

    const userUpdated = await updateUserByUUID(uuid, payload);

    if (!userUpdated) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json({ message: 'Usuario actualizado', user: userUpdated });
  } catch (error) {
    handleErrors(res, error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { uuid } = req.params;

    const userDeleted = await deleteUserByUUID(uuid);

    if (!userDeleted) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    res.status(200).json({ message: 'Usuario eliminado' });
  } catch (error) {
    handleErrors(res, error);
  }
};
