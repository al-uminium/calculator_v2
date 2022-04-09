//queryselectors
const buttons = document.querySelectorAll(".button");
const equal = document.querySelector("#equal");
const lowerDisplay = document.querySelector("#lower-display");
const upperDisplay = document.querySelector("#upper-display");

//basic math functions
const add = (a,b) => Number(a)+Number(b);
const subtract = (a,b) => Number(a)-Number(b);
const multiply = (a,b) => Number(a)*Number(b);
const divide = (a,b) => Number(a)/Number(b);
const exponential = (a,b) => Number(a)**Number(b);

const arOper = ["÷", "×", "+", "-"]

//calculator functions
const updateLowerDisplay = (curr) => {
    lowerDisplay.value += curr
}

const operate = () => {
    const expression = upperDisplay.innerText + lowerDisplay.value
    const splitExpr = splitString(expression)
    const calculatedVal = calculate(...splitExpr)
    
    return calculatedVal
}

const convertToArOper = (op) => {
    switch (op) {
        case "/":
            return "÷"
        case "*":
            return "×"
        case "Enter":
            return "="
        default:
            return op
    }
}


//takes in an arithmetic operator as input
const updateUpperDisplay = (curr) => {
    const upperDisplayLength = upperDisplay.innerText.length;
    const lowerDisplayLength = lowerDisplay.value.length
    curr = convertToArOper(curr)

    if (upperDisplayLength || lowerDisplayLength) {
        //check if lower display & upper display has text
        if (lowerDisplayLength && upperDisplayLength) {
            //run validation check
            const calculatedVal = operate()
            upperDisplay.innerText = (curr == "=") ? String(calculatedVal) : String(calculatedVal) + curr
        }

        //if upper is empty, update upper
        if (!upperDisplayLength) {
            upperDisplay.innerText = (curr == "=") ? lowerDisplay.value : lowerDisplay.value + curr;
        }

        if (upperDisplayLength && !lowerDisplayLength) {
            const expr = splitString(upperDisplay.innerText)
            if (curr != "=") {
                upperDisplay.innerText = expr[0] + curr
            }
        }
    }
    lowerDisplay.value = ""
}

const allClear = () => {
    lowerDisplay.value = ""
    upperDisplay.innerText = ""
}

const plusMinus = (a) => {
    // will add later
}


//function splits an expression into an array of size 3 with it's constituents, e.g., 1+1 => ["1","1","+"], 1 => ["1","",""]
const splitString = (expr) => {
    
    for (let x=0; x<4; x++) {
        if (expr.includes(arOper[x])) {
            let i = 0;
            while (expr.indexOf(arOper[i]) < 0) {
                i++;
            }
            const operIndex = expr.indexOf(arOper[i])
            const a = expr.slice(0, operIndex)
            const b = expr.slice(operIndex+1, expr.length)
            const oper = arOper[i]
            return [a, b, oper]

        } 
    }

    return [expr, "", ""]
}

const calculate = (a,b,op) => {
    switch(op) {
        case 'plmn':
            plusMinus(a);
            break;
        case '+':
            return add(a,b);
        case '-':
            return subtract(a,b);
        case '×':
            return multiply(a,b);
        case '÷':
            return divide(a,b);
    }
}


// Below code probably needs to be split into 2 different validation types (for upper and lower display)
// const validator = (str) => {
//     const NaNIfString = Number(str);
//     const lenOfCalcText = lowerDisplay.value.length;

//     if (!lenOfCalcText && isNaN(NaNIfString)) {
//         console.log("Nope")
//     } else {
//         return true
//     }
// }

const checkForArOperators = () => {
    const currentDisplayText = upperDisplay.innerText;

    //check if it contains any of the arithmetic operators, returns true if there is
    let containsArOper = false;

    //indexOf() returns -1, which using the bitwise NOT ~ operator turns it into a 0 [falsy value]. !! is a logical NOT to convert into bool.
    for (let i = 0; i<4; i++ ) {
        if (!!~currentDisplayText.indexOf(arOper[i])) {
            containsArOper = true;
        }
    }

    return containsArOper
}

//event listeners
buttons.forEach(button => {
    button.addEventListener("click", (trg) => {
        let classOfTrg = trg.target.classList;
        let ele = trg.target.id

        if (classOfTrg.contains("AC")) {
            allClear()
        } else if (classOfTrg.contains("ar-oper")) {
            updateUpperDisplay(ele);
        } else {
            updateLowerDisplay(ele)
        }        

    })
});

lowerDisplay.addEventListener("keyup", (trg) => {
    if (trg.key == "Enter" || trg.key == "+" || trg.key == "-" || trg.key == "/" || trg.key == "*") {
        updateUpperDisplay(trg.key)
    }
})

