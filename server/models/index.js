const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: 'mysql',
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
})

const db = {};
db.sequelize = sequelize;

db.models = {};
db.models.Chart = require('./chart.model')(sequelize, Sequelize.DataTypes);

module.exports = db;