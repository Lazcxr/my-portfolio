const products = [
  { id: 1, name: "Gaming Mouse", price: 850, category: "accessory", image: "../img/product-1.svg" },
  { id: 2, name: "Mechanical Keyboard", price: 1450, category: "accessory", image: "../img/product-2.svg" },
  { id: 3, name: "Gaming Laptop", price: 35900, category: "laptop", image: "../img/product-3.svg" },
  { id: 4, name: "SSD 1TB", price: 2200, category: "component", image: "../img/product-4.svg" },
];

let cart = [];

function renderProducts(filtered = products) {
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  filtered.forEach(product => {
    grid.innerHTML += `
      <div class="bg-white rounded shadow p-4 text-center">
        <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover mb-2 rounded">
        <h3 class="font-semibold">${product.name}</h3>
        <p class="text-sm text-gray-600">${product.price} THB</p>
        <button onclick="addToCart(${product.id})" class="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  cart.push(product);
  updateCart();
  showNotification(`${product.name} added to cart.`);
}

function removeFromCart(index) {
  const product = cart[index];
  cart.splice(index, 1);
  updateCart();
  showNotification(`${product.name} removed from cart.`, 'error');
}

function clearCart() {
  if (cart.length === 0) {
    showNotification("Cart is already empty.", "error");
    return;
  }
  cart = [];
  updateCart();
  showNotification("All items removed from cart.", "error");
}

function updateCart() {
  document.getElementById('cart-count').textContent = cart.length;
  const list = document.getElementById('cartItems');
  list.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    list.innerHTML += `
      <li class="flex justify-between items-center border-b py-2">
        <span>${item.name} - ${item.price} THB</span>
        <button onclick="removeFromCart(${index})" class="text-red-500 hover:underline text-sm">Remove</button>
      </li>
    `;
    total += item.price;
  });

  document.getElementById('cartTotal').textContent = `${total} THB`;
}

document.getElementById("removeAll").addEventListener("click", () => {
  if (cart.length > 0) {
    cart = [];
    updateCart();
    showNotification("All items removed from cart.", "error");
  }
});

function applyFilters() {
  const category = document.getElementById('categoryFilter').value;
  const price = document.getElementById('priceFilter').value;

  let filtered = products;

  if (category !== 'all') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (price === 'low') {
    filtered = filtered.filter(p => p.price < 1000);
  } else if (price === 'high') {
    filtered = filtered.filter(p => p.price >= 1000);
  }

  renderProducts(filtered);
}

function showNotification(message, type = 'success') {
  const notif = document.getElementById('notification');
  notif.textContent = message;
  notif.className = `fixed left-1/2 transform -translate-x-1/2 top-20 text-white text-lg font-semibold px-6 py-3 rounded-lg shadow-lg z-50 opacity-0 transition-opacity duration-300 ${
    type === 'error' ? 'bg-red-600' : 'bg-green-600'
  }`;

  notif.classList.remove('hidden');
  setTimeout(() => notif.classList.add('opacity-100'), 20); // Fade in
  setTimeout(() => {
    notif.classList.remove('opacity-100');
    setTimeout(() => notif.classList.add('hidden'), 300); // Fade out
  }, 2000);
}

// Open cart
document.getElementById('cart-btn').addEventListener('click', () => {
  document.getElementById('cartModal').classList.remove('translate-x-full');
});

// Close cart
document.getElementById('closeCart').addEventListener('click', () => {
  document.getElementById('cartModal').classList.add('translate-x-full');
});

// Filter Events
document.getElementById('categoryFilter').addEventListener('change', applyFilters);
document.getElementById('priceFilter').addEventListener('change', applyFilters);

// Init
renderProducts();
