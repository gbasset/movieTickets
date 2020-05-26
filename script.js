const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')
const btnCart = document.querySelector('.button7')
const notification = document.getElementById('notification-container');
const pop = document.querySelector('.popup-container')
const tots = document.querySelector('.tots')
populateUI()

let ticketPrice = +movieSelect.value
console.log(ticketPrice);
console.log("total", total);

// Get data from local storage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }
}
// Seats Count seats and total price
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    console.log(selectedSeats);
    // copy selected seats 
    // map throught into an array 
    //return new array 
    const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat))
    console.log("seatsIndex", seatsIndex);
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))
    const totalOfSelectedSeats = selectedSeats.length
    count.innerHTML = totalOfSelectedSeats
    total.innerHTML = ticketPrice * totalOfSelectedSeats
    tots.innerHTML = ticketPrice * totalOfSelectedSeats
}
// Save selected movie index and price 
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Seat event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        console.log(e.target);
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount()
})

btnCart.addEventListener('click', () => {
    pop.style.display = 'flex'

})
const playAgainBtn = document.querySelector('#play-button');
playAgainBtn.addEventListener('click', () => {
    pop.style.display = 'none'
    document.location.reload()
})
const cancel = document.querySelector('#cancel');
cancel.addEventListener('click', () => {
    pop.style.display = 'none'
    document.location.reload()
})
// InitialCOunt and total 
updateSelectedCount()