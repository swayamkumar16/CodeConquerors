// JavaScript for calculator functionality

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('clear')) {
            display.textContent = '0';
        } else if (button.classList.contains('equal')) {
            try {
                display.textContent = eval(display.textContent);
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
