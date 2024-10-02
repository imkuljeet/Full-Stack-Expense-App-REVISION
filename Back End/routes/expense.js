const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");

router.post("/upload-my-data", expenseController.uploadData);

router.get("/get-all-expenses", expenseController.getAllExpenses);

router.delete("/delete-expense/:id", expenseController.deleteExpense);

module.exports = router;
