import { DataTypes } from 'sequelize';
import sequelize from '../db/mysqlConnection.js';

const Permission = sequelize.define('Permission', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Permission;
