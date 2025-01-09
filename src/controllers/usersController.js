import { v4 as uuidv4 } from 'uuid';

import { fetchAllUsers, createUser } from '../services/usersService.js';

export const getUsers = async (req, res) => {
  try {
    const users = await fetchAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios' });
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
    console.error('Error al crear el usuario:', error.errors[0].message);
    res.status(500).json({
      message: `Error al crear el usuario: ${error.errors[0].message}`
    });
  }
};
