const Expense = require("../models/expense");

const uploadData = async (req, res) => {
  try {
    const { expenseAmount, description, category } = req.body;

    // Validate input
    if (!expenseAmount || !description || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new expense entry
    const expenseDetails = await Expense.create({ expenseAmount, description, category });

    // Return the created expense details
    return res.status(200).json({ expenseDetails });
  } catch (err) {
    console.error("Error creating expense:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    // Fetch all expenses from the database
    const expenses = await Expense.findAll();
    
    // Return the retrieved expenses
    return res.status(200).json({ expenses });
  } catch (err) {
    console.error("Error fetching expenses:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Delete the expense by id
    const deletedRows = await Expense.destroy({ where: { id } });

    if (deletedRows === 0) {
      // If no rows were deleted, return a 404 Not Found response
      return res.status(404).json({ error: "Expense not found" });
    }

    // Return success response if deletion was successful
    return res.status(200).json({ message: "Successfully deleted expense" });
  } catch (err) {
    console.error("Error deleting expense:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};


module.exports = { uploadData, getAllExpenses, deleteExpense };