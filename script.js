'use strict';

/////////////////////
// Elements
const btnLearnMore = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
const images = document.querySelectorAll('img[data-src]');
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnSliderLeft = document.querySelector('.slider__btn--left');
const btnSliderRight = document.querySelector('.slider__btn--right');

/////////////////////
// Functions

const openModal = (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// To handle hover over links in the nav bar.
const handleHover = function (e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach(element => {
            if (element !== link) element.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

// To make the navigation bar sticky.
const stickyNav = entries => {
    const entry = entries[0];

    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
}

// To reveal sections on scroll.
const revealSection = (entries, observer) => {
    // console.log(entries);
    entries.forEach(entry => {
        // Guard clause.
        if (!entry.isIntersecting) return;
    
        entry.target.classList.remove('section--hidden');
        // After scrolling to the end of each section, we will unobserve it.
        observer.unobserve(entry.target);
    });
}

// To lazy load the images.
const imageLoad = (entries, observer) => {
    // console.log(entries);
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
    
        // Replace the src attribute with data-src.
        // This will emit a load event and we will then
        // remove the lazy-image class from the 'entry.target'.
        entry.target.src = entry.target.dataset.src;
    
        // Remove 'lazy-image' class from entry.target.
        entry.target.addEventListener('load', () => {
            entry.target.classList.remove('lazy-img');
        });
    
        observer.unobserve(entry.target);
    });
}

/////////////////////
// Event listeners

// For opening modal window.
btnsOpenModal.forEach(btn => {
    btn.addEventListener('click', openModal)
})

// Event listeners for closing modal window.
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

// Keypress event for closing modal window.
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden'))
        closeModal();
});

// For smooth scrolling.
btnLearnMore.addEventListener('click', (e) => {
    // const section1Coords = section1.getBoundingClientRect();

    // Method requires calculation of the current scroll position.
    // // Smooth Scrolling to section 1.
    // window.scrollTo({
    //     left: section1Coords.left + window.scrollX,
    //     top: section1Coords.top + window.scrollY,
    //     behavior: 'smooth',
    // }); 

    // Method doesn't require calculation of the current scroll position.
    section1.scrollIntoView({ behavior: 'smooth' });
})

// For smooth scrolling to a particular section
// document.querySelectorAll('.nav__link').forEach(element => {
//     element.addEventListener('click', (e) => {
//         e.preventDefault();
//         const id = element.getAttribute('href');
//         document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     });
// });
// The above method is not efficient as it creates a new event listener for each element.
// Instead, we will use event delegation.
document.querySelector('.nav__links').addEventListener('click', (e) => {
    e.preventDefault();

    // Match the current target of event in its classlist.
    if (e.target.classList.contains('nav__link')) {
        const id = e.target.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
});

// For tabbed component.
tabsContainer.addEventListener('click', (e) => {
    const clicked = e.target.closest('.operations__tab');
    // console.log(clicked);

    // Guard clause. If there are not closest parents with the class name, 
    // we return from the function.
    if (!clicked) return;

    // Removing active classes from all tabs and contents.
    tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach(content => content.classList.remove('operations__content--active'));

    // Adding active class to the clicked tab and content.
    clicked.classList.add('operations__tab--active');
    document
        .querySelector(`.operations__content--${clicked.dataset.tab}`)
        .classList
        .add('operations__content--active');
});

// For menu fading animation.
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// For sticky navigation.
header.insertAdjacentHTML('afterbegin', '<div class="nav-sentinel"></div>');
const sentinel = document.querySelector('.nav-sentinel');
const navbarHeight = nav.getBoundingClientRect().height;
const navObserver = new IntersectionObserver(stickyNav, {
    // The root is the viewport.
    root: null,
    // As soon as the navbar is 0% visible, the callback function
    // will be called.
    threshold: 0,
    rootMargin: `${navbarHeight}px`,
});
navObserver.observe(sentinel);

// For revealing sections on scroll.
const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    // As soon as 10% of the section is visible,
    // the callback function will be called.
    threshold: 0.1,
});
allSections.forEach(section => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

// For lazy loading the images.
const imageObserver = new IntersectionObserver(imageLoad, {
    root:null,
    threshold: 0,
});
images.forEach(image => imageObserver.observe(image));

// For the slider component.
let currentSlide = 0;
const maxSlide = slides.length;

// Positioning the slides.
const positionSlides = (slides) => {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * i}%)`;
    });
}
positionSlides(slides);
slider.style.overflow = 'hidden';

// Function for traversing slides.
const traverseSlides = curslide => {
    slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${100 * (i - curslide)}%)`;
    })
}

// Function for next slide.
const nextSlide = () => {
    // We will increase currentSlide counter until it reaches maxSlide.
    if (currentSlide !== maxSlide - 1) currentSlide++;
    else currentSlide = 0;
    traverseSlides(currentSlide);
}

// Function for previous slide.
const previousSlide = () => {
    // We will decrease the currentSlide counter until it reaches 0.
    if (currentSlide !== 0) currentSlide--;
    else currentSlide = maxSlide - 1;
    traverseSlides(currentSlide);
}

btnSliderRight.addEventListener('click', nextSlide);
btnSliderLeft.addEventListener('click', previousSlide);