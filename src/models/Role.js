import { DataTypes } from 'sequelize'
import sequelize from '../database/mySQL.js'

const Role = sequelize.define('Role', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

export default Role
