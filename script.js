const cart = [];
const cartItemsElement = document.getElementById("cart-items");
const totalPriceElement = document.getElementById("total-price");
const placeOrderButton = document.getElementById("place-order");
const clearCartButton = document.getElementById("clear-cart");
const orderConfirmationElement = document.getElementById("order-confirmation");
const orderDetailsElement = document.getElementById("order-details");
const closeConfirmationButton = document.getElementById("close-confirmation");

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function () {
        const foodItem = this.parentElement;
        const itemName = foodItem.getAttribute("data-name");
        const itemPrice = parseFloat(foodItem.getAttribute("data-price"));
        const itemQuantity = parseInt(foodItem.querySelector('.quantity-input').value);

        addItemToCart(itemName, itemPrice, itemQuantity);
    });
});

function addItemToCart(name, price, quantity) {
    const existingItemIndex = cart.findIndex(item => item.name === name);
    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        cart.push({ name, price, quantity });
    }
    updateCartUI();
}

function updateCartUI() {
    cartItemsElement.innerHTML = '';

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}
            <button class="remove-item">Remove</button>
        `;

        li.querySelector('.remove-item').addEventListener('click', function () {
            removeItemFromCart(index);
        });

        cartItemsElement.appendChild(li);
    });

    totalPriceElement.textContent = `Total: $${total.toFixed(2)}`;
    placeOrderButton.disabled = cart.length === 0;
    clearCartButton.disabled = cart.length === 0;
}

function removeItemFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

clearCartButton.addEventListener('click', function () {
    cart.length = 0;
    updateCartUI();
});

placeOrderButton.addEventListener('click', function () {
    let orderDetails = "You have ordered:\n";
    cart.forEach(item => {
        orderDetails += `${item.quantity}x ${item.name} - $${(item.price * item.quantity).toFixed(2)}\n`;
    });

    orderDetails += `\nTotal: $${calculateTotal().toFixed(2)}`;

    orderDetailsElement.textContent = orderDetails;
    orderConfirmationElement.classList.remove('hidden');
    cart.length = 0;
    updateCartUI();
});

closeConfirmationButton.addEventListener('click', function () {
    orderConfirmationElement.classList.add('hidden');
});

function calculateTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
placeOrderButton.addEventListener('click', function () {
    alert("Your order has been placed!");
    cart.length = 0;
    updateCartUI();
});