// ================= PRODUCT DATA =================

const products = [

    {
        id: 1,
        name: "Rubber Hex Dumbbell",
        category: "Dumbbells",
        price: 1299,
        rating: 4.9,
        visual: "🏋️",
        badge: "BESTSELLER"
    },

    {
        id: 2,
        name: "Competition Kettlebell 16KG",
        category: "Kettlebells",
        price: 2499,
        rating: 4.8,
        visual: "🔔",
        badge: "POPULAR"
    },

    {
        id: 3,
        name: "Olympic Weight Plate 20KG",
        category: "Weight Plates",
        price: 3999,
        rating: 4.9,
        visual: "⚫",
        badge: "SALE"
    },

    {
        id: 4,
        name: "EZ Curl Bar",
        category: "Bars",
        price: 2999,
        rating: 4.7,
        visual: "💪",
        badge: "NEW"
    },

    {
        id: 5,
        name: "Adjustable Dumbbell Set",
        category: "Dumbbells",
        price: 5999,
        rating: 4.9,
        visual: "🏋️",
        badge: "BESTSELLER"
    },

    {
        id: 6,
        name: "Cast Iron Kettlebell 24KG",
        category: "Kettlebells",
        price: 3499,
        rating: 4.8,
        visual: "🔔",
        badge: ""
    },

    {
        id: 7,
        name: "Olympic Plate 10KG",
        category: "Weight Plates",
        price: 2199,
        rating: 4.6,
        visual: "⚫",
        badge: ""
    },

    {
        id: 8,
        name: "Olympic Barbell 7FT",
        category: "Bars",
        price: 6499,
        rating: 4.9,
        visual: "💪",
        badge: "PREMIUM"
    },

    {
        id: 9,
        name: "Chrome Dumbbell Pair",
        category: "Dumbbells",
        price: 1899,
        rating: 4.7,
        visual: "🏋️",
        badge: ""
    },

    {
        id: 10,
        name: "Rubber Bumper Plate 25KG",
        category: "Weight Plates",
        price: 4999,
        rating: 4.9,
        visual: "⚫",
        badge: "NEW"
    },

    {
        id: 11,
        name: "Competition Kettlebell 20KG",
        category: "Kettlebells",
        price: 2999,
        rating: 4.8,
        visual: "🔔",
        badge: ""
    },

    {
        id: 12,
        name: "Premium EZ Curl Bar",
        category: "Bars",
        price: 3999,
        rating: 4.9,
        visual: "💪",
        badge: "PREMIUM"
    }

];


// ================= CART =================

let cart = JSON.parse(localStorage.getItem("ironforgeCart")) || [];


// ================= DISPLAY PRODUCTS =================

function displayProducts(list = products) {

    const grid = document.getElementById("productGrid");

    grid.innerHTML = "";

    if (list.length === 0) {

        grid.innerHTML = `
            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:70px;
                color:#777;
            ">
                No products found.
            </div>
        `;

        return;
    }


    list.forEach(product => {

        grid.innerHTML += `

            <div class="product-card">

                <div class="product-image">

                    ${
                        product.badge
                        ?
                        `<div class="badge">${product.badge}</div>`
                        :
                        ""
                    }

                    <button
                        class="wishlist"
                        onclick="toggleWishlist(this)"
                    >
                        ♡
                    </button>

                    <div class="product-visual">
                        ${product.visual}
                    </div>

                </div>


                <div class="product-info">

                    <div class="product-category">
                        ${product.category}
                    </div>

                    <h3>${product.name}</h3>

                    <div class="rating">
                        ★★★★★
                        <span> ${product.rating}</span>
                    </div>

                    <div class="price-row">

                        <div class="price">
                            ₹${product.price.toLocaleString("en-IN")}
                        </div>

                        <button
                            class="add-cart"
                            onclick="addToCart(${product.id})"
                        >
                            +
                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// Initial render

displayProducts();


// ================= FILTER =================

function filterProducts(category, button) {

    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    if (button) {
        button.classList.add("active");
    }

    if (category === "All") {

        displayProducts(products);

    } else {

        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);

    }

}


// Category cards

function filterCategory(category) {

    document.getElementById("products")
        .scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {

        const button = [...document.querySelectorAll(".filter")]
            .find(btn => btn.textContent.trim() === category);

        filterProducts(category, button);

    }, 400);

}


// Show all

function showAllProducts() {

    const allButton = document.querySelector(".filter");

    filterProducts("All", allButton);

    document.getElementById("products")
        .scrollIntoView({ behavior: "smooth" });
}


// ================= SEARCH =================

function toggleSearch() {

    const box = document.getElementById("searchBox");

    box.classList.toggle("active");

    if (box.classList.contains("active")) {
        document.getElementById("searchInput").focus();
    }

}


function searchProducts() {

    const query = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    if (!query) {

        displayProducts(products);

        return;
    }


    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(query) ||

        product.category.toLowerCase().includes(query)

    );


    displayProducts(filtered);

}


// ================= ADD TO CART =================

function addToCart(id) {

    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }


    saveCart();

    showToast(`${product.name} added to cart`);

}


// ================= SAVE CART =================

function saveCart() {

    localStorage.setItem(
        "ironforgeCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    renderCart();

}


// ================= CART COUNT =================

function updateCartCount() {

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    document.getElementById("cartCount").textContent = count;

}


// ================= CART UI =================

function renderCart() {

    const container = document.getElementById("cartItems");

    if (!cart.length) {

        container.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.<br><br>
                Start building your gym!
            </div>
        `;

        document.getElementById("cartTotal").textContent = "₹0";

        return;
    }


    container.innerHTML = "";

    let total = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;


        container.innerHTML += `

            <div class="cart-item">

                <div class="cart-item-image">
                    ${item.visual}
                </div>

                <div class="cart-item-info">

                    <h4>${item.name}</h4>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                    </p>

                    <div class="quantity">

                        <button
                            onclick="changeQuantity(${item.id}, -1)"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            onclick="changeQuantity(${item.id}, 1)"
                        >
                            +
                        </button>

                        <button
                            class="remove"
                            onclick="removeFromCart(${item.id})"
                        >
                            Remove
                        </button>

                    </div>

                </div>

            </div>

        `;

    });


    document.getElementById("cartTotal").textContent =
        "₹" + total.toLocaleString("en-IN");

}


// ================= CHANGE QUANTITY =================

function changeQuantity(id, amount) {

    const item = cart.find(
        product => product.id === id
    );

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart = cart.filter(
            product => product.id !== id
        );

    }


    saveCart();

}


// ================= REMOVE =================

function removeFromCart(id) {

    cart = cart.filter(
        item => item.id !== id
    );

    saveCart();

}


// ================= OPEN CART =================

function openCart() {

    document
        .getElementById("cartSidebar")
        .classList.add("active");

    document
        .getElementById("overlay")
        .classList.add("active");

}


// ================= CLOSE CART =================

function closeCart() {

    document
        .getElementById("cartSidebar")
        .classList.remove("active");

    document
        .getElementById("overlay")
        .classList.remove("active");

}


// ================= WISHLIST =================

function toggleWishlist(button) {

    button.classList.toggle("liked");

    button.textContent =
        button.classList.contains("liked")
        ? "♥"
        : "♡";

}


// ================= TOAST =================

function showToast(message) {

    const toast = document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


// ================= CHECKOUT =================

function checkout() {

    if (cart.length === 0) {

        showToast("Your cart is empty!");

        return;
    }


    alert(
        "Checkout demo!\n\n" +
        "Connect this button to your payment gateway."
    );

}


// ================= NEWSLETTER =================

function subscribe(event) {

    event.preventDefault();

    showToast("Thanks for subscribing!");

    event.target.reset();

}


// ================= SCROLL =================

function scrollToProducts() {

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ================= MOBILE MENU =================

function toggleMenu() {

    const nav = document.querySelector(".navbar nav");

    if (nav.style.display === "flex") {

        nav.style.display = "";

    } else {

        nav.style.display = "flex";

        nav.style.position = "absolute";
        nav.style.top = "80px";
        nav.style.left = "0";
        nav.style.width = "100%";
        nav.style.background = "#111";
        nav.style.padding = "25px";
        nav.style.flexDirection = "column";
        nav.style.gap = "20px";

    }

}


// Initialize cart

updateCartCount();

renderCart();