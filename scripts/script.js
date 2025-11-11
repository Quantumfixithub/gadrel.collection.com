document.addEventListener("DOMContentLoaded", () => {
  const featuredProducts = [
    // 🧴 Perfume
    { name: "Velvet Bloom", price: 18000, image: "https://images.unsplash.com/photo-1616627989395-2f3e1b7b2b2f?auto=format&fit=crop&w=600&q=80" },
    { name: "Citrus Noir", price: 21500, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Amber Whisper", price: 19500, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Ocean Mist", price: 22000, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Rose Elixir", price: 24000, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },

    // 💎 Earrings
    { name: "Rose Gold Studs", price: 8500, image: "https://images.unsplash.com/photo-1618354691214-8e3c3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Crystal Drops", price: 12000, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Pearl Hoops", price: 9500, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Twist Dangles", price: 11000, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Mini Gem Studs", price: 7800, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },

    // 💍 Rings
    { name: "Gold Band Ring", price: 15000, image: "https://images.unsplash.com/photo-1616627989395-2f3e1b7b2b2f?auto=format&fit=crop&w=600&q=80" },
    { name: "Silver Stack Ring", price: 12500, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Emerald Halo Ring", price: 18500, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Twist Knot Ring", price: 9800, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Crystal Dome Ring", price: 14200, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },

    // 👟 Sneakers
    { name: "White Classic Sneakers", price: 32000, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Retro High-Tops", price: 35000, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Canvas Low-Rise", price: 28000, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Chunky Street Sneakers", price: 37000, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Slip-On Trainers", price: 29500, image: "https://images.unsplash.com/photo-1618354691214-8e3c3e9a3e3f?auto=format&fit=crop&w=600&q=80" },

    // 👠 Heels
    { name: "Golden Hour Heels", price: 27000, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Crimson Stiletto", price: 31000, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Nude Block Heels", price: 26000, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Strappy Sandal Heels", price: 28500, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Velvet Platform Heels", price: 34000, image: "https://images.unsplash.com/photo-1618354691214-8e3c3e9a3e3f?auto=format&fit=crop&w=600&q=80" },

    // 🧢 Belts
    { name: "Classic Leather Belt", price: 15000, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Gold Buckle Belt", price: 17500, image: "https://images.unsplash.com/photo-1600185364003-0c3b5f3e1e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Braided Tan Belt", price: 13500, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Slim Black Belt", price: 12000, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Double Ring Belt", price: 14500, image: "https://images.unsplash.com/photo-1618354691214-8e3c3e9a3e3f?auto=format&fit=crop&w=600&q=80" },

       // 🕶️ Sunglasses
    { name: "Aviator Shades", price: 18000, image: "https://images.unsplash.com/photo-1606813909357-9c7e3b6d4e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Round Frame Glasses", price: 16500, image: "https://images.unsplash.com/photo-1585386959984-a415522b831d?auto=format&fit=crop&w=600&q=80" },
    { name: "Cat Eye Sunglasses", price: 19000, image: "https://images.unsplash.com/photo-1606813909357-9c7e3b6d4e2e?auto=format&fit=crop&w=600&q=80" },
    { name: "Oversized Black Frames", price: 21000, image: "https://images.unsplash.com/photo-1622464115814-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" },
    { name: "Retro Tinted Glasses", price: 17500, image: "https://images.unsplash.com/photo-1598032891746-9b3f3e9a3e3f?auto=format&fit=crop&w=600&q=80" }
  ];

  const container = document.getElementById("featured-products");

  featuredProducts.forEach((product, index) => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <img src="${sanitize(product.image)}" alt="${sanitize(product.name)}" />
      <h3>${sanitize(product.name)}</h3>
      <p>₦${product.price.toLocaleString()}</p>
      <button data-index="${index}">Add to Cart</button>
    `;
    container.appendChild(div);
  });

  container.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.getAttribute("data-index");
      const product = featuredProducts[index];
      addToCart(product);
    }
  });
});

/**
 * Adds a product to the cart and saves to localStorage.
 * @param {Object} product
 */
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${product.name} added to cart!`);
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
