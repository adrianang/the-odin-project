initializeCanvas(4);

function initializeCanvas(size) {
  const clearButton = document.querySelector('#clear-btn');
  const canvas = document.querySelector('#canvas');
  const strokeColorButtons = document.querySelectorAll('.stroke-color-btn');
  const defaultStrokeColor = document.querySelector('#default-stroke-btn');
  const randomStrokeColor = document.querySelector('#random-stroke-btn');
  const burntStrokeColor = document.querySelector('#burn-stroke-btn');
  let currentStrokeColor = 'default';
  let currentSize = size;

  newCanvas(canvas, size, currentStrokeColor);

  clearButton.addEventListener('click', () => {
    removePixels(canvas);

    let newSize = Number(prompt('New size of grid (1–100)?'));
    if (newSize > 0 && newSize < 101) {
      currentSize = newSize;
      newCanvas(canvas, newSize, currentStrokeColor);
    } else {
      alert('Invalid input -- defaulted to a 4x4 grid.');
      newCanvas(canvas, 4, currentStrokeColor);
    }
  });

  defaultStrokeColor.addEventListener('click', () => {
    removePixels(canvas);
    currentStrokeColor = 'default';
    disableCurrentBtn(strokeColorButtons, currentStrokeColor);
    newCanvas(canvas, currentSize, currentStrokeColor);
  })

  randomStrokeColor.addEventListener('click', () => {
    removePixels(canvas);
    currentStrokeColor = 'random';
    disableCurrentBtn(strokeColorButtons, currentStrokeColor);
    newCanvas(canvas, currentSize, currentStrokeColor);
  });

  burntStrokeColor.addEventListener('click', () => {
    removePixels(canvas);
    currentStrokeColor = 'burnt';
    disableCurrentBtn(strokeColorButtons, currentStrokeColor);
    newCanvas(canvas, currentSize, currentStrokeColor);
  });
}

function newCanvas(canvas, size, strokeColor) {
  canvas.setAttribute('style',
    `grid-template-rows: repeat(${size}, 1fr);
     grid-template-columns: repeat(${size}, 1fr);`
  );

  for (let i = 0; i < (size * size); i++) {
    const canvasPixel = document.createElement('div');
    canvasPixel.addEventListener('mouseover', (e) => {
      if (strokeColor === 'default') {
        canvasPixel.style.backgroundColor =
          'rgba(24, 24, 24, 1.0)';
      } else if (strokeColor === 'random' && !canvasPixel.style.backgroundColor) {
        canvasPixel.style.backgroundColor =
          `rgb(${getRandomRGBVal()}, ${getRandomRGBVal()}, ${getRandomRGBVal()})`;
      } else if (strokeColor === 'burnt') {
        if (!canvasPixel.style.backgroundColor) {
          canvasPixel.style.backgroundColor =
            `rgba(24, 24, 24, 0.1)`;
        } else {
          let currentAlphaVal =
            Number(canvasPixel.style.backgroundColor.slice(-4, -1));
          if (currentAlphaVal < 1.0) {
            canvasPixel.style.backgroundColor =
              `rgba(24, 24, 24, ${currentAlphaVal + 0.1})`;
          }
        }
      }
    });

    canvas.appendChild(canvasPixel);
  }
}

function disableCurrentBtn(buttons, currentStrokeColor) {
  buttons.forEach(button => {
    if (button.getAttribute('data-key') === currentStrokeColor) {
      button.setAttribute('disabled', 'true');
    } else {
      button.removeAttribute('disabled');
    }
  });
}

function getRandomRGBVal() {
  return Math.floor(Math.random() * 255);
}

function removePixels(canvas) {
  while (canvas.firstChild) {
    canvas.firstChild.remove();
  }
}