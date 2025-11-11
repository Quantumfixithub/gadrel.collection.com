// checkout.js

import { getCart, clearCart, getCartTotal } from './cart.js';
import { sendOrderEmail } from './email.js';

/**
 * Renders the cart summary inside a container.
 * @param {string} containerId - The ID of the container element.
 */
export function renderCartSummary(containerId) {
  const container = document.getElementById(containerId);
  const cart = getCart();
  let html = "<ul>";

  cart.forEach(item => {
    html += `<li>${sanitize(item.name)} — ₦${item.price.toLocaleString()}</li>`;
  });

  html += `</ul><strong>Total: ₦${getCartTotal().toLocaleString()}</strong>`;
  container.innerHTML = html;
}

/**
 * Initiates Paystack payment flow.
 */
export function payWithPaystack() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const cart = getCart();
  const amount = getCartTotal() * 100;
  const ref = "GC" + Math.floor(Math.random() * 1000000000);

  if (!name || !email || !address || cart.length === 0) {
    alert("Please fill all fields and ensure your cart is not empty.");
    return;
  }

  localStorage.setItem("lastRef", ref);

  const handler = PaystackPop.setup({
    key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your actual public key
    email,
    amount,
    currency: "NGN",
    ref,
    metadata: {
      custom_fields: [
        { display_name: "Name", variable_name: "name", value: name },
        { display_name: "Address", variable_name: "address", value: address }
      ]
    },
    callback: function(response) {
      saveOrder(name, email, address, cart, response.reference);
      sendOrderEmail(name, email, address, cart, response.reference);
      clearCart();
      window.location.href = "thankyou.html";
    },
    onClose: function() {
      alert("Payment window closed.");
    }
  });

  handler.openIframe();
}

/**
 * Saves the order to localStorage for admin view.
 * @param {string} name
 * @param {string} email
 * @param {string} address
 * @param {Array} cart
 * @param {string} reference
 */
function saveOrder(name, email, address, cart, reference) {
  const items = cart.map(item => `${item.name} - ₦${item.price.toLocaleString()}`).join("\n");
  const order = { name, email, address, cart: items, reference };
  const adminOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
  adminOrders.push(order);
  localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
}

/**
 * Escapes HTML to prevent injection.
 * @param {string} str
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
