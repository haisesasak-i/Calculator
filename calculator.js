const numbersContainer = document.querySelector(".numbers");
const operatorsContainer = document.querySelector(".operators");
const calculatorBelowDisplay = document.querySelector(".below-display");
const calculatorAboveDisplay = document.querySelector(".above-display");
numbersContainer.addEventListener("click", (event) => {
    //user can click on the gap between the buttons and that can cause the click event to get
    //activated on container. SO, this following validation explicitly let only numbers to pass 
    //through

    if (!event.target.matches(".number")) {
        return;
    }
    updateCalculatorDisplayWithDigit(event, calculatorBelowDisplay);
});
function updateCalculatorDisplayWithDigit(event, calculatorBelowDisplay) {
    calculatorBelowDisplay.textContent = calculatorBelowDisplay.textContent + event.target.textContent;
}
operatorsContainer.addEventListener("click", (event) => {
    if (!event.target.matches(".operator")) {
        return;
    }
    if (event.target.matches(".equal")) {
        performCalculation(calculatorBelowDisplay, calculatorAboveDisplay);
        return;
    }
    updateCalculatorDisplayWithOperator(event, calculatorAboveDisplay, calculatorBelowDisplay);
});
function updateCalculatorDisplayWithOperator(event, calculatorAboveDisplay, calculatorBelowDisplay) {
    //This transfer of text content form below display of calculator to above will help in checking things like 
    //if there is only one operator or one point is used with a number
    //The use of space is because it will help in extracting multi digits using split method like 1000 + 
    calculatorAboveDisplay.textContent = `${calculatorBelowDisplay.textContent} ${event.target.textContent}`;
    clearDisplay(calculatorBelowDisplay);

}
function performCalculation(calculatorBelowDisplay, calculatorAboveDisplay) {
    let numberAndOperator = calculatorAboveDisplay.textContent.split(" ");
    let firstNumber = +numberAndOperator[0];
    let operator = numberAndOperator[1];
    let secondNumber = +calculatorBelowDisplay.textContent;
    calculatorAboveDisplay.textContent = "";
    calculatorBelowDisplay.textContent = operate(firstNumber, secondNumber, operator);
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
        case "×":
            return multiply(firstNumber, secondNumber);
        case "÷":
            return secondNumber === 0 ? "MATH ERROR" : divide(firstNumber, secondNumber);
        default:
            return "MATH ERROR";
    }
}


