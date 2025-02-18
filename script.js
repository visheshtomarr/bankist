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
    const section1Coords = section1.getBoundingClientRect();

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