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
scientific_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
link: {
    type: DataTypes.STRING,
    
  },
endangered: {
    type: DataTypes.STRING,
  
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
