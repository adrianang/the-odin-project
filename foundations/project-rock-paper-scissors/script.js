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

function playRound(playerSelection, computerSelection) {
  playerSelection = `${playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()}`;

  if (playerSelection === computerSelection) {
    return `It's a tie -- you both picked ${playerSelection}!`;
  } else if (
    playerSelection === 'Rock' && computerSelection === 'Paper' ||
    playerSelection === 'Paper' && computerSelection === 'Scissors' ||
    playerSelection === 'Scissors' && computerSelection === 'Rock'
  ) {
    return `You Lose! ${computerSelection} beats ${playerSelection}!`;
  } else if (
    playerSelection === 'Rock' && computerSelection === 'Scissors' ||
    playerSelection === 'Paper' && computerSelection === 'Rock' ||
    playerSelection === 'Scissors' && computerSelection === 'Paper'
  ) {
    return `You Win! ${playerSelection} beats ${computerSelection}!`;
  } else {
    return 'Something went wrong -- make sure you spelled your move correctly...'
  }
}