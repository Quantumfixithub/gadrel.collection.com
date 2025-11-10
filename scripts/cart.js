// cart.js
export function getCart() {
  return JSON.parse(localStorage.getItem("cart") || "[]");
}

export function clearCart() {
  localStorage.removeItem("cart");
}

export function getCartTotal() {
  return getCart().reduce((sum, item) => sum + item.price, 0);
}
