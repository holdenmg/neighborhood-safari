const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Animal extends Model {}

Animal.init(
{

id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
common_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
species: {
    type: DataTypes.STRING,
    allowNull: false,
  },
genus: {
    type: DataTypes.STRING,
    allowNull: false,
  },
endangered: {
    type: DataTypes.BOOLEAN,
  
  },
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'animal',
  }
);

module.exports = Animal;
