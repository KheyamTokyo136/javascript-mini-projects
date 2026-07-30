let cart = []

const cartToggle = document.getElementById("cart-toggle")
const closeCartBtn = document.getElementById("close-cart-btn")
const cartOverlay = document.getElementById("cart-overlay")
const cartSidebar = document.getElementById("cart-sidebar")
const cartItemsContainer = document.getElementById("cart-items")
const emptyCartMsg = document.getElementById("empty-cart-msg")
const cartCount = document.getElementById("cart-count")
const cartTotal = document.getElementById("cart-total")
const addToCartBtns = document.querySelectorAll(".add-to-cart-btn")

// open / close cart sidebar

cartToggle.addEventListener("click", function () {
    cartSidebar.classList.add("active")
    cartOverlay.classList.add("active")
})

closeCartBtn.addEventListener("click", function () {
    cartSidebar.classList.remove("active")
    cartOverlay.classList.remove("active")
})

cartOverlay.addEventListener("click", function () {
    cartSidebar.classList.remove("active")
    cartOverlay.classList.remove("active")
})

// add to cart

addToCartBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
        const card = btn.closest(".product-card")
        const id = card.dataset.id
        const name = card.dataset.name
        const price = Number(card.dataset.price)
        const image = card.querySelector("img").src

        const existingItem = cart.find(item => item.id === id)

        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cart.push({ id, name, price, image, quantity: 1 })
        }

        renderCart()
        cartSidebar.classList.add("active")
        cartOverlay.classList.add("active")
    })
})

// render cart items, total, and count

function renderCart() {
    cartItemsContainer.innerHTML = ""

    if (cart.length === 0) {
        cartItemsContainer.appendChild(emptyCartMsg)
    } else {
        cart.forEach(function (item) {
            const cartItemDiv = document.createElement("div")
            cartItemDiv.classList.add("cart-item")

            cartItemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                    <div class="cart-item-qty">
                        <button class="decrease-btn">-</button>
                        <span>${item.quantity}</span>
                        <button class="increase-btn">+</button>
                        <button class="cart-item-remove"><i class="fa-solid fa-trash"></i></button>
                    </div>
                </div>
            `

            const decreaseBtn = cartItemDiv.querySelector(".decrease-btn")
            const increaseBtn = cartItemDiv.querySelector(".increase-btn")
            const removeBtn = cartItemDiv.querySelector(".cart-item-remove")

            decreaseBtn.addEventListener("click", function () {
                item.quantity -= 1
                if (item.quantity <= 0) {
                    cart = cart.filter(c => c.id !== item.id)
                }
                renderCart()
            })

            increaseBtn.addEventListener("click", function () {
                item.quantity += 1
                renderCart()
            })

            removeBtn.addEventListener("click", function () {
                cart = cart.filter(c => c.id !== item.id)
                renderCart()
            })

            cartItemsContainer.appendChild(cartItemDiv)
        })
    }

    updateCartSummary()
}

// update total price and item count badge

function updateCartSummary() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0)

    cartCount.textContent = totalItems
    cartTotal.textContent = "$" + totalPrice.toFixed(2)
}

// initial render
renderCart()