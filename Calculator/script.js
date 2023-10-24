// JavaScript for Calculator
const output = document.querySelector('.output');
const buttons = document.querySelectorAll('.child');

let currentInput = '';
let currentOperator = '';
let previousInput = '';

// Add click event listeners to all buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        handleInput(value);
    });
});

function handleInput(value) {
    if (value.match(/[0-9]/)) {
        currentInput += value;
        updateDisplay();
    } else if (value === '.') {
        if (!currentInput.includes('.') && currentInput !== '') {
            currentInput += value;
            updateDisplay();
        }
    } else if (value === 'AC') {
        clearAll();
    } else if (value === '+/-') {
        toggleSign();
    } else if (value === '%') {
        calculatePercentage();
    } else if (value.match(/[+/*-]/)) {
        handleOperator(value);
    } else if (value === '=') {
        calculateResult();
    }
}

function updateDisplay() {
    output.textContent = currentInput;
}

function clearAll() {
    currentInput = '';
    currentOperator = '';
    previousInput = '';
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function calculatePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// ...

function handleOperator(operator) {
    if (previousInput !== '') {
        calculateResult();
    } else {
        previousInput = currentInput;
        currentInput = '';
        currentOperator = operator;
    }
}

function calculateResult() {
    if (currentInput !== '' && previousInput !== '') {
        currentInput = performOperation(previousInput, currentInput, currentOperator);
        previousInput = '';
        currentOperator = '';
        updateDisplay();
    }
}

function performOperation(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':  // Use * for multiplication
            return (a * b).toString();
        case '/':
            if (b === 0) {
                return 'Error';
            }
            return (a / b).toString();
        default:
            return b.toString();
    }
}
