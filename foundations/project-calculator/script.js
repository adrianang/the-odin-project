initializeCalculator();

function initializeCalculator() {
  const display = document.querySelector('#display');
  const numbers = document.querySelectorAll('.number-val-btn');
  const operators = document.querySelectorAll('.operator-action-btn');
  const equalsButton = document.querySelector('#equals-btn');
  const clearButton = document.querySelector('#clear-btn');
  let displayValue = '0';
  let value1 = '';
  let value2 = '';
  let valueInConstruction = '1';
  let operatorToApply = '';
  let result;
  display.textContent = displayValue;

  numbers.forEach((numberBtn) => {
    numberBtn.addEventListener('click', () => {
      if (valueInConstruction === '1') {
        if (result) { result = '' };
        value1 += numberBtn.getAttribute('data-value');
        displayValue = value1;
      } else if (valueInConstruction === '2') {
        value2 += numberBtn.getAttribute('data-value');
        displayValue = value2;
      }

      updateDisplayValue(display, displayValue);
    });
  });

  operators.forEach((operatorBtn) => {
    operatorBtn.addEventListener('click', () => {
      // Replaces operator to apply without switching value in construction
      if (["+", "-", "*", "/"].includes(displayValue[displayValue.length - 1])) {
        displayValue = displayValue.slice(0, -1) + operatorBtn.textContent;
        operatorToApply = operatorBtn.getAttribute('data-action');
        updateDisplayValue(display, displayValue);
        return;
      }

      if (result) {
        value1 = result;
        value2 = '';
        result = '';
        displayValue = value1;
      }

      if (value1 !== '' && value2 !== '') { 
        result = operate(operatorToApply, Number(value1), Number(value2));
        displayValue = result;
        value1 = result;
        value2 = '';
        result = '';
        operatorToApply = '';
        valueInConstruction = '1';
      }

      operatorToApply = operatorBtn.getAttribute('data-action');
      displayValue += operatorBtn.textContent;
      updateDisplayValue(display, displayValue);
      
      if (valueInConstruction === '1') {
        valueInConstruction = '2';
      } else if (valueInConstruction === '2') {
        valueInConstruction = '1';
      }
    });
  });

  equalsButton.addEventListener('click',  () => {
    result = operate(operatorToApply, Number(value1), Number(value2));
    displayValue = result;
    updateDisplayValue(display, displayValue);

    value1 = '';
    value2 = '';
    displayValue = '0';
    valueInConstruction = '1';
    operatorToApply = '';
  });

  clearButton.addEventListener('click', () => {
    value1 = '';
    value2 = '';
    displayValue = '0';
    valueInConstruction = '1';
    operatorToApply = '';
    result = '';
    updateDisplayValue(display, displayValue);
  });
}

function updateDisplayValue(display, displayValue) {
  display.textContent = displayValue;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case 'add':
      return add(num1, num2);
    case 'subtract':
      return subtract(num1, num2);
    case 'multiply':
      return multiply(num1, num2);
    case 'divide':
      return divide(num1, num2);
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(dividend, divisor) {
  return dividend / divisor;
}