const products = [
    // Men’s (10)
    { id: 1, name: "Men’s T-Shirt", price: 19.99, image: "https://picsum.photos/id/237/200/200",category: "male" },
    { id: 2, name: "Men’s Shirt", price: 24.99, image: "https://picsum.photos/id/240/200/200", category: "male" },
    { id: 3, name: "Men’s Jeans", price: 34.99, image: "https://picsum.photos/id/241/200/200", category: "male" },
    { id: 4, name: "Men’s Polo Shirt", price: 22.99, image: "https://picsum.photos/id/242/200/200", category: "male" },
    { id: 5, name: "Men’s Hoodie", price: 29.99, image: "https://picsum.photos/id/243/200/200", category: "male" },
    { id: 6, name: "Men’s Sweater", price: 27.99, image: "https://picsum.photos/id/244/200/200", category: "male" },
    { id: 7, name: "Men’s Jacket", price: 49.99, image: "https://picsum.photos/id/245/200/200", category: "male" },
    { id: 8, name: "Men’s Shorts", price: 21.99, image: "https://picsum.photos/id/246/200/200", category: "male" },
    { id: 9, name: "Men’s Chinos", price: 32.99, image: "https://picsum.photos/id/247/200/200", category: "male" },
    { id: 10, name: "Men’s Blazer", price: 59.99, image: "https://picsum.photos/id/248/200/200", category: "male" },

    // Women’s (10)
    { id: 11, name: "Women’s Blouse", price: 29.99, image: "https://picsum.photos/id/249/200/200", category: "female" },
    { id: 12, name: "Women’s Dress", price: 39.99, image: "https://picsum.photos/id/250/200/200", category: "female" },
    { id: 13, name: "Women’s Skirt", price: 24.99, image: "https://picsum.photos/id/251/200/200", category: "female" },
    { id: 14, name: "Women’s Jeans", price: 32.99, image: "https://picsum.photos/id/252/200/200", category: "female" },
    { id: 15, name: "Women’s Sweater", price: 27.99, image: "https://picsum.photos/id/253/200/200", category: "female" },
    { id: 16, name: "Women’s Jacket", price: 49.99, image: "https://picsum.photos/id/254/200/200", category: "female" },
    { id: 17, name: "Women’s T-Shirt", price: 19.99, image: "https://picsum.photos/id/255/200/200", category: "female" },
    { id: 18, name: "Women’s Shorts", price: 21.99, image: "https://picsum.photos/id/256/200/200", category: "female" },
    { id: 19, name: "Women’s Hoodie", price: 29.99, image: "https://picsum.photos/id/257/200/200", category: "female" },
    { id: 20, name: "Women’s Blazer", price: 59.99, image: "https://picsum.photos/id/258/200/200", category: "female" },

    // Children’s (10)
    { id: 21, name: "Child’s Dress", price: 39.99, image: "https://picsum.photos/id/259/200/200", category: "children" },
    { id: 22, name: "Child’s T-Shirt", price: 14.99, image: "https://picsum.photos/id/260/200/200", category: "children" },
    { id: 23, name: "Child’s Shirt", price: 19.99, image: "https://picsum.photos/id/261/200/200", category: "children" },
    { id: 24, name: "Child’s Jeans", price: 24.99, image: "https://picsum.photos/id/262/200/200", category: "children" },
    { id: 25, name: "Child’s Hoodie", price: 22.99, image: "https://picsum.photos/id/263/200/200", category: "children" },
    { id: 26, name: "Child’s Sweater", price: 27.99, image: "https://picsum.photos/id/264/200/200", category: "children" },
    { id: 27, name: "Child’s Jacket", price: 34.99, image: "https://picsum.photos/id/265/200/200", category: "children" },
    { id: 28, name: "Child’s Shorts", price: 17.99, image: "https://picsum.photos/id/266/200/200", category: "children" },
    { id: 29, name: "Child’s Polo Shirt", price: 19.99, image: "https://picsum.photos/id/267/200/200", category: "children" },
    { id: 30, name: "Child’s Blazer", price: 29.99, image: "https://picsum.photos/id/268/200/200", category: "children" }
];

// Load products into the page
function filterProducts() {
    const category = document.getElementById('categorySelect').value;
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';
    products.forEach(product => {
        if (category === 'all' || product.category === category) {
            const productEl = document.createElement('div');
            productEl.className = 'product';
            productEl.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>$${product.price.toFixed(2)}</p>
                    <button class="addToCart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productsSection.appendChild(productEl);
        }
    });
}

// Cart functionality with local storage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    document.getElementById('cartCount').textContent = cart.length;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    loadCart();
}

function loadCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div>
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button onclick="removeFromCart(${index})">Delete</button>
            </div>
        `;
    });
    document.getElementById('cartTotal').textContent = total.toFixed(2);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    filterProducts();
    updateCartCount();

    // Add to cart buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('addToCart')) {
            addToCart(parseInt(e.target.getAttribute('data-id')));
        }
    });

    // Category dropdown change
    document.getElementById('categorySelect').addEventListener('change', filterProducts);

    // Cart modal
    const cartLink = document.getElementById('cartLink');
    const cartModal = document.getElementById('cartModal');
    const closeBtn = document.querySelector('.close');
    const checkoutBtn = document.getElementById('checkoutBtn');

    cartLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadCart();
        cartModal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    checkoutBtn.addEventListener('click', () => {
        alert('Checkout functionality would go here!');
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
});