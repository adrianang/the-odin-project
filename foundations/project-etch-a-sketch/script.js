initializeCanvas(4);

function initializeCanvas(size) {
  const clearButton = document.querySelector('#clear-btn');
  const canvas = document.querySelector('#canvas');

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

  clearButton.addEventListener('click', () => {
    for (let i = 0; i < (4 * 4); i++) {
      canvas.removeChild(canvas.childNodes[0]);
    }

    initializeCanvas(4);
  });
}