const numbersContainer = document.querySelector(".numbers");
const belowDisplay = document.querySelector(".below-display");
const aboveDisplay = document.querySelector(".above-display");
numbersContainer.addEventListener("click", (event) => updateCalculatorDisplay(event, belowDisplay));
function updateCalculatorDisplayWithDigit(event, belowDisplay) {
    //user can click on the gap between the buttons and that can cause the click event to get
    //activated on container. SO, this following validation explicitly let only numbers to pass 
    //through
    if (!event.target.matches(".number")) {
        return;
    }

    belowDisplay.textContent = belowDisplay.textContent + event.target.textContent;
}
function updateCalculatorDisplayWithOperator(event, aboveDisplay, belowDisplay) {
    if (!event.target.matches(".operator")) {
        return;
    }
    aboveDisplay.textContent = `${belowDisplay.textContent} ${event.target.textContent}`

}
function clearDisplay(display) {
    display.textContent = "";
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


