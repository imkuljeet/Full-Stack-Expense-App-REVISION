const Sequelize = require("sequelize");


const sequelize = new Sequelize('expenseApp','root','Itsgreat_12345',{
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;