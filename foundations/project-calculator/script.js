initializeCalculator();

function initializeCalculator() {
  const display = document.querySelector('#display');
  const numbers = document.querySelectorAll('.number-val-btn');
  const operators = document.querySelectorAll('.operator-action-btn');
  const decimalButton = document.querySelector('#decimal-btn');
  const equalsButton = document.querySelector('#equals-btn');
  const clearButton = document.querySelector('#clear-btn');
  const backspaceButton = document.querySelector('#backspace-btn');
  let displayValue = '0';
  let value1 = '';
  let value2 = '';
  let valueToConstruct = '1';
  let operatorToApply = '';
  let result;
  display.textContent = displayValue;

  numbers.forEach((numberBtn) => {
    numberBtn.addEventListener('click', () => addDigitToValue(numberBtn));
  });

  operators.forEach((operatorBtn) => {
    operatorBtn.addEventListener('click', () => applyOperator(operatorBtn));
  });
  
  equalsButton.addEventListener('click',  () => calculateWithEqualsBtn());
  clearButton.addEventListener('click', () => resetCalculatorState());
  backspaceButton.addEventListener('click', () => backspace());

  document.addEventListener('keydown', (e) => {
    const operatorQuerySelectTemplate = `.operator-action-btn[data-key="${e.key}"]`;
    const numberValueQuerySelectTemplate = `.number-val-btn[data-value="${e.key}"]`;

    if (['+', '-', '*', '/'].includes(e.key)) {
      const operatorBtn = document.querySelector(operatorQuerySelectTemplate);
      applyOperator(operatorBtn);
      return;
    }

    if (Number(e.key >= 0) && Number(e.key <= 9)) {
      const numberBtn = document.querySelector(numberValueQuerySelectTemplate);
      addDigitToValue(numberBtn);
    }
    
    if (e.key === '.') {
      const decimalBtn = document.querySelector(numberValueQuerySelectTemplate);
      if (!decimalBtn.getAttribute('disabled')) { addDigitToValue(decimalBtn) };
    }

    if (e.key === '=' || e.key === "Enter") { calculateWithEqualsBtn() }
    if (e.key === 'Escape') { resetCalculatorState() }
    if (e.key === 'Backspace') { backspace() }
  });

  function addDigitToValue(numberBtn) {
    if (valueToConstruct === '1') {
      if (result) { result = '' };
      value1 += numberBtn.getAttribute('data-value');
      displayValue = value1;
    } else if (valueToConstruct === '2') {
      value2 += numberBtn.getAttribute('data-value');
      displayValue = value2;
    }

    if (numberBtn.getAttribute('data-value') === '.') {
      numberBtn.setAttribute('disabled', true);
    }

    backspaceButton.removeAttribute('disabled');
    updateDisplayValue(display, displayValue);
  }

  function applyOperator(operatorBtn) {
    // Replaces operator to apply without switching value in construction
    if (['+', '-', '*', '/'].includes(displayValue[displayValue.length - 1])) {
      displayValue = displayValue.slice(0, -1) + operatorBtn.textContent;
      operatorToApply = operatorBtn.getAttribute('data-action');
      updateDisplayValue(display, displayValue);
      return;
    }

    // Sets value1 to result if operator is selected after clicking equals button
    if (result) {
      setValue1ToResult();
    }

    // Sets value1 to result if operations are chained
    if (value1 !== '' && value2 !== '') {
      result = getResult(operatorToApply, value1, value2);
      setValue1ToResult();
      operatorToApply = '';
      valueToConstruct = '1';
    }

    decimalButton.removeAttribute('disabled');
    backspaceButton.setAttribute('disabled', true);
    operatorToApply = operatorBtn.getAttribute('data-action');
    displayValue += operatorBtn.textContent;
    updateDisplayValue(display, displayValue);
    toggleValueToConstruct();
  }

  function calculateWithEqualsBtn() {
    result = getResult(operatorToApply, value1, value2);
    if (!result) {
      value2 = '';
      displayValue = '0';
      decimalButton.removeAttribute('disabled');
      return;
    } else {
      displayValue = result;
    }

    updateDisplayValue(display, displayValue);
    resetCalculatorStateExceptResult();
  }

  function resetCalculatorState() {
    resetCalculatorStateExceptResult();
    result = '';
    updateDisplayValue(display, displayValue);
  }

  function resetCalculatorStateExceptResult() {
    value1 = '';
    value2 = '';
    displayValue = '0';
    valueToConstruct = '1';
    operatorToApply = '';
    decimalButton.removeAttribute('disabled');
    backspaceButton.setAttribute('disabled', true);
  }

  function setValue1ToResult() {
    value1 = result;
    value2 = '';
    result = '';
    displayValue = value1;
  }

  function backspace() {
    if (valueToConstruct === '1') {
      if (!value1) { return };
      value1 = value1.slice(0, -1);
      displayValue = (value1 || 0) + operatorToApply;
      if (!value1.includes('.')) { decimalButton.removeAttribute('disabled') };
    } else if (valueToConstruct === '2') {
      if (!value2) { return };
      value2 = value2.slice(0, -1);
      displayValue = (value2 || 0);
      if (!value2.includes('.')) { decimalButton.removeAttribute('disabled') };
    }

    updateDisplayValue(display, displayValue);
  }

  function toggleValueToConstruct() {
    if (valueToConstruct === '1') {
      valueToConstruct = '2';
    } else if (valueToConstruct === '2') {
      valueToConstruct = '1';
    }
  }
}

function getResult(operatorToApply, value1, value2) {
  if (!value2) { return value1 }
  if (value2 === '0' && operatorToApply === 'divide') {
    alert('Divide by zero error! 🧐');
    return;
  }

  const convertedValue1 = Number(value1);
  const convertedValue2 = Number(value2);
  return Number(operate(operatorToApply, convertedValue1, convertedValue2)
         .toFixed(9));
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