const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const User = require("./user");

const Todo = sequelize.define('Todo', 
{
    todoId: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    todoTask: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


module.exports = Todo;