// admin.js
export function loadOrders(tableId) {
  const orders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
  const tbody = document.querySelector(`#${tableId} tbody`);

  if (orders.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>No orders found.</td></tr>";
  } else {
    orders.forEach(order => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${order.name}</td>
        <td>${order.email}</td>
        <td>${order.address}</td>
        <td>${order.cart.replace(/\n/g, "<br>")}</td>
        <td>${order.reference}</td>
      `;
      tbody.appendChild(row);
    });
  }
}
