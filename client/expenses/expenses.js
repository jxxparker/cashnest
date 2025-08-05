// Form and rendering for monthly expenses
// ...implement expense form and list here...
// Example fetch usage:
// fetch('http://localhost:4000/api/expenses')
// Handle expense form submission and render expenses
async function fetchExpenses() {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch("/api/expenses", { headers });
  const expenses = await res.json();
  let filteredCategory = window.filteredCategory || null;
  let filteredMonth = window.filteredMonth || null;
  // Get all months present in expenses
  const months = Array.from(
    new Set(
      expenses.map((e) => {
        const d = new Date(e.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
          2,
          "0"
        )}`;
      })
    )
  );
  // Default to current month if present
  if (!filteredMonth && months.length) {
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}`;
    window.filteredMonth = months.includes(currentMonth)
      ? currentMonth
      : months[months.length - 1];
    filteredMonth = window.filteredMonth;
  }
  // Filter by category and month
  let filteredExpenses = expenses.filter((e) => {
    const d = new Date(e.date);
    const monthStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
    let matchMonth = filteredMonth ? monthStr === filteredMonth : true;
    let matchCat = filteredCategory ? e.category === filteredCategory : true;
    return matchMonth && matchCat;
  });
  // Month dropdown
  let monthOptions = months
    .map((m) => {
      const [year, month] = m.split("-");
      const label = `${new Date(year, month - 1).toLocaleString("default", {
        month: "long",
      })} ${year}`;
      return `<option value="${m}"${
        m === filteredMonth ? " selected" : ""
      }>${label}</option>`;
    })
    .join("");
  let monthDropdown = `<label style="margin-right:1em; font-weight:600; font-size:1.1em; color:#0077ff;">Month:</label><select id="expense-month-select" style="margin-bottom:1em; padding:0.5em 1em; font-size:1.05em; border-radius:8px; border:1px solid #0077ff; background:#f2f4f7; color:#222; font-weight:600;">${monthOptions}</select>`;
  const expensesList = filteredExpenses
    .map(
      (e) =>
        `<li style="padding:1.2em 0; border-bottom:1px solid #e5e7eb; background:#f9fafb; border-radius:10px; margin-bottom:1em;">
          <div style="display:flex; flex-direction:row; align-items:center; justify-content:space-between; gap:1em;">
            <div style="flex:1;">
              <span class="expense-category-click" data-category="${
                e.category
              }" style="font-weight:700; color:#0077ff; font-size:1.1em; cursor:pointer; text-decoration:underline;">${
          e.category
        }</span>
              <span style="font-size:1.1em; color:#222; font-weight:600; margin-left:1em;">$${e.amount.toLocaleString()}</span>
              <span style="color:#888; font-size:0.95em; margin-left:1em;">${new Date(
                e.date
              ).toLocaleDateString()}</span>
              <div style="color:#555; font-style:italic; margin-top:0.3em; font-size:1em;">${
                e.description || e.details || ""
              }</div>
            </div>
            <button data-id="${
              e._id
            }" class="delete-expense-btn" style="background:#ff4d4f; color:#fff; border:none; border-radius:6px; padding:0.4em 1em; font-size:1em; font-weight:600; cursor:pointer;">Delete</button>
          </div>
        </li>`
    )
    .join("");
  let filterInfo = filteredCategory
    ? `<div style="margin-bottom:1em;"><strong>Filtering by category:</strong> <span style="color:#0077ff; font-weight:700;">${filteredCategory}</span> <button id="clear-category-filter" style="margin-left:1em;">Clear Filter</button></div>`
    : "";
  // Calculate total for filtered month
  const totalForMonth = filteredExpenses.reduce(
    (sum, e) => sum + (e.amount || 0),
    0
  );
  let totalInfo = `<div style="margin-bottom:1em; font-size:1.15em;"><strong>Total for month:</strong> <span style="color:#0077ff; font-weight:700;">$${totalForMonth.toLocaleString()}</span></div>`;
  document.getElementById(
    "expenses-root"
  ).innerHTML = `${monthDropdown}${filterInfo}<ul style="padding:0; margin:0; list-style:none;">${expensesList}</ul>`;
  document.getElementById(
    "expenses-root"
  ).innerHTML = `${monthDropdown}${totalInfo}${filterInfo}<ul style="padding:0; margin:0; list-style:none;">${expensesList}</ul>`;

  // Month dropdown event
  const monthSelect = document.getElementById("expense-month-select");
  if (monthSelect) {
    monthSelect.onchange = function () {
      window.filteredMonth = monthSelect.value;
      fetchExpenses();
    };
  }

  // Add click event for category filter
  document.querySelectorAll(".expense-category-click").forEach((el) => {
    el.onclick = function () {
      window.filteredCategory = el.getAttribute("data-category");
      fetchExpenses();
    };
  });
  // Add clear filter button event
  const clearBtn = document.getElementById("clear-category-filter");
  if (clearBtn) {
    clearBtn.onclick = function () {
      window.filteredCategory = null;
      fetchExpenses();
    };
  }

  // Delete expense
  document.querySelectorAll(".delete-expense-btn").forEach((btn) => {
    btn.onclick = async function () {
      const id = btn.getAttribute("data-id");
      await fetch(`/api/expenses/${id}`, {
        method: "DELETE",
        headers,
      });
      fetchExpenses();
    };
  });
}

document.getElementById("add-expense-form").onsubmit = async function (e) {
  e.preventDefault();
  const date = document.getElementById("expense-date").value;
  const amount = parseFloat(document.getElementById("expense-amount").value);
  const description = document.getElementById("expense-details").value;
  const category = document.getElementById("expense-category").value;
  const token = localStorage.getItem("token");
  await fetch("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ amount, category, description, date }),
  });
  document.getElementById("expense-date").value = "";
  document.getElementById("expense-amount").value = "";
  document.getElementById("expense-details").value = "";
  document.getElementById("expense-category").value = "";
  fetchExpenses();
};

window.addEventListener("DOMContentLoaded", fetchExpenses);
