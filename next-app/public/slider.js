let currentSlide = 0;

const slider = document.querySelector('.movie-slide');
const movies = document.querySelectorAll('.movie'); // All movie divs
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

// Calculate the total width of the slider and individual movie
const slideWidth = movies[0].clientWidth + 40; // Assuming 20px margin on both sides
const totalSlides = movies.length; // Total number of slides

// Function to move the slider
function updateSliderPosition() {
    slider.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}

// Move to the next slide
nextBtn.addEventListener('click', () => {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSliderPosition();
    }
});

// Move to the previous slide
prevBtn.addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        updateSliderPosition();
    }
});
