game();

function game() {
  const playerOptions = document.querySelectorAll('#player-options button');
  const moveRecapSummary = document.querySelector('#move-recaps');
  const moveRecap = document.createElement('p');
  const playerScoreboard = document.querySelector('#player-score');
  const cpuScoreboard = document.querySelector('#cpu-score');
  const newGameButton = document.querySelector('#new-game');  
  let playerScore = 0;
  let cpuScore = 0;

  moveRecap.innerHTML = `Make a move to start a new game. <br />
    First to five points wins!`;
  moveRecapSummary.appendChild(moveRecap);

  playerOptions.forEach((button) => {
    button.addEventListener('click', () => {
      const playerMove = titleCaseMove(button.getAttribute('data-key'));
      const computerMove = computerPlay();
      const roundResult = playRound(playerMove, computerMove);
      updateScoreboard(playerScore, cpuScore, playerScoreboard, cpuScoreboard);

      if (roundResult === 'Win') {
        playerScore++;
        updateScoreboard(playerScore, cpuScore, playerScoreboard, cpuScoreboard);
        moveRecap.innerHTML = `You win! +1 to you!<br />
          ${playerMove} beats ${computerMove}!`;
      } else if (roundResult === 'Loss') {
        cpuScore++;
        updateScoreboard(playerScore, cpuScore, playerScoreboard, cpuScoreboard);
        moveRecap.innerHTML = `You lose! +1 for the CPU :(<br />
          ${computerMove} beats ${playerMove}!`;
      } else {
        moveRecap.innerHTML = `It's a tie, you both picked ${playerMove}.<br />
          No points awarded.`;
      }

      if (playerScore === 5) {
        moveRecap.innerHTML = `Congratulations -- you won the tournament!<br />
          Click on New Game to play again!`;
        toggleDisabledButtons(playerOptions);
      } else if (cpuScore === 5) {
        moveRecap.innerHTML = `You lost -- better luck next time :(<br />
          Click on New Game to play again!`;
        toggleDisabledButtons(playerOptions);
      }
    });
  });

  newGameButton.addEventListener('click', () => {
    let resetReason;
    if (playerScore === 5 || cpuScore === 5) {
      resetReason = 'New game';
      toggleDisabledButtons(playerOptions);
    } else if (playerScore < 5 && cpuScore < 5) {
      resetReason = 'Game reset by player';
    }

    moveRecap.innerHTML = `${resetReason} -- scores set back to 0.<br />
      Good luck this time!`;
    playerScore = 0;
    cpuScore = 0;
    updateScoreboard(playerScore, cpuScore, playerScoreboard, cpuScoreboard);
  });
}

function titleCaseMove(move) {
  let titleCasedMove = `${move[0].toUpperCase() + move.slice(1).toLowerCase()}`;
  return titleCasedMove;
}

function toggleDisabledButtons(buttons) {
  buttons.forEach((button) => {
    button.toggleAttribute('disabled');
  });
}

function updateScoreboard(playerScore, cpuScore, playerScoreboard, cpuScoreboard) {
  playerScoreboard.textContent = `You: ${playerScore}`;
  cpuScoreboard.textContent = `CPU: ${cpuScore}`;
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === null) { 
    return null;
  }

  if (playerSelection === computerSelection) {
    return 'Draw';
  } else if (
    playerSelection === 'Rock' && computerSelection === 'Paper' ||
    playerSelection === 'Paper' && computerSelection === 'Scissors' ||
    playerSelection === 'Scissors' && computerSelection === 'Rock'
  ) {
    return 'Loss';
  } else if (
    playerSelection === 'Rock' && computerSelection === 'Scissors' ||
    playerSelection === 'Paper' && computerSelection === 'Rock' ||
    playerSelection === 'Scissors' && computerSelection === 'Paper'
  ) {
    return 'Win';
  } else {
    return 'Error';
  }
}

function computerPlay() {
  let randomAction = Math.floor(Math.random() * 3);

  if (randomAction === 0) {
    return 'Rock';
  } else if (randomAction === 1) {
    return 'Paper';
  } else {
    return 'Scissors';
  }
}