const { DataTypes } = require('sequelize');
const sequelize = require("../database");
const Todo = require('./todo');

const User = sequelize.define('User', 
{
    userId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    timestamps: false,
}); 

Todo.belongsTo(User);
// User.hasMany(Todo);

module.exports = User;