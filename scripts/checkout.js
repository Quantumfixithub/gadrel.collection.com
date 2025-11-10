// checkout.js
import { getCart, clearCart, getCartTotal } from './cart.js';
import { sendOrderEmail } from './email.js';

export function renderCartSummary(containerId) {
  const container = document.getElementById(containerId);
  const cart = getCart();
  let html = "<ul>";
  cart.forEach(item => {
    html += `<li>${item.name} — ₦${item.price.toLocaleString()}</li>`;
  });
  html += "</ul><strong>Total: ₦" + getCartTotal().toLocaleString() + "</strong>";
  container.innerHTML = html;
}

export function payWithPaystack() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const cart = getCart();
  const amount = getCartTotal() * 100;
  const ref = "GC" + Math.floor(Math.random() * 1000000000);

  if (!name || !email || !address || cart.length === 0) {
    alert("Please fill all fields and ensure your cart is not empty.");
    return;
  }

  localStorage.setItem("lastRef", ref);

  const handler = PaystackPop.setup({
    key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your key
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

function saveOrder(name, email, address, cart, reference) {
  const items = cart.map(item => `${item.name} - ₦${item.price.toLocaleString()}`).join("\n");
  const order = { name, email, address, cart: items, reference };
  const adminOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
  adminOrders.push(order);
  localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
}
