const buttons = document.querySelectorAll('button');
const green = 'rgb(0, 255, 0)';
const yellow = 'rgb(255, 255, 0)';
const red = 'rgb(255, 0, 0)';

const emojiMap = {
    '🗿': 'rock',
    '📃': 'paper',
    '✂️': 'scissors'
};

let playerScore = 0;
let computerScore = 0;

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    return choices[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = emojiMap[playerSelection];

    if (playerSelection === computerSelection) {
        return {
            color: yellow,
            phrase: 'Tie!'
        };
    } else if (
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        playerScore += 1;
        return {
            color: green,
            phrase: 'You Win a Round!'
        };
    } else {
        computerScore += 1;
        return {
            color: red,
            phrase: 'You Lose a Round!'
        };
    }
}

function updateDisplay(playerSelection, computerSelection, colorPhraseObj) {
    const playerChoiceText = document.getElementById('playerChoice');
    const computerChoiceText = document.getElementById('computerChoice');
    const resultOfRound = document.getElementById('resultOfRound');
    const playerScoreText = document.getElementById('playerScore');
    const computerScoreText = document.getElementById('computerScore');

    resultOfRound.style.color = colorPhraseObj.color;
    resultOfRound.style.fontWeight = '900';
    resultOfRound.textContent = colorPhraseObj.phrase;

    playerChoiceText.textContent = `Your Choice: ${playerSelection}`;
    computerChoiceText.textContent = `Computer Choice: ${computerSelection}`;

    playerScoreText.textContent = `Score: ${playerScore}`;
    computerScoreText.textContent = `Score: ${computerScore}`;
}

function endGameDisplay() {
    const gameSection = document.getElementById('gameSection');
    gameSection.style.display = 'none';

    const endGameSection = document.getElementById('endGameSection');
    endGameSection.style.display = 'block';

    const gameResult = document.getElementById('gameResult');
    const color = playerScore > computerScore ? green : red;

    gameResult.textContent = playerScore > computerScore ?
        `You Win ${playerScore}:${computerScore}` :
        `Computer Wins ${computerScore}:${playerScore}`;

    gameResult.style.color = color;

    return [0, 0];
}

function playAgain() {
    const resultOfRound = document.getElementById('resultOfRound');
    const gameResult = document.getElementById('gameResult');
    const gameSection = document.getElementById('gameSection');
    const endGameSection = document.getElementById('endGameSection');

    resultOfRound.textContent = '-';
    resultOfRound.style.color = 'white';

    gameResult.textContent = '';

    const elementsToReset = ['playerChoice', 'computerChoice', 'playerScore', 'computerScore'];
    elementsToReset.forEach(id => document.getElementById(id).textContent = id.includes('Score') ? 'Score: 0' : 'Your Choice: ');

    gameSection.style.display = 'block';
    endGameSection.style.display = 'none';
}

// Listen for click of the PlayerButton
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const playerSelection = btn.textContent.toLowerCase();
        const computerSelection = getComputerChoice();
        const colorPhraseObj = playRound(playerSelection, computerSelection);

        updateDisplay(playerSelection, computerSelection, colorPhraseObj);

        if (playerScore === 5 || computerScore === 5) {
            [playerScore, computerScore] = endGameDisplay();

            const playAgainButton = document.getElementById('playAgainButton');
            playAgainButton.addEventListener('click', playAgain);
        }
    });
});
