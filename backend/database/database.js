const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config()


const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
  host: process.env.host,
  port: process.env.port,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
