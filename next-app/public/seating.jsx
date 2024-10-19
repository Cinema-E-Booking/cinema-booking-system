const seats = document.querySelectorAll('.seat.available');
const confirmButton = document.getElementById('confirm-seats');

seats.forEach(seat => {
    seat.addEventListener('click', () => {
        seat.classList.toggle('selected');
    });
});

confirmButton.addEventListener('click', () => {
    const selectedSeats = document.querySelectorAll('.seat.selected');
    if (selectedSeats.length === 0) {
        alert("Please select at least one seat.");
    } else {
        const seatNumbers = [...selectedSeats].map(seat => {
            return Array.from(seats).indexOf(seat) + 1;  // For example, seat index
        });
        alert(`You have selected seats: ${seatNumbers.join(', ')}`);
    }
});
