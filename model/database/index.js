const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(DATA_URL);

async function conectado() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established sucessfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = { sequelize, conectado };
