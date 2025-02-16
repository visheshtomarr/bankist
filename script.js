'use strict';

// Modal
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = (e) => {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const closeModal = () => {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}

// Eventlistener for opening modal window.
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