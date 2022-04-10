//queryselectors
const buttons = document.querySelectorAll(".button");
const equal = document.querySelector("#equal");
const lowerDisplay = document.querySelector("#lower-display");
const upperDisplay = document.querySelector("#upper-display");
const displayContainer = document.querySelector("#display-container")

//basic math functions
const add = (a,b) => Number(a)+Number(b);
const subtract = (a,b) => Number(a)-Number(b);
const multiply = (a,b) => Number(a)*Number(b);
const divide = (a,b) => Number(a)/Number(b);
const exponential = (a,b) => Number(a)**Number(b);

const arOper = ["÷", "×", "+", "-"]

//calculator functions
const operate = () => {
    const expression = upperDisplay.innerText + " " + lowerDisplay.innerText
    const splitExpr = expression.split(" ")
    console.log(splitExpr)
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
        case "Backspace":
            return "DEL"
        default:
            return op
    }
}

const convertToNum = (str) => String(Number(str))

const updateLowerDisplay = (curr) => {
    curr = convertToArOper(curr)

    //convert from exponential to num first, if length is > 19

    if (curr == "DEL") {
        lowerDisplay.innerText = lowerDisplay.innerText.slice(0,-1)
    } else if (curr == "plmn") {
        lowerDisplay.innerText = plusMinus(lowerDisplay.innerText)
    } else {
        lowerDisplay.innerText = lowerDisplay.innerText + curr
    }

    if (lowerDisplay.innerText.length>19)  {
        lowerDisplay.innerText = "WIP"
    }
}

//takes in an arithmetic operator as input
const updateUpperDisplay = (curr) => {
    const upperDisplayLength = upperDisplay.innerText.length;
    const lowerDisplayLength = lowerDisplay.innerText.length
    curr = convertToArOper(curr)

    if (upperDisplayLength || lowerDisplayLength) {
        //check if lower display & upper display has text
        if (lowerDisplayLength && upperDisplayLength) {
            //run validation check
            if (arOper.includes(upperDisplay.innerText[upperDisplayLength-1])) {
                const calculatedVal = operate()
                upperDisplay.innerText = (curr == "=") ? String(calculatedVal) : String(calculatedVal) + " " + curr
            } else {
                upperDisplay.innerText = lowerDisplay.innerText
            }
        }

        //if upper is empty, update upper
        if (!upperDisplayLength) {
            upperDisplay.innerText = (curr == "=") ? lowerDisplay.innerText : lowerDisplay.innerText + " " + curr;
        }

        if (upperDisplayLength && !lowerDisplayLength) {
            const expr = upperDisplay.innerText.split(" ")
            if (curr != "=") {
                upperDisplay.innerText = expr[0] + " " + curr + " "
            }
        }
    }
    lowerDisplay.innerText = ""
}

const allClear = () => {
    lowerDisplay.innerText = ""
    upperDisplay.innerText = ""
}

const plusMinus = (a) => {
    if (a[0] == "-") {
        return a.slice(1,a.length)
    } else {
        return "-"+a
    }
}

const calculate = (a,op,b) => {
    switch(op) {
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

displayContainer.addEventListener("keydown", (trg) => {
    if (!isNaN(Number(trg.key)) || trg.key == "Backspace" || trg.key == ".") {
        updateLowerDisplay(trg.key)
    }

    if (trg.key == "Enter" || trg.key == "+" || trg.key == "-" || trg.key == "/" || trg.key == "*") {
        updateUpperDisplay(trg.key)
    }
})

