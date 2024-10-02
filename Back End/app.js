const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/expense/upload-my-data',(req,res)=>{
    const {expAmt, description , category} = req.body;

    console.log(expAmt,description,category);
})

app.listen(3000);