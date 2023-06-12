const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const sequelize = require('../sqldb');

const Comment = sequelize.define('Comment', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});

module.exports = Comment;