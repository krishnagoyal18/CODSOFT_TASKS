const form = document.getElementById("transactionForm");

const titleInput = document.getElementById("title");
const amountType = document.getElementById("amount");
const typeInput = document.getElementById("type");
const category = document.getElementById("category");
const dateInput = document.getElementById("date");

const transactionList = document.getElementById("transactionList");

const incomeE1 = document.getElementById("income");
const expenseE1 = document.getElementById("expense");
const balanceE1 = document.getElementById("balance");
const submitBtn = document.getElementById("submitBtn")


let income = 0;
let expense = 0;
let balance = 0;

let editRow = null;
let oldAmount = 0;
let oldType = "";

function updateCards() {
    balance = income - expense;

    incomeE1.textContent = income;
    expenseE1.textContent = expense;
    balanceE1.textContent = balance;
}

function attachRowEvents(row, title, amount, type, categoryValue, date) {

    // Edit button
    const editBtn = row.querySelector(".editBtn");

    editBtn.addEventListener("click", () => {

        editRow = row;
        submitBtn.textContent = "Update Transaction";
        oldAmount = amount;
        oldType = type;

        titleInput.value = title;
        amountType.value = amount;
        typeInput.value = type;
        category.value = categoryValue;
        dateInput.value = date;

    });

    // Delete button
    const deleteBtn = row.querySelector(".deleteBtn");

    deleteBtn.addEventListener("click", () => {

        row.remove();

        if(type === "Income"){
            income -= amount;
        }
        else if(type === "Expense"){
            expense -= amount;
        }

        updateCards();

    });

}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    const title = titleInput.value;
    const amount = Number(amountType.value);
    const type = typeInput.value;
    const categoryValue = category.value;
    const date = dateInput.value;

    // EDIT MODE
    if(editRow !== null){

        // Purani value hatao
        if(oldType === "Income"){
            income -= oldAmount;
        }
        else if(oldType === "Expense"){
            expense -= oldAmount;
        }

        // Nayi value add karo
        if(type === "Income"){
            income += amount;
        }
        else if(type === "Expense"){
            expense += amount;
        }

        editRow.innerHTML = `
        <td>${title}</td>
        <td>${categoryValue}</td>
        <td>${type}</td>
        <td>${amount}</td>
        <td>${date}</td>
        <td><button type="button" class="deleteBtn">Delete</button></td>
        <td><button type="button" class="editBtn">Edit</button></td>
        `;

        attachRowEvents(editRow, title, amount, type, categoryValue, date);

        editRow = null;
        submitBtn.textContent = "Add Transaction";
        oldAmount = 0;
        oldType = "";

    }

    // ADD MODE
    else{

        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${title}</td>
        <td>${categoryValue}</td>
        <td>${type}</td>
        <td>${amount}</td>
        <td>${date}</td>
        <td><button type="button" class="deleteBtn">Delete</button></td>
        <td><button type="button" class="editBtn">Edit</button></td>
        `;

        transactionList.appendChild(row);

        attachRowEvents(row, title, amount, type, categoryValue, date);

        if(type === "Income"){
            income += amount;
        }
        else if(type === "Expense"){
            expense += amount;
        }

    }

    updateCards();

    // Form clear
    titleInput.value = "";
    amountType.value = "";
    typeInput.value = "Income";
    category.value = "Salary";
    dateInput.value = "";

});