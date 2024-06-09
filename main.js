const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

let val1 = '0';
let operator = "";
let result = 0;
let valid = false;


const operationList = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
const acButton = document.querySelector(".ac");
const sign = document.querySelector(".sign");
const dot = document.querySelector('.dot');
const digitList = document.querySelectorAll(".digit");
const display = document.querySelector(".display");
const del = document.querySelector(".del");

function formatResult(result) {
    if (result < -999999999999 || result > 999999999999) {
        return "Overflow";
    }
    
    let formattedResult = result.toString();
    
    if (formattedResult.includes('.')) {
        let [integerPart, decimalPart] = formattedResult.split('.');
        
        if (integerPart.length + decimalPart.length > 11) {
            formattedResult = Number(result.toFixed(11 - integerPart.length)).toString();
        }
    }
    
    if (formattedResult.length > 12) {
        return "Overflow";
    }
    
    return formattedResult;
}


function operate(result, operator, num1) {
    result = Number(result);
    value = Number(num1);
    switch (operator) {
        case '+':
            return formatResult(add(result, value));
        case '-':
            return formatResult(substract(result, value));
        case 'x':
            return formatResult(multiply(result, value));
        case '*':
            return formatResult(multiply(result, value));
        case '/':
            return formatResult(divide(result, value));

    }
}

function displayResult(result) {
    document.querySelector('.display').textContent = result;
}

function resetAll() {
    val1 = '0';
    operator = '';
    result = 0;
    valid = false;
}

function clearDisplay() { 
    display.textContent = '0';
}

equal.addEventListener("click", () => {
    result = operate(result, operator, val1)
    displayResult(result);  
})

function populate(char) {
    if (val1 === '0') {
        val1 = char;  
    } else if (val1.length < 12) {
        val1 += char;
    }
    displayResult(val1);;
}

function addOperator(op) {
    if (valid === false) {
        operator = op;
        result = val1;
        val1 = '0';
        displayResult(result);
        valid = true;
    } else {
        result = operate(result, operator, val1)
        val1 = '0';
        displayResult(result);
        operator = op;
    } 
}

function deleteLastDigit() {
    if (val1 != 0 && val1.length === 1) val1 = '0';
    if (val1 != '0' && val1.length > 1)  val1 = val1.slice(0, -1);
    displayResult(val1);
}

operationList.forEach((el) => {
    el.addEventListener('click', () => {
        const op = el.textContent;
        addOperator(op);
    });
})

acButton.addEventListener('click', () => {
    clearDisplay();
    resetAll();
});


sign.addEventListener("click", () => {
    if (val1 != '0' && val1 != '') {
        val1 = (val1[0] === '-' ? val1.slice(1) : '-' + val1);
    }
    displayResult(val1); 
})


dot.addEventListener("click", () => {  
    if (val1.includes('.')) {
        return
    } else if (val1 === '') {
        val1 = '0.';
    } else {
        val1 = (val1.slice(-1) === '.' ? val1 : val1 + '.');
    }    
    displayResult(val1);
})

digitList.forEach((el) => {
    el.addEventListener('click', () => {
        populate(el.textContent);
    }); 
})

del.addEventListener('click', () => deleteLastDigit());

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/^[0-9]$/.test(key)) {
        populate(key);
    } else if (key === 'Backspace') {
        deleteLastDigit();
    } else if (key === '=') {
        result = operate(result, operator, val1)
        displayResult(result);
    } else if (key === '.') {
        if (val1.includes('.')) {
            return
        } else if (val1 === '') {
            val1 = '0.';
        } else {
            val1 = (val1.slice(-1) === '.' ? val1 : val1 + '.');
        }    
        displayResult(val1);
    } else if (/[\*\/+\-]/.test(key)) {
        addOperator(key)
    } else {
        console.log(key);
    }
    
});




