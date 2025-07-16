document.addEventListener('DOMContentLoaded', () => {
    const slots = generateSlots();
    const slotSelect = document.getElementById('slot');
    const podSelect = document.getElementById('pod');
    const reserveBtn = document.getElementById('reserve-btn');
    const message = document.getElementById('message');

    // Populate time slots
    slots.forEach(slot => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        slotSelect.appendChild(option);
    });

    reserveBtn.addEventListener('click', () => {
        const selectedPod = podSelect.value;
        const selectedSlot = slotSelect.value;
        if (isAvailable(selectedPod, selectedSlot)) {
            reserve(selectedPod, selectedSlot);
            message.textContent = `Reserved Pod ${selectedPod} for ${selectedSlot}!`;
            message.style.color = '#4CAF50';
        } else {
            message.textContent = `Pod ${selectedPod} is already booked for ${selectedSlot}.`;
            message.style.color = '#f44336';
        }
    }));

    function generateSlots() {
        const slots = [];
        for (let hour = 8; hour < 20; hour++) {
            const start = hour.toString().padStart(2, '0');
            const end = (hour + 1).toString().padStart(2, '0');
            slots.push(`${start}:00-${end}:00`);
        }
        return slots;
    }

    function getBookings() {
        return JSON.parse(localStorage.getItem('bookings')) || {};
    }

    function saveBookings(bookings) {
        localStorage.setItem('bookings', JSON.stringify(bookings));
    }

    function isAvailable(pod, slot) {
        const bookings = getBookings();
        return !(bookings[pod] && bookings[pod].includes(slot));
    }

    function reserve(pod, slot) {
        const bookings = getBookings();
        if (!bookings[pod]) bookings[pod] = [];
        bookings[pod].push(slot);
        saveBookings(bookings);
    }
});
