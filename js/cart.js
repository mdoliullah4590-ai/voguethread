// =============================================
//  VOGUE THREAD — Cart Logic
// =============================================

let cart = JSON.parse(localStorage.getItem("vt_cart")) || [];

function saveCart() {
  localStorage.setItem("vt_cart", JSON.stringify(cart));
}

function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const count = getCartCount();
  document.querySelectorAll("#cartCount, #cartItemCount").forEach(el => el.textContent = count);

  const container = document.getElementById("cartItems");
  const footer    = document.getElementById("cartFooter");
  const totalEl   = document.getElementById("cartTotal");

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <i class="fa fa-shopping-bag"></i>
        <p>Your bag is empty</p>
        <a href="shop.html" class="btn btn--primary" onclick="toggleCart()">Start Shopping</a>
      </div>`;
    if (footer) footer.style.display = "none";
  } else {
    container.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item__img"><i class="fa ${item.icon}"></i></div>
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <p>${item.size ? "Size: " + item.size : ""} ${item.color ? "· " + item.color : ""}</p>
          <div class="cart-item__controls">
            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
            <span class="qty-display">${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
            <button class="cart-item__remove" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
          <p><strong>${formatPrice(item.price * item.qty)}</strong></p>
        </div>
      </div>
    `).join("");

    if (footer) {
      footer.style.display = "flex";
      if (totalEl) totalEl.textContent = formatPrice(getCartTotal());
    }
  }
}

function addToCart(productId, size, color) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(
    item => item.id === productId && item.size === size && item.color === color
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty++;
  } else {
    cart.push({
      id:    product.id,
      name:  product.name,
      price: product.price,
      icon:  product.icon,
      size:  size || product.sizes[0],
      color: color || null,
      qty:   1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`"${product.name}" added to your bag!`);
  openCart();
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showToast("Item removed from bag.");
}

function changeQty(productId, delta) {
  const index = cart.findIndex(item => item.id === productId);
  if (index === -1) return;

  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  saveCart();
  updateCartUI();
}

function toggleCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (sidebar) sidebar.classList.toggle("open");
  if (overlay) overlay.classList.toggle("open");
}

function openCart() {
  const sidebar = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");
  if (sidebar) sidebar.classList.add("open");
  if (overlay) overlay.classList.add("open");
      }
    
