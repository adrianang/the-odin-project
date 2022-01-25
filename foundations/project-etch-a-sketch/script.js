initializeCanvas(4);

function initializeCanvas(size) {
  const clearButton = document.querySelector('#clear-btn');
  const canvas = document.querySelector('#canvas');

  newCanvas(canvas, size);

  clearButton.addEventListener('click', () => {
    while (canvas.firstChild) {
      canvas.firstChild.remove();
    }

    let newSize = Number(prompt('New size of grid (1—100)?'));
    if (newSize > 0 && newSize < 101) {
      newCanvas(canvas, newSize);
    } else {
      alert('Invalid input -- defaulted to a 4x4 grid.');
      newCanvas(canvas, 4);
    }
  });
}

function newCanvas(canvas, size) {
  canvas.setAttribute('style',
    `grid-template-rows: repeat(${size}, 1fr);
     grid-template-columns: repeat(${size}, 1fr);`
  );

  for (let i = 0; i < (size * size); i++) {
    const canvasPixel = document.createElement('div');
    canvasPixel.addEventListener('mouseover', (e) => {
      canvasPixel.style.backgroundColor = 'rgba(24, 24, 24, 1.0)';
    });

    canvas.appendChild(canvasPixel);
  }
}