let calculatorState = {
    leftOperand: 0,
    rightOperand: null,
    operator: null,
    decimalClicked: false
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

    let val = e.target.value;
    if (calculatorState.decimalClicked) {
        val = Number(val) / 10;
    }

    // Turn X.YYYYY into .YYYYY
    let truncated = val.toString().split('.');
    console.log(truncated);
    if (truncated.length === 1) {
        truncated = truncated[0];
    }
    else {
        truncated = '.' + truncated[truncated.length - 1];
    }

    // First, update the calculator state then update the display.
    if (calculatorState.operator === null) {
        if (calculatorState.leftOperand === 0) {
            calculatorState.leftOperand = Number(val);
        }
        else {
            
            calculatorState.leftOperand = Number(calculatorState.leftOperand.toString() + truncated);
        }
    }
    else if (calculatorState.rightOperand === null) {
        calculatorState.rightOperand = Number(val);
    }
    else {
        calculatorState.rightOperand = Number(calculatorState.rightOperand.toString() + truncated);
    }

    calculatorState.decimalClicked = false;
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
    calculatorState.decimalClicked = false;
    updateDisplay();
}

function evaluate() {
    if (calculatorState.operator !== null && calculatorState.rightOperand !== null) {
        const result = operate(calculatorState.leftOperand, calculatorState.rightOperand, calculatorState.operator);
        calculatorState.leftOperand = result === null ? 0 : result;
        calculatorState.operator = null;
        calculatorState.rightOperand = null;
        calculatorState.decimalClicked = false;
    }

    updateDisplay();
}

function decimalClicked() {
    const displayText = document.getElementById("CalculatorDisplayText");
    const displayTextContent = displayText.textContent;
    
    const numDecimals = displayTextContent.split('.').length - 1;
    if (calculatorState.operator === null && numDecimals === 0) {
        displayText.textContent += '.';
        calculatorState.decimalClicked = true;
    }
    else if (calculatorState.operator !== null && calculatorState.rightOperand !== null) {
        const rightOp = displayTextContent.split(calculatorState.operator)[1];
        if (!rightOp.includes('.')) {
            displayText.textContent += '.';
            calculatorState.decimalClicked = true;
        }
    }
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
                    case ".":
                        btn.addEventListener("click", decimalClicked); break;
                }
            }
            calcBody.appendChild(btn);
        }
    }
}



populateCalculatorButtons();