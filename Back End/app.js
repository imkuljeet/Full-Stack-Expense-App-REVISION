const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");

const Expense = require("./models/expense");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/expense/upload-my-data", (req, res) => {
  const { expenseAmount, description, category } = req.body;

  Expense.create({expenseAmount : expenseAmount, description : description, category : category}).then((result)=>{
    // console.log("Result is >>",result);
    res.status(200).json({expenseDetails : result});
  }).catch((err)=>{
    console.log(err);
    res.status(500).json({error : "Internal Server Error"});
  })
});

app.get("/expense/get-all-expenses", (req, res) => {
    Expense.findAll().then((result)=>{
        res.status(200).json({expensesAll : result});
    }).catch(err=>{
        console.log("ERROR IS",err);
    })
});

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
