const display = document.querySelector("#currentNumber");
const workingDisplay = document.querySelector('#workingDisplay');
const buttons = document.querySelectorAll(".button");
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
let isNewOp = false;
let currentTotal = ''
let firstNumber = '';
let operator = '';
let secondNumber = '';

addEventListener('keydown', (e) => {
    let digit = e.key;
    if (digit in numbers) {
        if (operator) {
            workingDisplay.innerHTML = firstNumber + " " + operator;
            secondNumber += digit;
            display.innerHTML = secondNumber;
        } else if (firstNumber && isNewOp) {
            firstNumber = '';
            firstNumber += digit;
            isNewOp = false;
            display.innerHTML = firstNumber;
        } else {
            firstNumber += digit;
            display.innerHTML = firstNumber;
        }
    } else if (digit == ".") {
        if (operator && secondNumber) {
            if (!secondNumber.includes(".")) {
                secondNumber += digit;
                display.innerHTML = secondNumber;
            }
        } else if (operator && !secondNumber) {
            secondNumber = "0" + digit;
            display.innerHTML = secondNumber;
        } else if (!operator && firstNumber) {
            if (!firstNumber.includes(".")) {
                firstNumber += digit
                display.innerHTML = firstNumber;
            }
        } else if (!operator && !firstNumber) {
            firstNumber = "0" + digit;
            display.innerHTML = firstNumber;
        }
    } else if (digit == "=" || digit == "Enter") {
        if (operator && secondNumber && firstNumber) {
            if (secondNumber == "0" && operator == "/") {
                display.innerHTML = "silly goose, you can't divide by zero";
                currentTotal = ''
                firstNumber = '';
            } else {
                currentTotal = operate(firstNumber, secondNumber, operator);
                if (needsTrunc(currentTotal)) {
                    currentTotal = currentTotal.toFixed(7);
                }
                display.innerHTML = currentTotal;
            }
            isNewOp = true;
            operator = '';
            secondNumber = '';
            workingDisplay.innerHTML = '';

        }
    } else if (digit == "Backspace") {
        if (operator && secondNumber) {
            secondNumber = secondNumber.slice(0, secondNumber.length - 1);
            display.innerHTML = secondNumber;
        } else if (operator) {
            operator = '';
            display.innerHTML = '';
        } else if (firstNumber) {
            firstNumber = firstNumber.toString();
            firstNumber = firstNumber.slice(0, firstNumber.length - 1);
            display.innerHTML = firstNumber;
        }
    } else if (digit == "-" || digit == "/" || digit == "*" || digit == "+") {
        if (secondNumber && operator) {
            firstNumber = operate(firstNumber, secondNumber, operator);
            if (needsTrunc(firstNumber)) {
                firstNumber = firstNumber.toFixed(7);
            }
            workingDisplay.innerHTML = firstNumber + " " + digit;
            operator = digit;
            secondNumber = '';
            display.innerHTML = firstNumber;
        }


        else {
            workingDisplay.innerHTML = firstNumber + " " + digit;
            operator = digit;
            display.innerHTML = digit;

        }

    }
})

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let digit = e.target.innerHTML;
        if (digit in numbers) {
            if (operator) {
                workingDisplay.innerHTML = firstNumber + " " + operator;
                secondNumber += digit;
                display.innerHTML = secondNumber;
            } else if (firstNumber && isNewOp) {
                firstNumber = '';
                firstNumber += digit;
                isNewOp = false;
                display.innerHTML = firstNumber;
            } else {
                firstNumber += digit;
                display.innerHTML = firstNumber;
            }
        } else if (digit == ".") {
            if (operator && secondNumber) {
                if (!secondNumber.includes(".")) {
                    secondNumber += digit;
                    display.innerHTML = secondNumber;
                }
            } else if (operator && !secondNumber) {
                secondNumber = "0" + digit;
                display.innerHTML = secondNumber;
            } else if (!operator && firstNumber) {
                if (!firstNumber.includes(".")) {
                    firstNumber += digit
                    display.innerHTML = firstNumber;
                }
            } else if (!operator && !firstNumber) {
                firstNumber = "0" + digit;
                display.innerHTML = firstNumber;
            }
        } else if (digit == "=") {
            if (operator && secondNumber && firstNumber) {
                if (secondNumber == "0" && operator == "/") {
                    display.innerHTML = "sily goose,you can't divide by 0"
                    currentTotal = ''
                    firstNumber = '';
                } else {
                    currentTotal = operate(firstNumber, secondNumber, operator);
                    if (needsTrunc(currentTotal)) {
                        currentTotal = currentTotal.toFixed(7);
                    }
                    display.innerHTML = currentTotal;
                }
                workingDisplay.innerHTML = '';
                isNewOp = true;
                operator = '';
                secondNumber = '';

            }
        } else if (digit == "Clear") {
            currentTotal = ''
            firstNumber = '';
            operator = '';
            secondNumber = '';
            workingDisplay.innerHTML = '';
            display.innerHTML = "";
        } else if (digit == "Delete") {
            if (operator && secondNumber) {
                secondNumber = secondNumber.slice(0, secondNumber.length - 1);
                display.innerHTML = secondNumber;
            } else if (operator) {
                operator = '';
                display.innerHTML = '';
            } else if (firstNumber) {
                firstNumber = firstNumber.toString();
                firstNumber = firstNumber.slice(0, firstNumber.length - 1);
                display.innerHTML = firstNumber;
            }
        } else {
            if (secondNumber && operator) {
                firstNumber = operate(firstNumber, secondNumber, operator);
                if (needsTrunc(firstNumber)) {
                    firstNumber = firstNumber.toFixed(7);
                }
                workingDisplay.innerHTML = firstNumber + " " + digit;
                operator = digit;
                secondNumber = '';
                display.innerHTML = firstNumber;
            } else {
                workingDisplay.innerHTML = firstNumber + " " + digit;
                operator = digit;
                display.innerHTML = digit;

            }

        }

    })
})

function needsTrunc(number) {
    let numberString = number.toString();
    if (numberString.includes(".")) {
        numberString = numberString.slice(numberString.indexOf("."));
        if (numberString.length >= 6) {
            return true;
        }
    }
    return false;

}


function operate(firstNumber, secondNumber, operator) {
    let total;
    let firstValue = Number(firstNumber);
    let secondValue = Number(secondNumber);
    switch (operator) {
        case "+":
            total = firstValue + secondValue;
            break;
        case "-":
            total = firstValue - secondValue;
            break;
        case "*":
            total = firstValue * secondValue;
            break;
        case "/": ;
            total = firstValue / secondValue;
            break;
        default:
            return "ERROR";

    }
    return total;
}