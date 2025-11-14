const SUPABASE_URL = "https://amrvwccagixmktagoecv.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFtcnZ3Y2NhZ2l4bWt0YWdvZWN2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwNTEyMzksImV4cCI6MjA3ODYyNzIzOX0.I4lIPpprvDmD4Rs2ePlvnHXhdyyvmwxujAIE-8464Uw";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

//
// 🔐 AUTH FUNCTIONS
//

async function signUp(email, password, name) {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    alert("Signup failed: " + error.message);
    return;
  }

  const userId = data.user?.id || data.session?.user?.id;
  if (!userId) {
    alert("Signup succeeded, but user ID is missing. Please confirm your email.");
    return;
  }

  const { error: userInsertError } = await supabase.from("users").insert({
    id: userId,
    email: email,
    name: name,
    is_admin: false
  });

  if (userInsertError) {
    console.error("User insert error:", userInsertError.message);
    alert("Account created, but user setup failed: " + userInsertError.message);
  } else {
    alert("Account created! Please check your email to confirm.");
  }
}

async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  localStorage.setItem("userLoggedIn", "true");

  const { data: userRow, error: userFetchError } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", data.user.id)
    .single();

  if (userFetchError) {
    console.error("User fetch error:", userFetchError.message);
    alert("Login succeeded, but user lookup failed.");
    return;
  }

  console.log("Redirecting to:", userRow?.is_admin ? "admin-dashboard.html" : "index.html");

  return window.location.href = userRow?.is_admin ? "admin-dashboard.html" : "index.html";
}

async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://yourdomain.com/update-password.html"
  });

  if (error) {
    alert("Reset failed: " + error.message);
  } else {
    alert("Reset link sent! Check your email.");
  }
}

async function signOut() {
  await supabase.auth.signOut();
  localStorage.removeItem("userLoggedIn");
  window.location.href = "signin.html";
}

async function isAdminUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return false;

  const { data: userRow } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  return userRow?.is_admin === true;
}

//
// 🛒 CART FUNCTIONS
//

async function addToCartByProductId(productId) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert("Please sign in first.");
    window.location.href = "signin.html";
    return;
  }

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
