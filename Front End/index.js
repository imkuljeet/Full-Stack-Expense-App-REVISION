const myForm = document.getElementById("myform");
myForm.addEventListener("submit", saveToDatabase);

async function saveToDatabase(e) {
  try {
    e.preventDefault();
    let expenseAmount = e.target.expAmt.value;
    let description = e.target.description.value;
    let category = e.target.category.value;

    let obj = { expenseAmount : expenseAmount, description: description, category: category };

    showOnScreen(obj);

    let result = await axios.post(
      "http://localhost:3000/expense/upload-my-data",
      obj
    );

    console.log("Result is ", result);
    e.target.reset();
  } catch (err) {
    console.log(err);
  }
}

function showOnScreen(obj) {
  let ul = document.getElementById("mylist");
  let li = document.createElement("li");
  li.textContent = `${obj.expenseAmount} --- ${obj.description} --- ${obj.category}  `;
  let expId = obj.id;

  let delBtn = document.createElement("button");
  delBtn.innerText = "DELETE";

  let editBtn = document.createElement("button");
  editBtn.innerText = "EDIT";

  li.appendChild(delBtn);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(editBtn);
  ul.appendChild(li);

  delBtn.addEventListener("click", () => {
    axios.delete(`http://localhost:3000/expense/delete-expense/${expId}`).then(()=>{
      ul.removeChild(li);
    }).catch((err)=>{
      console.log("error deleting",err);
    })
  });

  editBtn.addEventListener("click", () => {
    document.getElementById("expAmt").value = obj.expenseAmount;
    document.getElementById("description").value = obj.description;
    document.getElementById("category").value = obj.category;

    axios.delete(`http://localhost:3000/expense/delete-expense/${expId}`).then(()=>{
      ul.removeChild(li);
    }).catch((err)=>{
      console.log("error deleting",err);
    })
  });
}

window.addEventListener('DOMContentLoaded',()=>{
  axios.get("http://localhost:3000/expense/get-all-expenses").then((res)=>{
    console.log(res);
    console.log("Res data is",res.data.expensesAll);

    res.data.expensesAll.forEach(element => {
      showOnScreen(element);
    });
  }).catch((err)=>{
    console.log("FE ERROR IS",err);
  })
})
