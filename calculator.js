const numbersContainer = document.querySelector(".numbers");
const allowedKeyboardKeys = {
    "numbers": "0123456789.",
    "operators": "+-/*x=",//x and * as calculator displays x as multiply
    "clear": "c",
    "delete": "Backspace"


}
const operatorsContainer = document.querySelector(".operators");
const calculatorBelowDisplay = document.querySelector(".below-display");
const calculatorAboveDisplay = document.querySelector(".above-display");
const clearAndDelete = document.querySelector(".clear-delete");
window.addEventListener("keydown", (event) => {
    let keyboardInput = event.key;
    if (allowedKeyboardKeys.numbers.includes(keyboardInput)) {
        numberInput(calculatorAboveDisplay, calculatorBelowDisplay, event.key);
    }
    else if (allowedKeyboardKeys.clear == keyboardInput) {
        clearButton(calculatorAboveDisplay, calculatorBelowDisplay);
    }
    else if (allowedKeyboardKeys.delete == keyboardInput) {
        deleteButton(calculatorAboveDisplay, calculatorBelowDisplay);
    }
    else if (allowedKeyboardKeys.operators.includes(keyboardInput) || keyboardInput == "Enter") {
        const keyToSymbol = { "*": "×", "x": "×", "/": "÷", "Enter": "=" };
        if (keyToSymbol[keyboardInput]) keyboardInput = keyToSymbol[keyboardInput];
        operatorInput(calculatorAboveDisplay, calculatorBelowDisplay, keyboardInput);
    }
    return;

});
clearAndDelete.addEventListener("click", (event) => {
    if (event.target.matches(".clear")) {

        clearButton(calculatorAboveDisplay, calculatorBelowDisplay);
    }
    else if (event.target.matches(".delete")) {
        deleteButton(calculatorAboveDisplay, calculatorBelowDisplay);
    }
    return;
});
function clearButton(calculatorAboveDisplay, calculatorBelowDisplay) {
    clearDisplay(calculatorAboveDisplay);
    clearDisplay(calculatorBelowDisplay);
}
function deleteButton(calculatorAboveDisplay, calculatorBelowDisplay) {
    if (resultMathErrorStringChecker(calculatorAboveDisplay, calculatorBelowDisplay)) {
        return;
    }
    else if (calculatorBelowDisplay.textContent) {
        calculatorBelowDisplay.textContent = calculatorBelowDisplay.textContent.slice(0, -1);
    }
    else if (calculatorAboveDisplay.textContent) {
        calculatorBelowDisplay.textContent = calculatorAboveDisplay.textContent.slice(0, -1).trimEnd();
        clearDisplay(calculatorAboveDisplay);
    }
}
numbersContainer.addEventListener("click", (event) => {
    //user can click on the gap between the buttons and that can cause the click event to get
    //activated on container. SO, this following validation explicitly let only numbers to pass 
    //through
    if (!event.target.matches(".number")) {
        return;
    }
    numberInput(calculatorAboveDisplay, calculatorBelowDisplay, event.target.textContent);

});
function numberInput(calculatorAboveDisplay, calculatorBelowDisplay, input) {
    if (resultMathErrorStringChecker(calculatorAboveDisplay, calculatorBelowDisplay)) {
        clearButton(calculatorAboveDisplay, calculatorBelowDisplay);
    }
    updateCalculatorDisplayWithDigit(input, calculatorBelowDisplay);
}
function resultMathErrorStringChecker(calculatorAboveDisplay, calculatorBelowDisplay) {
    return calculatorAboveDisplay.textContent === "Result" ||
        calculatorBelowDisplay.textContent === "MATH ERROR"
}
function updateCalculatorDisplayWithDigit(input, calculatorBelowDisplay) {
    let textContent = calculatorBelowDisplay.textContent;
    if (input == ".") {
        if (!calculatorBelowDisplay.textContent)
            textContent = textContent + "0";
        else if (calculatorBelowDisplay.textContent.includes(".")) {
            return;
        }
    }
    calculatorBelowDisplay.textContent = textContent + input;
}
function operatorInput(calculatorAboveDisplay, calculatorBelowDisplay, operator) {
    if (resultMathErrorStringChecker(calculatorAboveDisplay, calculatorBelowDisplay)) {
        return;
    }
    if (!operatorValidation(calculatorBelowDisplay) &&
        !operatorValidation(calculatorAboveDisplay)) {
        performCalculation(calculatorBelowDisplay, calculatorAboveDisplay);
    }
    if (!operatorValidation(calculatorBelowDisplay) &&
        operator != "=" && calculatorBelowDisplay.textContent !== "MATH ERROR") {
        updateCalculatorDisplayWithOperator(operator, calculatorAboveDisplay, calculatorBelowDisplay);
    }
    else if (!operatorValidation(calculatorAboveDisplay) && operatorValidation(calculatorBelowDisplay) && operator != "=") {
        calculatorAboveDisplay.textContent = calculatorAboveDisplay.textContent.slice(0, -1) + operator;
    }


}
operatorsContainer.addEventListener("click", (event) => {
    if (!event.target.matches(".operator")) {
        return;
    }
    operatorInput(calculatorAboveDisplay, calculatorBelowDisplay, event.target.textContent);

});
function updateCalculatorDisplayWithOperator(operator, calculatorAboveDisplay, calculatorBelowDisplay) {
    //This transfer of text content form below display of calculator to above will help in checking things like 
    //if there is only one operator or one point is used with a number
    //The use of space is because it will help in extracting multi digits using split method like 1000 + 
    calculatorAboveDisplay.textContent = `${calculatorBelowDisplay.textContent} ${operator}`;
    clearDisplay(calculatorBelowDisplay);

}
function performCalculation(calculatorBelowDisplay, calculatorAboveDisplay) {
    let numberAndOperator = calculatorAboveDisplay.textContent.split(" ");
    let firstNumber = +numberAndOperator[0];
    let operator = numberAndOperator[1];
    let secondNumber = +calculatorBelowDisplay.textContent;
    calculatorAboveDisplay.textContent = "Result";
    calculatorBelowDisplay.textContent = roundResult(operate(firstNumber, secondNumber, operator));
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
function operatorValidation(display) {
    return display.textContent === "";
    //the operator event listener always transfers the content of calculator below display to above 
    //and then add symbol of operator , so if user taps operator without entering number then below display
    //will always be empty
}
function roundResult(num) {
    if (typeof num !== "number") return num; // preserves "MATH ERROR" string
    return parseFloat(num.toPrecision(10)); // 10 significant digits, trims trailing zeros
}
