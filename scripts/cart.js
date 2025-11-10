const cart = JSON.parse(localStorage.getItem("cart") || "[]");
const container = document.getElementById("cart-items");
const totalDisplay = document.getElementById("cart-total");
let total = 0;

if (cart.length === 0) {
  container.innerHTML = "<p>Your cart is empty.</p>";
} else {
  cart.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₦${p.price.toLocaleString()}</p>
    `;
    container.appendChild(div);
    total += p.price;
  });
  totalDisplay.textContent = total.toLocaleString();
  localStorage.setItem("total", total);
}
