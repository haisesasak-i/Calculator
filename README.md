# Calculator

A calculator built for The Odin Project's JavaScript curriculum. Supports chained operations, keyboard input, decimals, and backspace — with a DOM-driven state model instead of separate tracking variables.



## Features

- **Basic operations** — add, subtract, multiply, divide
- **Chained calculations** — e.g. `12 + 7 - 1 =` evaluates `12 + 7` as soon as the second operator is pressed, then continues the chain with the result
- **Operator swapping** — pressing a new operator before entering a number replaces the pending operator instead of stacking or evaluating early
- **Decimal input** — a single `.` per number, blocked from being entered twice
- **Backspace** — undo the last digit typed, including stepping back out of a locked-in operator
- **Clear (`C`)** — fully resets the calculator
- **Divide-by-zero handling** — displays `MATH ERROR` instead of crashing or showing `Infinity`
- **Rounding** — long decimal results are rounded to 10 significant digits so they don't overflow the display
- **Keyboard support** — number keys, `+ - * /`, `Enter` (as `=`), `Backspace`, and `c` (clear) all work
- **Continue from result** — after pressing `=`, you can immediately press an operator to keep building on the result (e.g. `3 + 2 = ` then `+` continues from `5`)

## How It's Built

Most implementations of this project track calculator state (first number, operator, second number) in separate JavaScript variables, then sync that state to the display.

This version does the opposite: **the DOM itself is the state.**

- `above-display` holds the "locked in" number + operator, e.g. `19 -`
- `below-display` holds the number currently being typed
- Instead of checking JS flags, functions like `operatorValidation()` and `resultMathErrorStringChecker()` read `.textContent` directly off these two elements to figure out what state the calculator is in

This means there's no risk of a JS variable and the visible display drifting out of sync — what you see on screen *is* the source of truth. The tradeoff is a bit more string parsing (`split(" ")`, `slice(-1)`) in place of reading plain variables.

The upper display doubling as a running "you entered this" line (e.g. showing `19 -` while you type the next number) is intentional — it mirrors how most physical and mobile calculators confirm what's already been locked in before you type the next operand.

## File Structure

```
├── index.html
├── style.css
└── calculator.js
```

## Functions

| Function | Purpose |
|---|---|
| `add`, `subtract`, `multiply`, `divide` | Pure math operations |
| `operate(a, b, operator)` | Dispatches to the correct math function based on the operator symbol |
| `numberInput` / `operatorInput` | Route click or keyboard input to the right display-update logic |
| `performCalculation` | Parses the above-display's stored number + operator, runs `operate`, and writes the rounded result |
| `roundResult` | Rounds results to 10 significant digits to avoid floating-point overflow (e.g. `10 ÷ 3` → `3.333333333`) |
| `operatorValidation` / `resultMathErrorStringChecker` | Read display state to guard against invalid input sequences |

## Gotchas Handled

- ✅ Only ever evaluates one pair of numbers at a time
- ✅ Long decimals are rounded before display
- ✅ Pressing `=` with missing input does nothing (no crash)
- ✅ `Clear` fully wipes state
- ✅ Divide by zero shows an error instead of crashing
- ✅ Repeated operator presses don't trigger extra evaluations
- ✅ Typing a new digit after a result starts fresh instead of appending

## Extra Credit

- ✅ Decimal point input (with duplicate-decimal guard)
- ✅ Backspace / delete
- ✅ Full keyboard support

## Built With

- HTML
- CSS (Flexbox layout)
- Vanilla JavaScript (no libraries/frameworks)

