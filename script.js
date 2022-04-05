//queryselectors
const buttons = document.querySelectorAll(".button");
const equal = document.querySelector("#equal");
const calculatorText = document.querySelector("#calculator-text");
const calculatorDisplay = document.querySelector("#calculated-display");

//basic math functions
const add = (a,b) => a+b;
const subtract = (a,b) => a-b;
const multiply = (a,b) => a*b;
const divide = (a,b) => a/b;
const exponential = (a,b) => a**b;

//calculator functions
const updateCalculatorText = (curr) => {
    calculatorText.value += curr
}

const updateCalculatorDisplay = (curr) => {
    calculatorDisplay.innerText = calculatorText.value += curr;
    calculatorText.value = ""
}

const allClear = () => {
    calculatorText.value = ""
    calculatorDisplay.innerText = ""
}

const plusMinus = (a) => {
    // will add later
}

const operate = (a,b,op) => {
    switch(op) {
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

const validator = (str) => {
    const NaNIfString = Number(str);
    const lenOfCalcText = calculatorText.value.length;

    if (!lenOfCalcText && isNaN(NaNIfString)) {
        console.log("Nope")
    } else {
        return true
    }
}

//event listeners
buttons.forEach(button => {
    button.addEventListener("click", (trg) => {
        let classOfTrg = trg.target.classList;
        let ele = trg.target.id

        if (classOfTrg.contains("AC")) {
            allClear()
        }
        
        if (validator(ele)) {
            if (classOfTrg.contains("ar-oper")) {
                updateCalculatorDisplay(ele);
            } else if (classOfTrg.contains("equal")) {
                operate
            } else {
                updateCalculatorText(ele)
            }
        }
    })
});


