const products = [
  { name: "Noir Luxe Tote", price: 32000, image: "assets/images/bag1.jpg" },
  { name: "Velvet Drape Dress", price: 62000, image: "assets/images/dress1.jpg" },
  { name: "Radiance Serum", price: 12000, image: "assets/images/serum.jpg" },
  { name: "Golden Hour Heels", price: 27000, image: "assets/images/heels.jpg" }
];

const container = document.getElementById("shop-products");
if (container) {
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>₦${p.price.toLocaleString()}</p>
      <button onclick='addToCart(${JSON.stringify(p)})'>Add to Cart</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
