const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../sqldb');

const Rating = sequelize.define('Rating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

module.exports = Rating;