const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../sqldb');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;