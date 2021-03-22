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

// mathOperations module - Math functions

const mathOperations = (() => {
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

// Digit input validation

const didHitMaxLength = (digits) => {
  return digits.length >= MAX_DIGITS_LENGTH;
};

const isDecimalBlocked = (digits, input) => {
  return input === "." && digits.includes(".");
};

const isInputBlocked = (displayDigits, input) => {
  return (
    didHitMaxLength(displayDigits) || isDecimalBlocked(displayDigits, input)
  );
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

const cleanDisplayBeforeInput = (digits, input) => {
  if (input === ".") {
    digits.splice(0, 16, "0");
  } else {
    digits.splice(0);
  }
};

const updateDisplay = () => {
  display.innerHTML = digitArray.join("");
};

// Button Functions: data input, clear, delete, operators

const getInputEventSource = (event) => {
  if (event.type === "click") {
    return event.target.id;
  } else if (event.type === "keydown") {
    return event.key;
  }
};

const addNumToOperandList = (event) => {
  let num = getInputEventSource(event);
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
      operate(mathOperations.sum);
      break;
    case "-":
      operate(mathOperations.subtract);
      break;
    case "*":
      operate(mathOperations.multiply);
      break;
    case "/":
      operate(mathOperations.divide);
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
      addNumToOperandList(event);
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
add.addEventListener("click", () => operate(mathOperations.sum));
sub.addEventListener("click", () => operate(mathOperations.subtract));
mult.addEventListener("click", () => operate(mathOperations.multiply));
divi.addEventListener("click", () => operate(mathOperations.divide));
del.addEventListener("click", erase);
equal.addEventListener("click", getResult);
clear.addEventListener("click", clearAll);
window.addEventListener("keydown", handleKeyboardInput);
