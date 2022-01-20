function game() {
  let playerScore = 0;
  let computerScore = 0;

  console.log(`
    ==============================================
    NOW STARTING: Rock, Paper, Scissors Tournament
    ==============================================
    - Best out of 5 rounds.
    - Draws and incorrect moves do not affect
      scoring, but still ends the round.
    - Tournament ends early if you make no move.
    - Good luck! :)
  `);

  for (let i = 0; i < 5; i++) {
    getScoreboard(playerScore, computerScore);
    console.log(`ROUND ${i + 1} of 5:`);
    let playerMove = prompt('Pick one: rock, paper, or scissors?');
    let roundResult = playRound(playerMove, computerPlay());

    if (roundResult === 'Win') {
      playerScore++;
    } else if (roundResult === 'Loss') {
      computerScore++;
    } else if (roundResult === null) {
      console.log('No move made.\nTournament ended early.');
      return null;
    }
  }

  getScoreboard(playerScore, computerScore);
  getTournamentWinner(playerScore, computerScore);
}

function getScoreboard(playerScore, computerScore) {
  let scoreboard = `
    ==========================
    ======= SCOREBOARD =======
    ==========================
    ===     ==========     ===
    === YOU ========== CPU ===
    ===  ${playerScore}  ==========  ${computerScore}  ===
    ===     ==========     ===
    ==========================
  `;

  console.log(scoreboard);
}

function getTournamentWinner(finalPlayerScore, finalComputerScore) {
  let winner;
  let winnerAnnouncement;

  if (finalPlayerScore > finalComputerScore) {
    winner = 'You';
    winnerAnnouncement = 'Congratulations -- you won the tournament!';
  } else if (finalPlayerScore < finalComputerScore) {
    winner = 'Computer';
    winnerAnnouncement = 'You lost -- better luck next time :(';
  } else {
    winner = 'You && Computer';
    winnerAnnouncement = 'It\'s a tie -- play again?';
  }

  console.log(`
    ==========================================
    FINAL WINNER: ${winner}
    ==========================================
    ${winnerAnnouncement}
  `);
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === null) { 
    return null;
  }

  playerSelection = `${playerSelection[0].toUpperCase() + playerSelection.slice(1).toLowerCase()}`;

  if (playerSelection === computerSelection) {
    console.log(`It's a tie -- you both picked ${playerSelection}! No points awarded.`);
    return 'Draw';
  } else if (
    playerSelection === 'Rock' && computerSelection === 'Paper' ||
    playerSelection === 'Paper' && computerSelection === 'Scissors' ||
    playerSelection === 'Scissors' && computerSelection === 'Rock'
  ) {
    console.log(`You lose! ${computerSelection} beats ${playerSelection}!`);
    return 'Loss';
  } else if (
    playerSelection === 'Rock' && computerSelection === 'Scissors' ||
    playerSelection === 'Paper' && computerSelection === 'Rock' ||
    playerSelection === 'Scissors' && computerSelection === 'Paper'
  ) {
    console.log(`You win! ${playerSelection} beats ${computerSelection}!`);
    return 'Win';
  } else {
    console.log('Something went wrong -- make sure you spelled your move correctly...');
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