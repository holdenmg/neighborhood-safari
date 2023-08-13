const sequelize = require('../config/connection');
const { User, Post, Comment, Animal } = require('../models');


const seedDatabase = async () => {
  await sequelize.sync({ force: true });



  process.exit(0);
};

seedDatabase();


