// Variables
const display = document.getElementById("display");
const del = document.getElementById("del");
const clear = document.getElementById("clear");
const add = document.getElementById("add");
const sub = document.getElementById("sub");
const mult = document.getElementById("multip");
const divi = document.getElementById("divide");
const equal = document.getElementById("equal-operator");

const digitArray = ["0"];
const operands = [];
const operatorChoice = { mathFunction: undefined };
const inputLog = { lastInput: "" };
const MAX_DIGITS_LENGTH = 13;

// Calculator module - Math functions

const calculator = (() => {
  const sum = (a, b) => {
    return a + b;
  };
  const subtract = (a, b) => {
    return a - b;
  };
  const multiply = (a, b) => {
    return +(a * b).toPrecision(7);
  };
  const divide = (a, b) => {
    let output = b === 0 ? "ERROR div/0" : +(a / b).toPrecision(7);
    return output;
  };
  return { sum, subtract, multiply, divide };
})();

// Input check functions

const didHitMaxLength = (digits) => {
  return digits.length >= MAX_DIGITS_LENGTH ? true : false;
};

const isInputBlocked = (list, input) => {
  return didHitMaxLength(list) || (input === "." && list.includes("."))
    ? true
    : false;
};

const cleanDisplayBeforeInput = (list, input) => {
  if (input === ".") {
    list.splice(0, 16, "0");
  } else {
    list.splice(0);
  }
};

// Interface Functions: display setup, data input, clear and delete

const updateDisplay = () => {
  display.innerHTML = digitArray.join("");
};

const addNumToOperandList = (event) => {
  let num = event.target.id;
  let displayNum = digitArray.join("");

  if (inputLog.lastInput === "operator") {
    cleanDisplayBeforeInput(digitArray, num);
  } else {
    if (isInputBlocked(digitArray, num)) {
      return;
    } else if (displayNum === "0") {
      cleanDisplayBeforeInput(digitArray, num);
    }
  }

  digitArray.push(num);
  updateDisplay();
  inputLog.lastInput = num;
};

const clearAll = () => {
  digitArray.splice(0, 16, "0");
  operands.splice(0);
  operatorChoice.mathFunction = undefined;
  updateDisplay();
};

const erase = () => {
  if (digitArray.length === 1) {
    digitArray[0] = "0";
  } else {
    digitArray.pop();
  }
  updateDisplay();
};

// Calc operation functions

const operate = (calc) => {
  operands.push(digitArray.join(""));

  if (operatorChoice.mathFunction !== undefined) {
    let result = operatorChoice.mathFunction(+operands[0], +operands[1]);
    operands.splice(0);
    operands[0] = result;
    digitArray.splice(0);
    digitArray[0] = result;
    updateDisplay();
  }

  operatorChoice.mathFunction = calc;
  inputLog.lastInput = "operator";
};

const getResult = () => {
  if (operatorChoice.mathFunction !== undefined) {
    operands.push(digitArray.join(""));
    let result = operatorChoice.mathFunction(+operands[0], +operands[1]);
    clearAll();
    digitArray[0] = result;
    updateDisplay();
    inputLog.lastInput = "operator";
  }
};

// EVENT listeners

document.querySelectorAll(".digit").forEach((item) => {
  item.addEventListener("click", addNumToOperandList);
});
add.addEventListener("click", () => operate(calculator.sum));
sub.addEventListener("click", () => operate(calculator.subtract));
mult.addEventListener("click", () => operate(calculator.multiply));
divi.addEventListener("click", () => operate(calculator.divide));
del.addEventListener("click", erase);
equal.addEventListener("click", getResult);
clear.addEventListener("click", clearAll);
