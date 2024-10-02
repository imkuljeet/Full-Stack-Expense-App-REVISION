const myForm = document.getElementById("myform");

// Event listener for form submission
myForm.addEventListener("submit", saveToDatabase);

// Function to handle form submission and save data to the database
async function saveToDatabase(e) {
  try {
    e.preventDefault();

    // Get form values
    const expenseAmount = e.target.expAmt.value;
    const description = e.target.description.value;
    const category = e.target.category.value;

    // Create object with the form data
    const expenseData = { expenseAmount, description, category };

    // Display the new expense on the screen
    showOnScreen(expenseData);

    // Send data to the backend API
    const result = await axios.post(
      "http://localhost:3000/expense/upload-my-data",
      expenseData
    );

    console.log("Result is ", result);

    // Reset the form
    e.target.reset();
  } catch (err) {
    console.error("Error saving data:", err);
  }
}

// Function to display the expense on the screen
function showOnScreen(expense) {
  const ul = document.getElementById("mylist");
  const li = document.createElement("li");

  li.textContent = `${expense.expenseAmount} --- ${expense.description} --- ${expense.category}`;
  const expId = expense.id;

  // Create Delete button
  const delBtn = document.createElement("button");
  delBtn.innerText = "DELETE";
  delBtn.addEventListener("click", () => deleteExpense(expId, li));

  // Create Edit button
  const editBtn = document.createElement("button");
  editBtn.innerText = "EDIT";
  editBtn.addEventListener("click", () => editExpense(expense, expId, li));

  // Append buttons to list item
  li.appendChild(delBtn);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(editBtn);
  ul.appendChild(li);
}

// Function to delete an expense
async function deleteExpense(expId, li) {
  try {
    await axios.delete(`http://localhost:3000/expense/delete-expense/${expId}`);
    li.remove(); // Remove the item from the list
  } catch (err) {
    console.error("Error deleting expense:", err);
  }
}

// Function to edit an expense
async function editExpense(expense, expId, li) {
  // Set the form values with the current expense details
  document.getElementById("expAmt").value = expense.expenseAmount;
  document.getElementById("description").value = expense.description;
  document.getElementById("category").value = expense.category;

  // Delete the old expense before updating
  await deleteExpense(expId, li);
}

// Load all expenses when the page loads
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:3000/expense/get-all-expenses");

    res.data.expenses.forEach((expense) => {
      showOnScreen(expense); // Show each expense on the screen
    });
  } catch (err) {
    console.error("Error loading expenses:", err);
  }
});
