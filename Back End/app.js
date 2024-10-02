const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./util/database");

const expenseRoutes = require("./routes/expense");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/expense',expenseRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
