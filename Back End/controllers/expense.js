const Expense = require("../models/expense");

const uploadData = (req, res) => {
    const { expenseAmount, description, category } = req.body;
  
    Expense.create({
      expenseAmount: expenseAmount,
      description: description,
      category: category,
    })
      .then((result) => {
        // console.log("Result is >>",result);
        res.status(200).json({ expenseDetails: result });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
      });
}

const getAllExpenses = (req, res) => {
    Expense.findAll()
      .then((result) => {
        res.status(200).json({ expensesAll: result });
      })
      .catch((err) => {
        console.log("ERROR IS", err);
      });
}

const deleteExpense = (req, res) => {
    const expId = req.params.id;
    // console.log("Success deleted",expId);
  
    Expense.destroy({ where: { id: expId } }).then(() => {
      res.status(200).json({ success: "successfully deleted expense" });
    });
}

module.exports = { uploadData, getAllExpenses, deleteExpense };