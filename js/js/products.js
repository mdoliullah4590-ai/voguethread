const PRODUCTS = [
  {
    id: 1,
    name: "Classic Linen Blazer",
    category: "women",
    price: 129.99,
    oldPrice: null,
    badge: "New",
    rating: 4.8,
    reviews: 42,
    description: "A timeless linen blazer tailored for the modern woman. Lightweight, breathable, and impeccably cut.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["#1a1a1a", "#c8b49a", "#f0ece4"],
    icon: "fa-shirt",
    featured: true,
    inStock: true
  },
  {
    id: 2,
    name: "Relaxed Denim Jeans",
    category: "men",
    price: 89.99,
    oldPrice: 119.99,
    badge: "Sale",
    rating: 4.6,
    reviews: 78,
    description: "Premium denim with a relaxed fit. Made from sustainably sourced cotton.",
    sizes: ["28", "30", "32", "34", "36"],
    colors: ["#3b4a6b", "#1a1a1a", "#a0856c"],
    icon: "fa-shirt",
    featured: true,
    inStock: true
  },
  {
    id: 3,
    name: "Silk Slip Dress",
    category: "women",
    price: 159.99,
    oldPrice: null,
    badge: null,
    rating: 4.9,
    reviews: 33,
    description: "Elegantly minimal silk slip dress. Drapes beautifully and transitions seamlessly from day to night.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["#f5e6d0", "#1a1a1a", "#c0562a"],
    icon: "fa-shirt",
    featured: true,
    inStock: true
  },
  {
    id: 4,
    name: "Structured Tote Bag",
    category: "accessories",
    price: 74.99,
    oldPrice: null,
    badge: "Bestseller",
    rating: 4.7,
    reviews: 95,
    description: "A structured tote made from premium vegan leather. Spacious interior with a laptop sleeve.",
    sizes: ["One Size"],
    colors: ["#1a1a1a", "#c8b49a", "#8b4513"],
    icon: "fa-bag-shopping",
    featured: true,
    inStock: true
  }
];

function renderStars(rating) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= Math.round(rating) ? "★" : "☆";
  }
  return stars;
}

function formatPrice(price) {
  return "$" + parseFloat(price).toFixed(2);
}

function renderProductCard(product) {
  return `
    <div class="product-card" onclick="goToProduct(${product.id})">
      <div class="product-card__img">
        <i class="fa ${product.icon}"></i>
        ${product.badge ? `<div class="product-card__badge">${product.badge}</div>` : ""}
        <div class="product-card__actions" onclick="event.stopPropagation(); addToCart(${product.id})">
          + Add to Bag
        </div>
      </div>
      <div class="product-card__info">
        <div class="product-card__rating">${renderStars(product.rating)} (${product.reviews})</div>
        <h4>${product.name}</h4>
        <div class="product-price">
          <span class="price">${formatPrice(product.price)}</span>
          ${product.oldPrice ? `<span class="price-old">${formatPrice(product.oldPrice)}</span>` : ""}
        </div>
      </div>
    </div>`;
}

function goToProduct(id) {
  window.location.href = `product.html?id=${id}`;
}
