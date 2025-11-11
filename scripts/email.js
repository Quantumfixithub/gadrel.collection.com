// email.js

/**
 * Sends an order confirmation email using EmailJS.
 * @param {string} name - Customer's full name.
 * @param {string} email - Customer's email address.
 * @param {string} address - Delivery address.
 * @param {Array} cart - Array of cart items.
 * @param {string} reference - Unique order reference.
 */
export function sendOrderEmail(name, email, address, cart, reference) {
  const items = cart
    .map(item => `${sanitize(item.name)} - ₦${item.price.toLocaleString()}`)
    .join("\n");

  const templateParams = {
    name,
    email,
    address,
    cart: items,
    reference
  };

  emailjs.send("your_serviceID", "your_templateID", templateParams)
    .then(() => console.log("✅ Order email sent"))
    .catch(err => console.error("❌ Email error:", err));
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
