const { Sequelize } = require("sequelize");
const { sequelize_username,
    sequelize_database,
    sequelize_password,
    sequelize_host,
    sequelize_dialect } = require("../config");

const sequelize = new Sequelize (
    sequelize_database,
    sequelize_username,
    sequelize_password,
    {
        host: sequelize_host,
        dialect: sequelize_dialect
    }
);

sequelize.sync();

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Connection with DB established");
    } catch(err) {
        console.error("Unable to establish connection with DB")
    }
})();

module.exports = sequelize;