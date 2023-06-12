const {
    Sequelize
} = require('sequelize');
const {
    DataTypes
} = require('sequelize');

const sequelize = new Sequelize('sys', 'root', 'drago1234', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize