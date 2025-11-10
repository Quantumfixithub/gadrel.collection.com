const featuredProducts = [
  {
    name: "Noir Luxe Tote",
    price: "₦32,000",
    image: "assets/images/bag1.jpg"
  },
  {
    name: "Velvet Drape Dress",
    price: "₦62,000",
    image: "assets/images/dress1.jpg"
  },
  {
    name: "Radiance Serum",
    price: "₦12,000",
    image: "assets/images/serum.jpg"
  },
  {
    name: "Golden Hour Heels",
    price: "₦27,000",
    image: "assets/images/heels.jpg"
  }
];

const container = document.getElementById("featured-products");
if (container) {
  featuredProducts.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.price}</p>
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
