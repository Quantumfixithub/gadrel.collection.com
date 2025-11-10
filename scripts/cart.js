// Initialize EmailJS (optional)
emailjs.init("your_userID"); // Replace with your EmailJS user ID

// Load cart from localStorage
const cart = JSON.parse(localStorage.getItem("cart") || "[]");

// Render cart summary
function renderCartSummary(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let total = 0;
  let html = "<ul>";
  cart.forEach(item => {
    total += item.price;
    html += `<li>${item.name} — ₦${item.price.toLocaleString()}</li>`;
  });
  html += "</ul>";
  html += `<strong>Total: ₦${total.toLocaleString()}</strong>`;
  container.innerHTML = html;
}

// Trigger Paystack payment
function payWithPaystack() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;
  const amount = cart.reduce((sum, item) => sum + item.price, 0) * 100;

  if (!name || !email || !address || cart.length === 0) {
    alert("Please fill all fields and ensure your cart is not empty.");
    return;
  }

  const ref = "GC" + Math.floor(Math.random() * 1000000000);
  localStorage.setItem("lastRef", ref);

  const handler = PaystackPop.setup({
    key: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxx", // Replace with your Paystack public key
    email: email,
    amount: amount,
    currency: "NGN",
    ref: ref,
    metadata: {
      custom_fields: [
        { display_name: "Name", variable_name: "name", value: name },
        { display_name: "Address", variable_name: "address", value: address }
      ]
    },
    callback: function(response) {
      saveOrder(name, email, address, cart, response.reference);
      sendOrderEmail(name, email, address, cart, response.reference);
      localStorage.removeItem("cart");
      window.location.href = "thankyou.html";
    },
    onClose: function() {
      alert("Payment window closed.");
    }
  });

  handler.openIframe();
}

// Save order to localStorage for admin dashboard
function saveOrder(name, email, address, cart, reference) {
  const items = cart.map(item => `${item.name} - ₦${item.price.toLocaleString()}`).join("\n");
  const order = { name, email, address, cart: items, reference };
  const adminOrders = JSON.parse(localStorage.getItem("adminOrders") || "[]");
  adminOrders.push(order);
  localStorage.setItem("adminOrders", JSON.stringify(adminOrders));
}

// Send order email via EmailJS
function sendOrderEmail(name, email, address, cart, reference) {
  const items = cart.map(item => `${item.name} - ₦${item.price.toLocaleString()}`).join("\n");
  const templateParams = {
    name: name,
    email: email,
    address: address,
    cart: items,
    reference: reference
  };

  emailjs.send("your_serviceID", "your_templateID", templateParams)
    .then(() => console.log("Order email sent"))
    .catch(err => console.error("Email error:", err));
}
