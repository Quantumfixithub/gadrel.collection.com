// admin.js

/**
 * Loads orders from localStorage and populates a table.
 * @param {string} tableId - The ID of the table element to populate.
 */
export function loadOrders(tableId) {
  const orders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
  const tbody = document.querySelector(`#${tableId} tbody`);
  tbody.innerHTML = "";

  if (orders.length === 0) {
    tbody.innerHTML = "<tr><td colspan='5'>No orders found.</td></tr>";
  } else {
    orders.forEach(order => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${sanitize(order.name)}</td>
        <td>${sanitize(order.email)}</td>
        <td>${sanitize(order.address)}</td>
        <td>${formatCart(order.cart)}</td>
        <td>${sanitize(order.reference)}</td>
      `;
      tbody.appendChild(row);
    });
  }
}

/**
 * Escapes HTML characters to prevent injection.
 * @param {string} str - The string to sanitize.
 * @returns {string}
 */
function sanitize(str) {
  return String(str).replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[tag]));
}

/**
 * Formats cart string with line breaks.
 * @param {string} cart - The cart string with newline-separated items.
 * @returns {string}
 */
function formatCart(cart) {
  return sanitize(cart).replace(/\n/g, "<br>");
}
