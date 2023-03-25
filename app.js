const display = document.querySelector("#display");
const buttons = document.querySelectorAll(".button");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
total = 0;

addEventListener('keydown', (e) => {
    if (e.key in numbers) {
        display.innerHTML = e.key;
    }
})

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.innerHTML in numbers) {
            display.innerHTML += e.target.innerHTML;
        } else {
            display.innerHTML = e.target.innerHTML;
        }


    })
})