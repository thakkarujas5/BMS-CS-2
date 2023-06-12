const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../sqldb');

const Movie = sequelize.define('Movie', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = Movie;
