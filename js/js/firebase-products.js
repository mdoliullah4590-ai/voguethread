async function loadProductsFromFirebase() {
  try {
    const snapshot = await db.collection("products").orderBy("createdAt", "desc").get();
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.warn("Firebase load failed, using local products:", error);
    return PRODUCTS;
  }
}

async function renderFeaturedProductsFirebase() {
  const container = document.getElementById("featuredProducts");
  if (!container) return;
  container.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:40px 0;color:var(--gray);">
      <i class="fa fa-spinner fa-spin" style="font-size:2rem;"></i>
      <p style="margin-top:12px;">Loading products...</p>
    </div>`;
  try {
    const products = await loadProductsFromFirebase();
    const featured = products.filter(p => p.featured);
    if (featured.length === 0) {
      container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--gray);padding:40px 0;">No featured products yet.</p>`;
      return;
    }
    container.innerHTML = featured.slice(0, 4).map(p => renderFirebaseProductCard(p)).join("");
  } catch (e) {
    container.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--gray);">Could not load products.</p>`;
  }
}

async function renderShopProductsFirebase(category = "all", sortBy = "default") {
  const grid = document.getElementById("shopProducts");
  if (!grid) return;
  grid.innerHTML = `
    <div style="grid-column:1/-1;text-align:center;padding:40px 0;color:var(--gray);">
      <i class="fa fa-spinner fa-spin" style="font-size:2rem;"></i>
      <p style="margin-top:12px;">Loading products...</p>
    </div>`;
  try {
    let products = await loadProductsFromFirebase();
    if (category !== "all") products = products.filter(p => p.category === category);
    if (sortBy === "price-low") products.sort((a, b) => a.price - b.price);
    if (sortBy === "price-high") products.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    const countEl = document.getElementById("productCount");
    if (countEl) countEl.textContent = `${products.length} Products`;
    grid.innerHTML = products.length
      ? products.map(p => renderFirebaseProductCard(p)).join("")
      : `<p style="grid-column:1/-1;text-align:center;color:var(--gray);padding:40px 0;">No products found.</p>`;
  } catch (e) {
    grid.innerHTML = `<p style="grid-column:1/-1;text-align:center;color:var(--gray);">Could not load products.</p>`;
  }
}

function renderFirebaseProductCard(product) {
  const imgContent = product.imageURL
    ? `<img src="${product.imageURL}" alt="${product.name}" style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;"/>`
    : `<i class="fa fa-shirt" style="font-size:4rem;color:var(--light);"></i>`;
  return `
    <div class="product-card" onclick="goToProductFirebase('${product.id}')">
      <div class="product-card__img">
        ${imgContent}
        ${product.badge ? `<div class="product-card__badge">${product.badge}</div>` : ""}
        <div class="product-card__actions" onclick="event.stopPropagation();addToCartFirebase('${product.id}')">
          + Add to Bag
        </div>
      </div>
      <div class="product-card__info">
        <div class="product-card__rating">${renderStars(product.rating || 5)} (${product.reviews || 0})</div>
        <h4>${product.name}</h4>
        <div class="product-price">
          <span class="price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
      </div>
    </div>`;
}

function goToProductFirebase(id) {
  window.location.href = `product.html?id=${id}`;
}

async function addToCartFirebase(productId) {
  try {
    const doc = await db.collection("products").doc(productId).get();
    if (doc.exists) {
      const product = { id: doc.id, ...doc.data() };
      addToCartDynamic(product);
    }
  } catch (e) {
    showToast("Could not add item. Please try again.");
  }
}

async function initProductPageFirebase() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) { window.location.href = "shop.html"; return; }
  try {
    const doc = await db.collection("products").doc(id).get();
    if (!doc.exists) { window.location.href = "shop.html"; return; }
    const product = { id: doc.id, ...doc.data() };
    populateProductDetail(product);
    const snap = await db.collection("products").where("category", "==", product.category).limit(5).get();
    const related = [];
    snap.forEach(d => { if (d.id !== id) related.push({ id: d.id, ...d.data() }); });
    const relatedContainer = document.getElementById("relatedProducts");
    if (relatedContainer) {
      relatedContainer.innerHTML = related.slice(0, 4).map(p => renderFirebaseProductCard(p)).join("");
    }
  } catch (e) {
    window.location.href = "shop.html";
  }
}

function addToCartDynamic(product) {
  const existing = cart.findIndex(i => i.id === product.id);
  if (existing > -1) {
    cart[existing].qty++;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      icon: "fa-shirt",
      image: product.imageURL || null,
      size: product.selectedSize || (product.sizes && product.sizes[0]) || "M",
      qty: 1
    });
  }
  saveCart();
  updateCartUI();
  showToast(`"${product.name}" added to your bag!`);
  openCart();
                                                             }
