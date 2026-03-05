# 👗 VogueThread — Clothing Website

A complete, responsive clothing e-commerce website built with pure HTML, CSS, and JavaScript. Ready to deploy on GitHub Pages for **free**.

---

## 📁 Project Structure

```
clothing-website/
│
├── index.html          ← Homepage
├── shop.html           ← Shop / all products page
├── product.html        ← Single product detail page
├── about.html          ← About us page
├── contact.html        ← Contact page
├── README.md           ← This file
│
├── css/
│   └── style.css       ← All styles
│
└── js/
    ├── products.js     ← Product data & card rendering
    ├── cart.js         ← Shopping cart logic
    └── main.js         ← Page-specific logic
```

---

## ✅ Features

- 🛍️ Product catalog with filtering and sorting
- 🛒 Fully working shopping cart (sidebar + localStorage)
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔍 Search bar
- 📧 Newsletter signup
- 🌟 Product reviews / ratings display
- 🏷️ Category filtering
- 🎨 Beautiful editorial design (Playfair Display + DM Sans)
- ⚡ Zero dependencies — pure HTML/CSS/JS

---

## 🚀 HOW TO DEPLOY ON GITHUB PAGES (Step by Step)

### STEP 1 — Create a GitHub Account
1. Go to **https://github.com**
2. Click **"Sign up"** and create a free account
3. Verify your email address

---

### STEP 2 — Create a New Repository
1. Click the **"+"** icon (top right) → **"New repository"**
2. Fill in the details:
   - **Repository name:** `clothing-website` (or any name you like)
   - **Description:** My clothing store website
   - **Visibility:** ✅ Public *(required for free GitHub Pages)*
   - **Initialize this repository with:** ✅ Add a README file
3. Click **"Create repository"**

---

### STEP 3 — Upload Your Files

**Option A — Upload via Browser (Easiest):**
1. Open your new repository on GitHub
2. Click **"Add file"** → **"Upload files"**
3. Drag and drop ALL your project files:
   - `index.html`
   - `shop.html`
   - `product.html`
   - `about.html`
   - `contact.html`
   - The entire `css/` folder
   - The entire `js/` folder
4. Scroll down, add a commit message like `"Initial website upload"`
5. Click **"Commit changes"**

> ⚠️ Important: Upload files keeping their folder structure intact.
> `css/style.css` must stay inside a `css` folder,
> and `js/` files must stay inside a `js` folder.

**Option B — Using Git (For developers):**
```bash
# 1. Clone your repository
git clone https://github.com/YOUR_USERNAME/clothing-website.git

# 2. Copy all your project files into the cloned folder

# 3. Add, commit, and push
cd clothing-website
git add .
git commit -m "Initial website upload"
git push origin main
```

---

### STEP 4 — Enable GitHub Pages
1. In your repository, click **"Settings"** (top tab)
2. In the left sidebar, click **"Pages"**
3. Under **"Source"**, set:
   - Branch: **main**
   - Folder: **/ (root)**
4. Click **"Save"**
5. GitHub will show a message:
   > *"Your site is live at https://YOUR_USERNAME.github.io/clothing-website/"*

---

### STEP 5 — Wait & Visit Your Live Site!
- It usually takes **1–3 minutes** to go live
- Your website URL will be:
  ```
  https://YOUR_USERNAME.github.io/clothing-website/
  ```
- Share this link with anyone!

---

## 🛠️ How to Make Changes

After your site is live, to update it:

1. Edit your files locally
2. Go to GitHub → your repository
3. Click the file you want to change → pencil icon ✏️ (Edit)
4. Make your changes, commit them
5. GitHub Pages will automatically update within 1–2 minutes

---

## 🎨 How to Customize

### Change the brand name
- Search for `VogueThread` and `VOGUETHREAD` across all HTML files
- Replace with your brand name

### Change colors
Open `css/style.css` and edit the CSS variables at the top:
```css
:root {
  --rust:    #c0562a;   ← Main accent color (change this!)
  --black:   #0d0d0d;   ← Text & backgrounds
  --white:   #f8f6f2;   ← Background
  --cream:   #f0ece4;   ← Light sections
}
```

### Add a new product
Open `js/products.js` and add a new object to the `PRODUCTS` array:
```javascript
{
  id: 9,                          ← Unique ID
  name: "My New Product",
  category: "women",              ← women / men / accessories
  price: 89.99,
  oldPrice: null,                 ← null or a number for sale price
  badge: "New",                   ← null, "New", "Sale", "Bestseller"
  rating: 4.7,
  reviews: 10,
  description: "Product description here.",
  sizes: ["XS", "S", "M", "L"],
  colors: ["#1a1a1a", "#c8b49a"],
  icon: "fa-shirt",               ← FontAwesome icon name
  featured: true,                 ← Show on homepage?
  inStock: true
}
```

### Add real product images
Replace the icon placeholders in `product.html` and product cards:
```html
<!-- Replace the icon with an img tag -->
<img src="images/my-product.jpg" alt="Product Name"/>
```
Then upload your images to an `images/` folder in your repository.

---

## 🔌 Connect a Real Payment System

When you're ready to accept real payments:

1. **Shopify Buy Button** — Create a Shopify Lite account ($9/mo) and embed buy buttons into your HTML
2. **Stripe** — Add the Stripe.js library and build a checkout form
3. **PayPal Buttons** — Use PayPal's hosted button generator (free)
4. **Gumroad** — Simple product pages you can link to

---

## 📧 Connect a Real Contact Form

The contact form currently shows a toast message. To receive real emails:

1. **Formspree (Free):** Replace the form tag with:
   ```html
   <form action="https://formspree.io/f/YOUR_ID" method="POST">
   ```
2. **EmailJS:** Add their SDK and send emails directly from JavaScript
3. **Netlify Forms:** Deploy on Netlify instead and add `netlify` attribute to your form

---

## 📦 Optional: Use a Custom Domain

1. Buy a domain from Namecheap, GoDaddy, etc. (e.g., `yourstore.com`)
2. In GitHub Pages settings, enter your custom domain
3. Update your domain's DNS settings to point to GitHub's servers
4. GitHub will provide the exact DNS records you need

---

## 🌐 Alternative Free Hosting Options

| Platform | Notes |
|---|---|
| **GitHub Pages** | Free, great for static sites |
| **Netlify** | Free, better forms & build tools |
| **Vercel** | Free, fastest CDN |
| **Cloudflare Pages** | Free, unlimited bandwidth |

All of the above support free SSL (HTTPS) automatically.

---

## 📄 License

Free to use and customize for your own clothing website.

---

*Built with ❤️ using pure HTML, CSS, and JavaScript.*
