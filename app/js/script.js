const display = document.querySelector("[data-display]");
const numberBtns = document.querySelectorAll("[data-num]");
const operatorBtns = document.querySelectorAll("[data-operator]");
const equalsBtn = document.querySelector('[data-btn="equals"]');
const clearBtn = document.querySelector('[data-btn="clear"]');

let operators = { add: "+", subtract: "-", multiply: "*", divide: "/" };

let displayValue = null;
let a = null;
let b = null;
let operator = null;

let isLockedA = false;
let isLockedOperator = false;

let add = (a, b) => a + b;
let subtract = (a, b) => a - b;
let multiply = (a, b) => a * b;
let divide = (a, b) => (b === 0 ? "err: div w/null" : a / b);

let operate = (operator, a, b) => {
  switch (operator) {
    case "add":
      return add(a, b);
    case "subtract":
      return subtract(a, b);
    case "multiply":
      return multiply(a, b);
    case "divide":
      return divide(a, b);
    default:
      return "err: wrong operator";
  }
};

function populateDisplay(input) {
  if (displayValue === null) {
    display.textContent = input;
    displayValue = input;
  } else {
    display.textContent = input;
    displayValue += input;
  }
}

clearBtn.addEventListener("click", () => {
  displayValue = null;
  a = null;
  b = null;
  operator = null;
  isLockedA = false;
  isLockedOperator = false;

  display.textContent = "";
});

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!isLockedA) {
      if (a === null) {
        a = btn.dataset.num;
      } else {
        a += btn.dataset.num;
      }
      a = +a;
      populateDisplay(a);
    } else {
      if (operator === null) return;
      isLockedOperator = true;
      if (b === null) {
        b = btn.dataset.num;
      } else {
        b += btn.dataset.num;
      }
      b = +b;
      populateDisplay(b);
    }
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (a === null) return;
    isLockedA = true;
    if (!isLockedOperator) {
      operator = btn.dataset.operator;
      populateDisplay(operators[operator]);
    } else {
      a = operate(operator, a, b);
      displayValue = null;
      populateDisplay(a);
      operator = btn.dataset.operator;
      populateDisplay(operators[operator]);
    }
  });
});

equalsBtn.addEventListener("click", () => {
  if (!(a && b && operator)) return;
  a = operate(operator, a, b);
  displayValue = null;
  populateDisplay(a);
  b = null;
  operator = null;
  isLockedOperator = false;
});
