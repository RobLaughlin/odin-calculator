let calculatorState = {
    leftOperand: 0,
    rightOperand: null,
    operator: null,
};

function operate(l, r, operator) {
    switch (operator) {
        case '+': return l+r;
        case '-': return l-r;
        case 'x': return l*r;
        case '/':
            if (r == 0) { alert("Cannot divide by 0."); clearCalculator(); return null; }
            else        { return l / r; }
        default: return
    }
}

function updateDisplay() {
    let displayText = document.getElementById("CalculatorDisplayText");
    if (calculatorState.operator === null) {
        displayText.textContent = calculatorState.leftOperand.toString();
    }
    else {
        displayText.textContent = calculatorState.leftOperand.toString() + calculatorState.operator.toString();
        if (calculatorState.rightOperand !== null) {
            displayText.textContent += calculatorState.rightOperand.toString();
        }
    }
}
function digitClicked(e) {
    // Populate display if symbol is a digit

    // First, update the calculator state then update the display.
    if (calculatorState.operator === null) {
        if (calculatorState.leftOperand === 0) {
            calculatorState.leftOperand = Number(e.target.value);
        }
        else {
            calculatorState.leftOperand = Number(calculatorState.leftOperand.toString() + e.target.value.toString());
        }
    }
    else if (calculatorState.rightOperand === null) {
        calculatorState.rightOperand = Number(e.target.value);
    }
    else {
        calculatorState.rightOperand = Number(calculatorState.rightOperand.toString() + e.target.value.toString());
    }

    updateDisplay();
}

function operatorClicked(e) {
    const operator = e.target.value;
    if (calculatorState.operator === null) {
        calculatorState.operator = operator;
    }
    else if (calculatorState.rightOperand !== null){
        const result = operate(calculatorState.leftOperand, calculatorState.rightOperand, calculatorState.operator);
        if (result !== null) {
            evaluate();
            calculatorState.operator = operator;
        }
    }
    updateDisplay();
}

function clearCalculator() {
    calculatorState.leftOperand = 0;
    calculatorState.operator = null;
    calculatorState.rightOperand = null;
    updateDisplay();
}

function evaluate() {
    if (calculatorState.operator !== null && calculatorState.rightOperand !== null) {
        const result = operate(calculatorState.leftOperand, calculatorState.rightOperand, calculatorState.operator);
        calculatorState.leftOperand = result === null ? 0 : result;
        calculatorState.operator = null;
        calculatorState.rightOperand = null;
    }

    updateDisplay();
}
function populateCalculatorButtons() {
    // Populate the calculator buttons top to bottom, left to right.
    const SYMBOLS = [
        ['7', '8', '9', 'x'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', 'C', '/'],
        ['1/x', 'x²', '√x', '=']];
    const WIDTH = "25%";
    const BTN_HEIGHT = "100px";

    let calcBody = document.getElementById("CalculatorBody");
    for (let i = 0; i < SYMBOLS.length; i++) {
        for (let j = 0; j < SYMBOLS[i].length; j++) {
            const symbol = SYMBOLS[i][j];
            let btn = document.createElement("button");
            btn.textContent = symbol;
            btn.classList.add("calculatorBtn");
            btn.value = symbol;
            btn.style.width = WIDTH;
            btn.style.boxSizing = "border-box";
            btn.style.height = BTN_HEIGHT;

            if (!isNaN(symbol)) {
                btn.addEventListener("click", digitClicked);
            }
            else {
                switch (symbol) {
                    case "x":
                    case "-":
                    case "+":
                    case "/":
                        btn.addEventListener("click", operatorClicked); break;
                    case "=":
                        btn.addEventListener("click", evaluate); break;
                    case "C":
                        btn.addEventListener("click", clearCalculator); break;
                }
            }
            calcBody.appendChild(btn);
        }
    }
}



populateCalculatorButtons();