const roomTypeElement = document.getElementById("room-type");
const checkInElement = document.getElementById("check-in");
const checkOutElement = document.getElementById("check-out");
const breakfastElement = document.getElementById("breakfast");
const airportTransferElement = document.getElementById("airport-transfer");
const totalPriceElement = document.getElementById("total-price");
const promoCodeElement = document.getElementById("promo-code");
const bookNowButton = document.getElementById("book-now");
const checkAvailabilityButton = document.getElementById("check-availability");
const confirmationElement = document.getElementById("confirmation");
const confirmationDetailsElement = document.getElementById("confirmation-details");
const closeConfirmationButton = document.getElementById("close-confirmation");
const modalElement = document.getElementById("room-details-modal");
const modalRoomNameElement = document.getElementById("modal-room-name");
const modalRoomDescriptionElement = document.getElementById("modal-room-description");
const modalRoomImageElement = document.getElementById("modal-room-image");
const closeModalElement = document.querySelector(".close-modal");

let roomPrice = 0;
let totalPrice = 0;
let appliedDiscount = 0;

document.getElementById("view-details").addEventListener("click", () => {
    const selectedRoom = roomTypeElement.options[roomTypeElement.selectedIndex];
    modalRoomNameElement.textContent = selectedRoom.text;
    modalRoomDescriptionElement.textContent = selectedRoom.getAttribute("data-description");
    modalRoomImageElement.src = selectedRoom.getAttribute("data-image");
    modalElement.style.display = "block";
});

closeModalElement.addEventListener("click", () => {
    modalElement.style.display = "none";
});

document.getElementById("apply-promo").addEventListener("click", () => {
    const promoCode = promoCodeElement.value;
    if (promoCode === "SAVE20") {
        appliedDiscount = 0.2;
        alert("Promo code applied! You get 20% off.");
    } else {
        appliedDiscount = 0;
        alert("Invalid promo code.");
    }
    updatePrice();
});

roomTypeElement.addEventListener("change", updatePrice);
checkInElement.addEventListener("change", updatePrice);
checkOutElement.addEventListener("change", updatePrice);
breakfastElement.addEventListener("change", updatePrice);
airportTransferElement.addEventListener("change", updatePrice);

function updatePrice() {
    const selectedRoom = roomTypeElement.options[roomTypeElement.selectedIndex];
    const roomRate = parseFloat(selectedRoom.getAttribute("data-price"));

    const checkInDate = new Date(checkInElement.value);
    const checkOutDate = new Date(checkOutElement.value);

    const oneDay = 24 * 60 * 60 * 1000;  // Hours * Minutes * Seconds * Milliseconds
    const daysStayed = Math.round((checkOutDate - checkInDate) / oneDay);

    if (daysStayed <= 0 || isNaN(daysStayed)) {
        totalPriceElement.textContent = "Total Price: $0.00";
        bookNowButton.disabled = true;
        return;
    }

    let roomCost = roomRate * daysStayed;
    let extraServicesCost = 0;

    if (breakfastElement.checked) {
        extraServicesCost += parseFloat(breakfastElement.value) * daysStayed;
    }
    if (airportTransferElement.checked) {
        extraServicesCost += parseFloat(airportTransferElement.value);
    }

    totalPrice = (roomCost + extraServicesCost) * (1 - appliedDiscount);
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    bookNowButton.disabled = false;
}

checkAvailabilityButton.addEventListener("click", function () {
    const checkInDate = new Date(checkInElement.value);
    const checkOutDate = new Date(checkOutElement.value);

    // Simulate availability check (in a real scenario, this would be handled by the server)
    if (checkInDate >= new Date()) {
        alert("Rooms are available for the selected dates.");
    } else {
        alert("Selected dates are not available. Please choose valid dates.");
    }
});

bookNowButton.addEventListener("click", function () {
    const checkInDate = checkInElement.value;
    const checkOutDate = checkOutElement.value;
    const roomType = roomTypeElement.options[roomTypeElement.selectedIndex].text;

    let services = "";
    if (breakfastElement.checked) services += "Breakfast, ";
    if (airportTransferElement.checked) services += "Airport Transfer";

    confirmationDetailsElement.innerHTML = `
        <strong>Room Type:</strong> ${roomType}<br>
        <strong>Check-in:</strong> ${checkInDate}<br>
        <strong>Check-out:</strong> ${checkOutDate}<br>
        <strong>Extra Services:</strong> ${services || 'None'}<br>
        <strong>Total Price:</strong> $${totalPrice.toFixed(2)}
    `;

    confirmationElement.classList.remove('hidden');
});

closeConfirmationButton.addEventListener('click', function () {
    confirmationElement.classList.add('hidden');
});
