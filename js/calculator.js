// known bugs:
// - you can put many 0s where there shouldn't be
// - percentage doesn't work

let firstNum = "";
let secondNum = "";
let operator = "";
let previousNum = "";
let output = "";

const outputDiv = document.querySelector("#output")

function add(x, y) {
    return x + y;
};

function subtract(x, y) {
    return x - y;
};

function multiply(x, y) {
    return x * y;
};

function divide(x, y) {
    if (y === 0) {
        output = "no";
        secondNum = "0";
        return output;
    }

    return x / y;
};

let symbols = ["+", "-", "*", "/", "add", "subtract", "multiply", "divide", "equal"];

let operators = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};

function operate() {
    output = operators[operator](+firstNum, +secondNum);
};

const buttonList = document.querySelectorAll(".button");
buttonList.forEach(button => {
    button.addEventListener("click", function() {
        if (symbols.indexOf(button.id) != -1) { // checks if it's an operator
            if (button.id === "equal") {
                if (firstNum && secondNum) { // only option is to combine the two numbers
                    operate()
                    firstNum = output // start over
                    secondNum = ""
                    operator = ""
                }
            } else if (firstNum && !secondNum) { // before typing secondNum
                operator = button.textContent
            } else if (firstNum && secondNum) { // numbers are typed out but there may be a new operator
                operate()

                operator = button.textContent
                firstNum = output
                secondNum = ""
            }
        } else if (button.className == "number button") {
            if ((button.textContent == "0") && (outputDiv.textContent.charAt(0) == 0) && (outputDiv.textContent == "")) {
                // ignore!
            } else if (!operator) { // before operator is set
                if (!secondNum) { // means we're still on firstNum
                    firstNum += button.textContent
                    output = firstNum
                } else { // means we must be on secondNum
                    secondNum += button.textContent
                    output = secondNum
                }
            } else if ((firstNum && secondNum) || (firstNum && !secondNum)) {
                secondNum += button.textContent
                output = secondNum
            }
        } else if (button.id == "toggle") {
            if (output == firstNum) {
                if (Math.sign(firstNum) > 0) {
                    firstNum = -Math.abs(firstNum)
                } else if (Math.sign(output) < 0) {
                    firstNum = Math.abs(firstNum)
                } // else the num is zero!

                output = firstNum
            } else if (output == secondNum) {
                if (Math.sign(firstNum) > 0) {
                    secondNum = -Math.abs(secondNum)
                } else if (Math.sign(output) < 0) {
                    secondNum = Math.abs(secondNum)
                } // else the num is zero!

                output = secondNum
            } else { // assume it's the output; no need to change any vars
                output = "0"
            }
        } else if (button.id == "percent") {
            if (output == firstNum) {
                output = "0"
                firstNum = ""
            } else if (output == secondNum) {
                output = "0"
                secondNum = ""
            } else { // assume it's the output; no need to change any vars
                output = "0"
            }
        } else if (button.id == "clear") {
            if (output == firstNum) {
                output = "0"
                firstNum = ""

                operator = ""
            } else if (output == secondNum) {
                output = "0"
                secondNum = ""
            } else { // assume it's the output; no need to change any vars
                output = "0"
            }
        };

        outputDiv.textContent = output;
    });
});