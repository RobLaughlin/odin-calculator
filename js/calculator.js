let calculatorState = {
    leftOperand: 0,
    rightOperand: null,
    display: 0
};

function operate(l, r, operator) {
    switch (operator) {
        case '+': return l+r;
        case '-': return l-r;
        case '*': return l*r;
        case '/':
            if (r == 0) { alert("Cannot divide by 0."); return null; }
            else        { return l / r; }
        default: return
    }
}

function digitClicked(e) {
    // Populate display if symbol is a digit

    // Update calculator state and then redraw
    let displayText = document.getElementById("CalculatorDisplayText");
    const displayTextContent = displayText.textContent;
    const lastDigit = displayTextContent[displayTextContent.length - 1];
    const digit = e.target.value;

    if (lastDigit === '0' && displayTextContent.length === 1) {
        displayText.textContent = digit;
    }
    else {
        displayText.textContent += digit;
    }

    calculatorState.display = Number(displayText.textContent);
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
            calcBody.appendChild(btn);
        }
    }
}



populateCalculatorButtons();