const numbersContainer = document.querySelector(".numbers");
const operatorsContainer = document.querySelector(".operators");
const belowDisplay = document.querySelector(".below-display");
const aboveDisplay = document.querySelector(".above-display");
numbersContainer.addEventListener("click", (event) => {
    //user can click on the gap between the buttons and that can cause the click event to get
    //activated on container. SO, this following validation explicitly let only numbers to pass 
    //through

    if (!event.target.matches(".number")) {
        return;
    }
    updateCalculatorDisplayWithDigit(event, belowDisplay);
});
function updateCalculatorDisplayWithDigit(event, belowDisplay) {
    belowDisplay.textContent = belowDisplay.textContent + event.target.textContent;
}
operatorsContainer.addEventListener("click", (event) => {
    if (!event.target.matches(".operator")) {
        return;
    }
    updateCalculatorDisplayWithOperator(event, aboveDisplay, belowDisplay);
})
function updateCalculatorDisplayWithOperator(event, aboveDisplay, belowDisplay) {

    //This transfer of text content form below display of calculator to above will help in checking things like 
    //if there is only one operator or one point is used with a number
    //The use of space is because it will help in extracting multi digits using split method like 1000 + 
    aboveDisplay.textContent = `${belowDisplay.textContent} ${event.target.textContent}`;
    clearDisplay(belowDisplay);

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


