let expense = []
let total = 0

const categorySel = document.getElementById("category-section")
const amountInput = document.getElementById("amount-section")
const expenseTableBody = document.getElementById("expense-table-body")
const dateInput = document.getElementById("date-section")
const addBtn = document.getElementById("add-btn")
const totalAmountCell = document.getElementById("total-amount")

addBtn.addEventListener("click", function () {
    const category = categorySel.value
    const amount = Number(amountInput.value)
    const date = dateInput.value

    if (category === "select") {
        alert("plz select category")
        return
    }
    if (isNaN(amount) || amount <= 0) {
        alert("plz enter valid number")
        return
    }
    if (date === "") {
        alert("plz enter date")
        return
    }

    const currentExpense = { category, amount, date }
    expense.push(currentExpense)
    total += amount
    totalAmountCell.textContent = total

    const newRow = expenseTableBody.insertRow()

    const CategoryCell = newRow.insertCell()
    const AmountCell = newRow.insertCell()
    const DateCell = newRow.insertCell()
    const DeleteCell = newRow.insertCell()

    CategoryCell.textContent = category
    AmountCell.textContent = amount
    DateCell.textContent = date

    const deleteBtn = document.createElement("button")
    deleteBtn.innerHTML = "Delete"
    deleteBtn.classList.add("delete-btn")

    deleteBtn.addEventListener("click", function () {
        const index = expense.indexOf(currentExpense)
        expense.splice(index, 1)
        total -= currentExpense.amount
        totalAmountCell.textContent = total
        expenseTableBody.removeChild(newRow)
    })

    DeleteCell.appendChild(deleteBtn)

    amountInput.value = ""
    dateInput.value = ""
})