const numbersContainer = document.querySelector(".numbers");
numbersContainer.addEventListener("click", updateCalculatorDisplay);
function updateCalculatorDisplay(event) {
    //user can click on the gap between the buttons and that can cause the click event to get
    //activated on container. SO, this following validation explicitly let only numbers to pass 
    //through
    if (!event.target.matches(".number")) {
        return;
    }
    const belowDisplay = document.querySelector(".below-display");
    belowDisplay.textContent = belowDisplay.textContent + event.target.textContent;
}

function add(firstNumber = 0, secondNumber = 0) {
    return firstNumber + secondNumber;
}
function subtract(firstNumber = 0, secondNumber = 0) {
    return firstNumber - secondNumber;
}
function multiply(firstNumber = 0, secondNumber = 0) {
    return firstNumber * secondNumber;
}
function divide(firstNumber = 0, secondNumber = 1) {
    return firstNumber / secondNumber;
}
function operate(firstNumber, secondNumber, operation) {
    switch (operation) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return secondNumber === 0 ? "MATH ERROR" : divide(firstNumber, secondNumber);
        default:
            return "MATH ERROR";
    }
}


