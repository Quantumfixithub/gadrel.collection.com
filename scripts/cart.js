    document.addEventListener("DOMContentLoaded", () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const container = document.getElementById("cart-items");
      const summary = document.getElementById("cart-summary");

      function renderCart() {
        container.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
          container.innerHTML = "<p>Your cart is empty.</p>";
          summary.innerHTML = "";
          return;
        }

        cart.forEach((item, index) => {
          total += item.price;
          const div = document.createElement("div");
          div.className = "product";
          div.innerHTML = `
            <img src="${item.image}" alt="${item.name}" />
            <h3>${item.name}</h3>
            <p>₦${item.price.toLocaleString()}</p>
            <button onclick="removeItem(${index})">Remove</button>
          `;
          container.appendChild(div);
        });

        summary.innerHTML = `<strong>Total: ₦${total.toLocaleString()}</strong>`;
      }

      window.removeItem = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
      };

      renderCart();
    });
  
