const navbar = document.querySelector('.navbar');
const buttons = document.querySelector('.options');
const texts = document.querySelector('.text');

let scrollTimeout;
window.addEventListener('scroll', function () {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        navbar.classList.toggle('shadow', window.scrollY > 0);
    }, 50);
}, { passive: true });

buttons.addEventListener('click', handleButtonClick);

function handleButtonClick(event) {
    const button = event.target.closest('button');
    if (button) {
        const activeButtonClass = 'active';
        const activeTextClass = 'active';

        buttons.querySelectorAll('button.' + activeButtonClass).forEach(btn => btn.classList.remove(activeButtonClass));
        texts.querySelectorAll('p.' + activeTextClass).forEach(text => text.classList.remove(activeTextClass));

        button.classList.add(activeButtonClass);

        const relatedTextId = button.getAttribute('id').replace('-btn', '-text');
        const relatedText = document.getElementById(relatedTextId);

        relatedText.classList.add(activeTextClass);
    }
}

function loadCSS(url) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
}

// Load the CSS file asynchronously
loadCSS('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css');

// Define global variables to hold swiper instances
let swiperFirst;
let swiperSecond;

// Function to initialize Swiper instances
function initSwipers() {

    setTimeout(function () {
        swiperFirst = new Swiper(".first-swiper", {
            slidesPerView: 4,
            spaceBetween: 30,
            centeredSlides: false,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        swiperSecond = new Swiper(".second-swiper", {
            slidesPerView: 5,
            spaceBetween: 30,
            loop: true,
            centeredSlides: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        // Attach slideChange event handlers for swiperFirst and swiperSecond
        swiperFirst.on('slideChange', handleSlideChange);
        swiperSecond.on('slideChange', handleSlideChange);

        // Call updateSwipers after Swiper instances are initialized
        updateSwipers();
    }, 500);
}

// Function to handle slide change event
function handleSlideChange() {
    const activeSlideClass = 'active';
    this.slides.forEach(slide => slide.classList.remove(activeSlideClass));
    this.slides[this.activeIndex].classList.add(activeSlideClass);
}

// Function to destroy Swiper instances
function destroySwipers() {
    if (swiperFirst && swiperFirst.destroy) {
        swiperFirst.destroy();
    }
    if (swiperSecond && swiperSecond.destroy) {
        swiperSecond.destroy();
    }
}

// Function to reinitialize Swiper instances after language change
function reinitializeSwipers() {
    destroySwipers();
    initSwipers();
}

// Call initSwipers() on page load
document.addEventListener("DOMContentLoaded", initSwipers);

const mediaQuery = window.matchMedia('(max-width: 1024px)');

// Function to update Swipers based on screen size
function updateSwipers() {
    if (mediaQuery.matches) {
        updateSwiperParams(swiperFirst, 1.5);
        updateSwiperParams(swiperSecond, 1.5);
    } else {
        updateSwiperParams(swiperFirst, 4);
        updateSwiperParams(swiperSecond, 5);
    }
}

// Function to update Swiper parameters
function updateSwiperParams(swiper, slidesPerView) {
    if (swiper && swiper.params) { // Check if swiper object and params property are defined
        swiper.params.slidesPerView = slidesPerView;
        swiper.update();
    }
}

// Call updateSwipers() when the page loads and every time the screen size changes
updateSwipers();
mediaQuery.addListener(updateSwipers);

function loading() {
    var loadingContainer = document.querySelector('.loading-container');
    var duration = 1500; // Set the duration in milliseconds (e.g., 3500 = 3.5 seconds)
    var fadeOutDuration = 500; // Set the fade out duration in milliseconds (e.g., 500 = 0.5 seconds)
    var body = document.querySelector('body');

    // Show loading container
    loadingContainer.style.display = 'flex';
    loadingContainer.style.opacity = '1';
    body.style.overflow = 'hidden';

    setTimeout(function () {
        // Fade out loading container
        loadingContainer.style.opacity = '0';

        // Make body overflow visible
        body.style.overflowY = 'visible';

        setTimeout(function () {
            // Hide loading container
            loadingContainer.style.display = 'none';
        }, fadeOutDuration);
    }, duration);
}

// Media query for screens up to 1024px
