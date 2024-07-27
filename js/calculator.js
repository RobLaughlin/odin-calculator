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
            calcBody.appendChild(btn);
        }
    }
}

populateCalculatorButtons();