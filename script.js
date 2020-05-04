// Variables 

const display = document.getElementById("display");

const del = document.getElementById('del');
const clear = document.getElementById('clear');
const add = document.getElementById('add');
const sub = document.getElementById('sub');
const mult = document.getElementById('multip');
const divi = document.getElementById('divide');
const equal = document.getElementById('equal-operator');

const displayArr = [0];
var displayData = 0;
const operands = [];
var operator;

// BASIC ACTIONS: data input, clear and erase functions

const pushThisNumber = function(){
    let num = this.id;

    if (displayArr.length >= 13 || (num == "." && displayArr.includes("."))){
        return;
    } else if (num == "." && displayData == 0){
        displayArr.push('.');
    } else if (operator == undefined){
        
        if (displayArr.includes(".")){
            displayArr.push(num);
        } else if (displayData == 0){
            displayArr.splice(0);
            displayArr.push(num);
        } else { 
            displayArr.push(num);
        }

    } else if (num == "." && displayData == operands[0]){
        displayArr[0] = 0;
        displayArr.push(num);
    } else if (displayData == operands[0]) {
        displayArr.splice(0);
        displayArr.push(num);
    } else {
        displayArr.push(num);
    }

    displayData = displayArr.join("");
    return display.innerHTML = displayData;
};


const clearAll = function(){
    displayArr.splice(0);
    displayArr[0] = 0;
    operands.splice(0);
    displayData = displayArr.join("");
    operator = undefined;
    return display.innerHTML = displayData;
}

const erase = function(){
    if (displayArr.length == 1 && displayArr[0] == 0) {
        return;
    } else if (displayArr.length == 1){
        displayArr[0] = 0;
    } else {
    displayArr.pop();
    }
    displayData = displayArr.join("");
    return display.innerHTML = displayData; 
};

// Calculator Math operations


const sum = function(a,b) {
    return (a+b);
};

const subtract = function(a,b) {
    return (a-b);
};

const multiply = function(a,b) {
    let output = a * b;
    return +output.toPrecision(7); 
};

const divide = function(a,b) {
    let output = (b == 0)? "ERROR div/0": (a/b);
    return +output.toPrecision(7);
};

const operate = function(calc){
    let result;
    if (operator == undefined){
        operands.push(displayData);
        return operator = calc;
    } else {
        operands.push(displayData);
        result = calc(+operands[0],+operands[1]);
        operands.splice(0);
        operands[0] = result;
        operator = calc;
        displayArr.splice(0);
        displayArr[0] = result;
        return display.innerHTML = result;
    }
};

const getResult = function(calc){
    let result;
    if (operator == undefined){
        return; 
    } else {
        operands.push(displayData);
        result = calc(+operands[0],+operands[1]);
        operands.splice(0);
        displayArr.splice(0);
        operator = undefined;
        return display.innerHTML = result;
    }
}

// EVENT listeners

document.querySelectorAll('.digit').forEach(item => {
    item.addEventListener('click', pushThisNumber);
})

add.addEventListener("click", function(){operate(sum)});
sub.addEventListener("click", function(){operate(subtract)});
mult.addEventListener("click", function(){operate(multiply)});
divi.addEventListener("click", function(){operate(divide)});

del.addEventListener("click", erase);
equal.addEventListener("click", function(){getResult(operator)});
clear.addEventListener("click", clearAll);