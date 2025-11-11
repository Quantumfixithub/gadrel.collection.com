const productsByCategory = {
  perfume: [
    { name: "Velvet Bloom", price: 18000, image: "https://images.unsplash.com/photo-1616627989395-2f3e1b7b2b2f?auto=format&fit=crop&w=600&q=80" },
    { name: "Citrus Noir", price: 21500, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Amber Whisper", price: 19500, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Ocean Mist", price: 22000, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Rose Elixir", price: 24000, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" }
  ],
  accessories: [
    { name: "Rose Gold Earrings", price: 18000, image: "https://images.unsplash.com/photo-1618354691214-8e3c3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Gemstone Hairband", price: 13000, image: "https://images.unsplash.com/photo-1618354691214-8e3c3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Pearl Clutch Bag", price: 28000, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" }
  ],
  dress: [
    { name: "Velvet Drape Dress", price: 62000, image: "https://images.unsplash.com/photo-1616627989395-2f3e1b7b2b2f?auto=format&fit=crop&w=600&q=80" },
    { name: "Crimson Silk Gown", price: 75000, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Floral Maxi Skirt", price: 30000, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Black Mesh Top", price: 22000, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "White Lace Blouse", price: 26000, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" }
  ],
  bag: [
    { name: "Noir Luxe Tote", price: 32000, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Blush Mini Satchel", price: 24500, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Tan Leather Crossbody", price: 39000, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" }
  ],
  skincare: [
    { name: "Radiance Serum", price: 12000, image: "https://images.unsplash.com/photo-1616627989395-2f3e1b7b2b2f?auto=format&fit=crop&w=600&q=80" },
    { name: "Glow Boost Toner", price: 9500, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Hydra Mist Spray", price: 11000, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" }
  ],
  shoe: [
    { name: "Golden Hour Heels", price: 27000, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Crimson High Heels", price: 35000, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" }
  ]
};

document.addEventListener("DOMContentLoaded", () => {
  Object.entries(productsByCategory).forEach(([category, items]) => {
    const container = document.getElementById(`${category}-products`);
    if (!container) return;

    items.forEach((product, index) => {
      const div = document.createElement("div");
      div.className = "product";
      div.innerHTML = `
        <img src="${sanitize(product.image)}" alt="${sanitize(product.name)}" />
        <h3>${sanitize(product.name)}</h3>
        <p>₦${product.price.toLocaleString()}</p>
        <button data-category="${category}" data-index="${index}">Add to Cart</button>
      `;
      container.appendChild(div);
    });

    container.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") {
        const index = e.target.getAttribute("data-index");
        const category = e.target.getAttribute("data-category");
        const product = productsByCategory[category][index];
        addToCart(product);
      }
    });
  });
});

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
}

function sanitize(str) {
  return String(str).replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[tag]));
}
