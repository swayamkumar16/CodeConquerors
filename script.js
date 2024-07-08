// JavaScript for calculator functionality

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');
const popup = document.getElementById('popup');
const yesButton = document.getElementById('yes-button');
const noButton = document.getElementById('no-button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('clear')) {
            display.textContent = '0';
        } else if (button.classList.contains('equal')) {
            try {
                if (display.textContent === '69') {
                    // Redirect to secret page
                    window.location.href = 'secret.html';
                } else {
                    display.textContent = eval(display.textContent);
                }
                // Show popup after calculation
                setTimeout(() => {
                    popup.style.display = 'flex';
                }, 1000);
            } catch (error) {
                display.textContent = 'Error';
            }
        } else if (display.textContent === '0' || display.textContent === 'Error') {
            display.textContent = button.textContent;
        } else {
            display.textContent += button.textContent;
        }
    });
});

// Move the 'No' button away when hovered over
noButton.addEventListener('mouseenter', () => {
    noButton.style.top = `${Math.random() * 300}px`; // Move to a random position within a range
    noButton.style.left = `${Math.random() * 300}px`;
});

// Hide popup on clicking 'Yes' button
yesButton.addEventListener('click', () => {
    popup.style.display = 'none';
});
