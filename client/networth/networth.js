// Fetch assets, debts, stocks and calculate net worth
async function fetchNetWorth() {
  const token = localStorage.getItem("token");
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const [assetsRes, debtsRes, stocksRes] = await Promise.all([
    fetch("http://3.229.166.20:4000/api/assets", { headers }),
    fetch("http://3.229.166.20:4000/api/debts", { headers }),
    fetch("http://3.229.166.20:4000/api/stocks", { headers }),
  ]);
  const assets = await assetsRes.json();
  const debts = await debtsRes.json();
  const stocks = await stocksRes.json();
  const assetsTotal = assets.reduce((sum, a) => sum + a.value, 0);
  const debtsTotal = debts.reduce((sum, d) => sum + d.value, 0);
  const stocksTotal = stocks.reduce(
    (sum, s) => sum + (s.price || 0) * s.shares,
    0
  );
  const netWorth = assetsTotal + stocksTotal - debtsTotal;
  let assetsList = assets
    .map(
      (a) =>
        `<li>${a.name}: $${a.value.toLocaleString()} <button data-id="${
          a._id
        }" data-type="asset" class="delete-btn">Delete</button></li>`
    )
    .join("");
  let debtsList = debts
    .map(
      (d) =>
        `<li>${d.name}: $${d.value.toLocaleString()} <button data-id="${
          d._id
        }" data-type="debt" class="delete-btn">Delete</button></li>`
    )
    .join("");
  let stocksList = stocks
    .map(
      (s) =>
        `<li>${s.symbol}: ${s.shares} shares @ $${s.price} <button data-id="${s._id}" data-type="stock" class="delete-btn">Delete</button></li>`
    )
    .join("");
  document.getElementById("networth-root").innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:2em; justify-content:space-between; align-items:center; margin-bottom:2em;">
      <div><strong>Assets Total:</strong> <span style="color:#0077ff; font-weight:700;">$${assetsTotal.toLocaleString()}</span></div>
      <div><strong>Stocks Total:</strong> <span style="color:#0077ff; font-weight:700;">$${stocksTotal.toLocaleString()}</span></div>
      <div><strong>Debts Total:</strong> <span style="color:#d9363e; font-weight:700;">$${debtsTotal.toLocaleString()}</span></div>
      <div style="font-size:1.3em;"><strong>Net Worth:</strong> <span style="color:#0077ff; font-weight:700;">$${netWorth.toLocaleString()}</span></div>
    </div>
    <hr />
    <h4>Assets</h4>
    <ul>${assetsList}</ul>
    <h4>Debts</h4>
    <ul>${debtsList}</ul>
    <h4>Stocks</h4>
    <ul>${stocksList}</ul>
  `;

  // Add event listeners for delete buttons
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.onclick = async function () {
      const id = btn.getAttribute("data-id");
      const type = btn.getAttribute("data-type");
      let url = "";
      if (type === "asset") url = `http://3.229.166.20:4000/api/assets/${id}`;
      if (type === "debt") url = `http://3.229.166.20:4000/api/debts/${id}`;
      if (type === "stock") url = `http://3.229.166.20:4000/api/stocks/${id}`;
      await fetch(url, { method: "DELETE", headers });
      fetchNetWorth();
    };
  });
}

window.addEventListener("DOMContentLoaded", fetchNetWorth);
// Fetch and display username
async function fetchUsername() {
  const token = localStorage.getItem("token");
  if (!token) return;
  const headers = { Authorization: `Bearer ${token}` };
  try {
    const res = await fetch("http://3.229.166.20:4000/api/auth/me", { headers });
    if (res.ok) {
      const data = await res.json();
      // Set username only in nav bar for universal display
      const navUsername = document.getElementById("nav-username");
      if (navUsername) navUsername.textContent = `Hello, ${data.username}`;
    }
  } catch (err) {
    // ignore
  }
}

window.addEventListener("DOMContentLoaded", fetchUsername);

document.getElementById("add-asset-form").onsubmit = async function (e) {
  e.preventDefault();
  const name = document.getElementById("asset-name").value;
  const value = parseFloat(document.getElementById("asset-value").value);
  const token = localStorage.getItem("token");
  await fetch("http://3.229.166.20:4000/api/assets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, value }),
  });
  document.getElementById("asset-name").value = "";
  document.getElementById("asset-value").value = "";
  fetchNetWorth();
};

document.getElementById("add-debt-form").onsubmit = async function (e) {
  e.preventDefault();
  const name = document.getElementById("debt-name").value;
  const value = parseFloat(document.getElementById("debt-value").value);
  const token = localStorage.getItem("token");
  await fetch("http://3.229.166.20:4000/api/debts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, value }),
  });
  document.getElementById("debt-name").value = "";
  document.getElementById("debt-value").value = "";
  fetchNetWorth();
};

document.getElementById("add-stock-form").onsubmit = async function (e) {
  e.preventDefault();
  const symbol = document.getElementById("stock-symbol").value;
  const shares = parseFloat(document.getElementById("stock-shares").value);
  const token = localStorage.getItem("token");
  await fetch("http://3.229.166.20:4000/api/stocks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ symbol, shares }),
  });
  document.getElementById("stock-symbol").value = "";
  document.getElementById("stock-shares").value = "";
  fetchNetWorth();
};
