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

// Digit input validation and setup

const didHitMaxLength = (digits) => {
  return digits.length >= MAX_DIGITS_LENGTH ? true : false;
};

const isInputBlocked = (list, input) => {
  return didHitMaxLength(list) || (input === "." && list.includes("."))
    ? true
    : false;
};

const isValidKeyboardInput = (input) => {
  let keyboardValidInputs = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "+",
    "-",
    "*",
    "/",
    "=",
    "Delete",
    "c",
    "Enter",
  ];

  return keyboardValidInputs.includes(input);
};

// Display setup

const cleanDisplayBeforeInput = (list, input) => {
  if (input === ".") {
    list.splice(0, 16, "0");
  } else {
    list.splice(0);
  }
};

const updateDisplay = () => {
  display.innerHTML = digitArray.join("");
};

// Button Functions: data input, clear, delete, operators

const addNumToOperandList = (event, key) => {
  let num;
  if (event.type === "click") {
    num = event.target.id;
  } else if (event === "keydown") {
    num = key;
  }

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

const handleKeyboardInput = (event) => {
  let key = event.key;
  if (!isValidKeyboardInput(key)) {
    return;
  }

  switch (key) {
    case "+":
      operate(calculator.sum);
      break;
    case "-":
      operate(calculator.subtract);
      break;
    case "*":
      operate(calculator.multiply);
      break;
    case "/":
      operate(calculator.divide);
      break;
    case "=":
      getResult();
      break;
    case "Delete":
      erase();
      break;
    case "c":
      clearAll();
      break;
    case "Enter":
      getResult();
      break;
    default:
      addNumToOperandList(event.type, key);
      break;
  }
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
window.addEventListener("keydown", handleKeyboardInput);
