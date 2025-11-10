document.addEventListener("DOMContentLoaded", () => {
  const featuredProducts = [
    {
      name: "Noir Luxe Tote",
      price: 32000,
      image: "assets/images/bag1.jpg"
    },
    {
      name: "Velvet Drape Dress",
      price: 62000,
      image: "assets/images/dress1.jpg"
    },
    {
      name: "Radiance Serum",
      price: 12000,
      image: "assets/images/serum.jpg"
    },
    {
      name: "Golden Hour Heels",
      price: 27000,
      image: "assets/images/heels.jpg"
    },
    {
      name: "Crimson Voyager",
      price: 45000,
      image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Quilted Crossbody",
      price: 28000,
      image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Tan Leather Satchel",
      price: 39000,
      image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Mini Chain Bag",
      price: 25000,
      image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Canvas Travel Bag",
      price: 42000,
      image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Elegant Evening Bag",
      price: 38000,
      image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const container = document.getElementById("featured-products");

  featuredProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>₦${product.price.toLocaleString()}</p>
      <button onclick='addToCart(${JSON.stringify(product)})'>Add to Cart</button>
    `;
    container.appendChild(div);
  });
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}
