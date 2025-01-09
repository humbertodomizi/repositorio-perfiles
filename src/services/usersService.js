import User from '../database/models/User.js';

export const fetchAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error('Error en el servicio de usuarios:', error);
    throw error;
  }
};

export const createUser = async (userData) => {
  try {
    const user = await User.create(userData);
    return user;
  } catch (error) {
    console.error('Error en el servicio de usuarios desde el servicio:', error);
    throw error;
  }
};
