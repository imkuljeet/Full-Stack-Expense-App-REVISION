const myForm = document.getElementById("myform");
myForm.addEventListener("submit", saveToDatabase);

async function saveToDatabase(e) {
  try {
    e.preventDefault();
    let expAmt = e.target.expAmt.value;
    let description = e.target.description.value;
    let category = e.target.category.value;

    let obj = { expAmt: expAmt, description: description, category: category };

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
  li.textContent = `${obj.expAmt} --- ${obj.description} --- ${obj.category}  `;

  let delBtn = document.createElement("button");
  delBtn.innerText = "DELETE";

  let editBtn = document.createElement("button");
  editBtn.innerText = "EDIT";

  li.appendChild(delBtn);
  li.appendChild(document.createTextNode(" "));
  li.appendChild(editBtn);
  ul.appendChild(li);

  delBtn.addEventListener("click", () => {
    ul.removeChild(li);
  });

  editBtn.addEventListener("click", () => {
    document.getElementById("expAmt").value = obj.expAmt;
    document.getElementById("description").value = obj.description;
    document.getElementById("category").value = obj.category;

    ul.removeChild(li);
  });
}
