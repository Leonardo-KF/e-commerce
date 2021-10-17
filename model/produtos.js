const db = require("./database");
const Sequelize = require("sequelize");

const produto = db.sequelize.define(
  "produto",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nome: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    preço: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    descrição: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

produto.sync({ force: false });

module.exports = produto;
