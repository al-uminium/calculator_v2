//queryselectors
const buttons = document.querySelectorAll(".button");
const equal = document.querySelector("#equal");
const calculatorText = document.querySelector("#calculator-text")
const calculatedDisplay = document.querySelector("#calculated-display");

//basic math functions
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => a/b;
const exponential = (a,b) => a**b;

//calculator functions
const updateDisplay = (curr) => {
    calculatorText.value += curr
}

const allClear = () => {
    // will add later
}

const plusMinus = (a) => {
    // will add later
}

const operate = (a,b,op) => {
    switch(op) {
        case 'AC': 
            allClear();
            break;
        case 'plmn':
            plusMinus(a);
            break;
        case '+':
            add(a,b);
            break;
        case '-':
            subtract(a,b);
            break;
        case '×':
            multiply(a,b);
        case '÷':
            divide(a,b);
            break;
    }
}

//event listeners
buttons.forEach(button => {
    button.addEventListener("click", (trg) => {
        let classOfTrg = trg.target.classList;
        
        if (classOfTrg.contains("oper")) {
            operate
        } else {
            updateDisplay(trg.target.id)
        }
    })
});
