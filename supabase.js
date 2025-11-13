// supabase.js
const SUPABASE_URL = "https://amrvwccagixmktagoecv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// supabase.js

// Load Supabase client (make sure you include the CDN in your HTML before this file)
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

const SUPABASE_URL = "https://amrvwccagixmktagoecv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//
// 🔐 AUTH FUNCTIONS
//

// Sign up new user
async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) {
    alert(error.message);
  } else {
    alert("Account created! Please check your email to confirm.");
  }
}

// Sign in existing user
async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    alert(error.message);
  } else {
    alert("Signed in successfully!");
    localStorage.setItem("userLoggedIn", "true");
    window.location.href = "index.html"; // redirect after login
  }
}

// Sign out user
async function signOut() {
  await supabase.auth.signOut();
  localStorage.removeItem("userLoggedIn");
  window.location.href = "signin.html";
}

//
// 🛒 CART FUNCTIONS
//

// Add product to cart by product ID
async function addToCartByProductId(productId) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert("Please sign in first.");
    window.location.href = "signin.html";
    return;
  }

  // Check if item already exists in cart
  const { data: existing, error: findErr } = await supabase
    .from("cart_items")
    .select("*")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .limit(1);

  if (findErr) {
    alert(findErr.message);
    return;
  }

  if (existing && existing.length > 0) {
    const item = existing[0];
    const { error: updErr } = await supabase
      .from("cart_items")
      .update({ quantity: item.quantity + 1 })
      .eq("id", item.id);
    if (updErr) {
      alert(updErr.message);
      return;
    }
  } else {
    const { error: insErr } = await supabase
      .from("cart_items")
      .insert({ user_id: user.id, product_id: productId, quantity: 1 });
    if (insErr) {
      alert(insErr.message);
      return;
    }
  }

  alert("Item added to cart ✅");
  updateCartCount();
}

// Fetch cart items for current user
async function fetchCart() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from("cart_items")
    .select(`
      id, quantity,
      products:product_id (id, name, price, image)
    `)
    .eq("user_id", user.id);

  if (error) {
    alert(error.message);
    return [];
  }
  return data;
}

// Update cart count badge
async function updateCartCount() {
  const { data: { user } } = await supabase.auth.getUser();
  const el = document.getElementById("cart-count");
  if (!el) return;

  if (!user) {
    el.textContent = 0;
    return;
  }

  const items = await fetchCart();
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);
  el.textContent = totalQty;
}

// Run on page load
document.addEventListener("DOMContentLoaded", updateCartCount);

async function createOrderFromCart() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const cartItems = await fetchCart();
  if (cartItems.length === 0) return alert("Cart is empty!");

  const total = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0);

  const { data: order, error: orderErr } = await supabase
    .from("orders")
    .insert({ user_id: user.id, total })
    .select()
    .single();

  if (orderErr) return alert(orderErr.message);

  const orderItems = cartItems.map(item => ({
    order_id: order.id,
    product_id: item.products.id,
    quantity: item.quantity,
    price: item.products.price
  }));

  const { error: itemsErr } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsErr) return alert(itemsErr.message);

  await supabase
    .from("cart_items")
    .delete()
    .eq("user_id", user.id);

  alert("Order placed successfully!");
}
