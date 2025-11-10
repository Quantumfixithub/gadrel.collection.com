// email.js
export function sendOrderEmail(name, email, address, cart, reference) {
  const items = cart.map(item => `${item.name} - ₦${item.price.toLocaleString()}`).join("\n");
  const templateParams = {
    name,
    email,
    address,
    cart: items,
    reference
  };

  emailjs.send("your_serviceID", "your_templateID", templateParams)
    .then(() => console.log("Order email sent"))
    .catch(err => console.error("Email error:", err));
}
