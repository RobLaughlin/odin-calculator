function populateCalculatorButtons() {
    // Populate the calculator buttons top to bottom, left to right.
    const SYMBOLS = "789x456-123+C0.=";
    const ROW_WIDTH = 4;
    const WIDTH = (100 * ROW_WIDTH / SYMBOLS.length).toString() + '%';
    const BTN_HEIGHT = "100px";

    let calcBody = document.getElementById("CalculatorBody");
    for (let i = 0; i < SYMBOLS.length; i++) {
        const symbol = SYMBOLS[i];
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

populateCalculatorButtons();