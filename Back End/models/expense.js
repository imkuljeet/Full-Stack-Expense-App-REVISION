const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  expenseAmount: { type: Sequelize.INTEGER, allowNull: false },

  description: { type: Sequelize.STRING(200), allowNull: false },

  category: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Expense;
