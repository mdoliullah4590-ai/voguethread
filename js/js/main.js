document.addEventListener("DOMContentLoaded", () => {
  updateCartUI();
  renderFeaturedProducts();
  initScrollEffects();
  addBackToTop();
});

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

function initScrollEffects() {
  const header = document.getElementById("header");
  const backBtn = document.querySelector(".back-to-top");
  window.addEventListener("scroll", () => {
    if (header) header.classList.toggle("scrolled", window.scrollY > 40);
    if (backBtn) backBtn.classList.toggle("visible", window.scrollY > 400);
  });
}

function addBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.innerHTML = '<i class="fa fa-arrow-up"></i>';
  btn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
  document.body.appendChild(btn);
}

function toggleSearch() {
  const bar = document.getElementById("searchBar");
  if (!bar) return;
  bar.classList.toggle("open");
  if (bar.classList.contains("open")) {
    document.getElementById("searchInput").focus();
  }
}

function toggleMenu() {
  const nav = document.getElementById("navMenu");
  const ham = document.getElementById("hamburger");
  if (nav) nav.classList.toggle("open");
  if (ham) ham.classList.toggle("open");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

function subscribeNewsletter(e) {
  e.preventDefault();
  const input = e.target.querySelector("input[type='email']");
  showToast("You're subscribed! Welcome to the inner circle!");
  input.value = "";
}

function submitContactForm(e) {
  e.preventDefault();
  showToast("Message sent! We'll get back to you within 24 hours.");
  e.target.reset();
}

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
    : `<p style="color:var(--gray);grid-column:1/-1;text-align:center;padding:40px 0;">No products found.</p>`;
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

function initProductPage() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (typeof initProductPageFirebase === "function") {
    initProductPageFirebase();
    return;
  }
  const product = PRODUCTS.find(p => p.id === parseInt(id));
  if (!product) { window.location.href = "shop.html"; return; }
  populateProductDetail(product);
}

function populateProductDetail(product) {
  document.title = `${product.name} — VogueThread`;
  const setTxt = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val || ""; };
  setTxt("productName", product.name);
  setTxt("productPrice", formatPrice(product.price));
  setTxt("productDesc", product.description);
  setTxt("productRatingStars", renderStars(product.rating || 5));
  setTxt("productRatingCount", `(${product.reviews || 0} reviews)`);
  const oldEl = document.getElementById("productOldPrice");
  if (oldEl) oldEl.textContent = product.oldPrice ? formatPrice(product.oldPrice) : "";
  const sizeCont = document.getElementById("productSizes");
  if (sizeCont && product.sizes) {
    sizeCont.innerHTML = product.sizes.map((s, i) =>
      `<button class="size-btn ${i===0?"active":""}" onclick="selectSize(this,'${s}')">${s}</button>`
    ).join("");
  }
  const colorCont = document.getElementById("productColors");
  if (colorCont && product.colors) {
    colorCont.innerHTML = product.colors.map((c, i) =>
      `<div class="color-swatch ${i===0?"active":""}" style="background:${c}" onclick="selectColor(this,'${c}')"></div>`
    ).join("");
  }
  const addBtn = document.getElementById("addToCartBtn");
  if (addBtn) {
    addBtn.onclick = () => {
      const selSize = document.querySelector(".size-btn.active")?.textContent;
      addToCart(product.id, selSize);
    };
  }
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
