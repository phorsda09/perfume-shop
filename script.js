
// Add to Cart Function
function addToCart(title, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.title === title);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ title, price, image, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${title} added to cart!`);
}

// -----------------------------
// Cart & Product Detail JS
// -----------------------------

// Get DOM elements (cart page)
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');


// Load cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// -----------------------------
// Render Cart Page
// -----------------------------
function renderCart() {
  if (!cartItemsContainer) return; // Skip if not on cart page

  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <p>Your cart is empty.</p>
    `;
    cartTotal.textContent = '0';
    updateCartCount();
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const cartItem = document.createElement('div');
    
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="cart-item-img"/>
      <div class="cart-item-info">
        <h4>${item.title}</h4>
        <p>Price: $${item.price}</p>
        <div class="quantity-control">
          <button class="qty-btn" onclick="decreaseQuantity(${index})">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="increaseQuantity(${index})">+</button>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  cartTotal.textContent = total.toFixed(2);
  updateCartCount();
}

// -----------------------------
// Cart Operations
// -----------------------------
function increaseQuantity(index) {
  cart[index].quantity += 1;
  saveCart();
  renderCart();
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  saveCart();
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  renderCart();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// -----------------------------
// Navbar Cart Count
// -----------------------------
function updateCartCount() {
  if (!cartCount) return;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// -----------------------------
// Product Detail Page - Add to Cart
// -----------------------------
function addDetailToCart() {
  const titleEl = document.getElementById('product-title');
  const priceEl = document.getElementById('product-price');
  const imageEl = document.getElementById('product-img');
  const quantityEl = document.getElementById('quantity');

  if (!titleEl || !priceEl || !imageEl || !quantityEl) return;

  const title = titleEl.textContent;
  const price = parseFloat(priceEl.textContent);
  const image = imageEl.src;
  const quantity = parseInt(quantityEl.value);

  const existing = cart.find(item => item.title === title);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ title, price, image, quantity });
  }

  saveCart();
  updateCartCount();
  alert(`${title} has been added to your cart!`);
}

// -----------------------------
// Initialize
// -----------------------------
renderCart();
updateCartCount();

// Optional: set product title dynamically if needed
const productTitle = document.getElementById('product-title');
if (productTitle && productTitle.textContent.trim() === "") {
  productTitle.textContent = "Oriental Luxury Perfume";
}


// Auto-render if cart.html
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('cart.html')) {
    renderCart();
  }
});
function addDetailToCart() {
  const title = document.getElementById('product-title').innerText;
  const price = parseFloat(document.getElementById('product-price').innerText);
  const image = document.getElementById('product-img').getAttribute('src');
  const quantity = parseInt(document.getElementById('quantity').value);

  if (quantity < 1) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existing = cart.find(item => item.title === title);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ title, price, image, quantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  alert(`${quantity} x ${title} added to cart!`);
}
function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const location = document.getElementById('location').value.trim();

  if (!name || !phone || !location) {
    alert("Please fill out all fields.");
    return;
  }

  // You can extend this to send data to a backend
  console.log("Order submitted:", { name, phone, location });

  localStorage.removeItem('cart');
  document.getElementById('orderForm').style.display = 'none';
  document.getElementById('order-confirmation').style.display = 'block';
}
// Parse product detail from URL
  const params = new URLSearchParams(window.location.search);
  document.getElementById('product-title').textContent = params.get('title') || 'Product Title';
  document.getElementById('product-price').textContent = params.get('price') || '0';
  document.getElementById('product-img').src = params.get('image') || 'images/default.jpg';
  function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count;
}

// Run this on every page load
document.addEventListener('DOMContentLoaded', updateCartCount);
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badge = document.getElementById('cart-count');
  if (badge) badge.textContent = count;
}

document.addEventListener('DOMContentLoaded', updateCartCount);
localStorage.setItem('cart', JSON.stringify(cart));
updateCartCount(); // ← This is important
function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const index = cart.findIndex(item => item.name === name);
  if (index > -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount(); // ✅ This updates the badge
}
function filterProducts(category) {
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    if (category === 'all' || product.classList.contains(category)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
function filterProducts(category) {
  const products = document.querySelectorAll('.product');
  products.forEach(product => {
    if (category === 'all' || product.classList.contains(category)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });

  // Smooth scroll to product section
  const productSection = document.getElementById('product-section');
  if (productSection) {
    productSection.scrollIntoView({ behavior: 'smooth' });
  }
}
function filterProducts(category) {
  const allProducts = document.querySelectorAll(
    '.product-discount, .product-new, .product-best, .product-man, .product-woman'
  );

  allProducts.forEach(product => {
    const isMatchingCategory = category === 'all' || product.classList.contains(`product-${category}`);
    product.classList.toggle('product-hidden', !isMatchingCategory);
  });
}
 ScrollReveal().reveal('.team-member', {
    delay: 200,
    duration: 1000,
    distance: '50px',
    origin: 'bottom',
    interval: 200,
    reset: false
  });
//AOS and Toggle Script //
   AOS.init();
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

