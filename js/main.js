// =============================================
//  VOGUE THREAD — Main JavaScript
// =============================================

// --- ON PAGE LOAD ---
document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  renderFeaturedProducts();
  initScrollEffects();
  addBackToTop();
});

// --- RENDER FEATURED PRODUCTS ON HOMEPAGE ---
function renderFeaturedProducts() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;
  if (typeof renderFeaturedProductsFirebase === "function") {
    renderFeaturedProductsFirebase();
  } else {
    const featured = PRODUCTS.filter(p => p.featured);
    container.innerHTML = featured.map(renderProductCard).join("");
  }
}

// --- SCROLL EFFECTS ---
function initScrollEffects() {
  const header = document.getElementById("header");
  const backBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
    if (backBtn) {
      backBtn.classList.toggle("visible", window.scrollY > 400);
    }
  });
}

// --- BACK TO TOP BUTTON ---
function addBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.innerHTML = '<i class="fa fa-arrow-up"></i>';
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.appendChild(btn);
}

// --- SEARCH BAR ---
function toggleSearch() {
  const bar = document.getElementById("searchBar");
  if (!bar) return;
  bar.classList.toggle("open");
  if (bar.classList.contains("open")) {
    document.getElementById("searchInput").focus();
  }
}

// --- MOBILE MENU ---
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const ham = document.getElementById("hamburger");
  if (nav) nav.classList.toggle("open");
  if (ham) ham.classList.toggle("open");
}

// --- TOAST NOTIFICATION ---
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// --- NEWSLETTER FORM ---
function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector("input[type='email']");
  showToast("You're subscribed! Welcome to the inner circle 🎉");
  input.value = "";
}

// --- CONTACT FORM (contact.html) ---
function submitContactForm(e) {
  e.preventDefault();
  showToast("Message sent! We'll get back to you within 24 hours.");
  e.target.reset();
}

// =============================================
//  SHOP PAGE LOGIC (shop.html)
// =============================================
function initShopPage() {
  const grid = document.getElementById("shopProducts");
  if (!grid) return;

  const params = new URLSearchParams(window.location.search);
  const catFilter = params.get("cat") || "all";

  if (typeof renderShopProductsFirebase === "function") {
    renderShopProductsFirebase(catFilter);
  } else {
    renderShopProducts(catFilter);
  }
  setupFilters(catFilter);
}

function renderShopProducts(category = "all", sortBy = "default") {
  const grid = document.getElementById("shopProducts");
  if (!grid) return;

  if (typeof renderShopProductsFirebase === "function") {
    renderShopProductsFirebase(category, sortBy);
    return;
  }

  let filtered = category === "all" ? [...PRODUCTS] : PRODUCTS.filter(p => p.category === category);

  if (sortBy === "price-low") filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === "price-high") filtered.sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered.sort((a, b) => b.rating - a.rating);

  const countEl = document.getElementById("productCount");
  if (countEl) countEl.textContent = `${filtered.length} Products`;

  grid.innerHTML = filtered.length
    ? filtered.map(renderProductCard).join("")
    : `<p style="color:var(--gray); grid-column:1/-1; text-align:center; padding:40px 0;">No products found in this category.</p>`;
}

function setupFilters(activeCat) {
  const tabs = document.querySelectorAll(".cat-tab");
  tabs.forEach(tab => {
    tab.classList.toggle("active", tab.dataset.cat === activeCat);
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderShopProducts(tab.dataset.cat, getCurrentSort());
    });
  });

  const sortSelect = document.getElementById("sortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      const activeCatTab = document.querySelector(".cat-tab.active");
      renderShopProducts(activeCatTab ? activeCatTab.dataset.cat : "all", sortSelect.value);
    });
  }
}

function getCurrentSort() {
  const sel = document.getElementById("sortSelect");
  return sel ? sel.value : "default";
}

// =============================================
//  PRODUCT DETAIL PAGE (product.html)
// =============================================
function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const product = PRODUCTS.find(p => p.id === id);

  if (!product) {
    document.querySelector(".product-detail").innerHTML = `
      <div class="container" style="text-align:center; padding:80px 0;">
        <h2>Product not found</h2>
        <a href="shop.html" class="btn btn--primary" style="margin-top:20px;">Back to Shop</a>
      </div>`;
    return;
  }

  document.title = `${product.name} — VogueThread`;

  document.getElementById("productName").textContent    = product.name;
  document.getElementById("productPrice").textContent   = formatPrice(product.price);
  document.getElementById("productDesc").textContent    = product.description;
  document.getElementById("productRatingStars").textContent = renderStars(product.rating);
  document.getElementById("productRatingCount").textContent = `(${product.reviews} reviews)`;

  const oldPriceEl = document.getElementById("productOldPrice");
  if (product.oldPrice && oldPriceEl) oldPriceEl.textContent = formatPrice(product.oldPrice);

  // Size options
  const sizeContainer = document.getElementById("productSizes");
  if (sizeContainer) {
    sizeContainer.innerHTML = product.sizes.map((s, i) =>
      `<button class="size-btn ${i === 0 ? 'active' : ''}" onclick="selectSize(this, '${s}')">${s}</button>`
    ).join("");
  }

  // Color swatches
  const colorContainer = document.getElementById("productColors");
  if (colorContainer) {
    colorContainer.innerHTML = product.colors.map((c, i) =>
      `<div class="color-swatch ${i === 0 ? 'active' : ''}" style="background:${c}" onclick="selectColor(this, '${c}')" title="${c}"></div>`
    ).join("");
  }

  // Add to cart button
  const addBtn = document.getElementById("addToCartBtn");
  if (addBtn) {
    addBtn.onclick = () => {
      const selSize  = document.querySelector(".size-btn.active")?.textContent;
      const selColor = document.querySelector(".color-swatch.active")?.style.backgroundColor;
      addToCart(product.id, selSize, selColor);
    };
  }

  // Quantity control
  let qty = 1;
  window.changeProductQty = (delta) => {
    qty = Math.max(1, qty + delta);
    document.getElementById("productQty").textContent = qty;
  };

  // Related products
  const relatedContainer = document.getElementById("relatedProducts");
  if (relatedContainer) {
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
    relatedContainer.innerHTML = related.map(renderProductCard).join("");
  }
}

function selectSize(btn, size) {
  document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
}

function selectColor(swatch, color) {
  document.querySelectorAll(".color-swatch").forEach(s => s.classList.remove("active"));
  swatch.classList.add("active");
}
