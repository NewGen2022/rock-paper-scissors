const buttons = document.querySelectorAll('button');
const green = 'rgb(0, 255, 0)';
const yellow = 'rgb(255, 255, 0)';
const red = 'rgb(255, 0, 0)';

const emojiMap = {
    '🗿': 'rock',
    '📃': 'paper',
    '✂️': 'scissors'
};

emojiPlayer = '👨‍💻';
emojiComputer = '👾';

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
    const resultOfRound = document.getElementById('resultOfRound');
    const playerScoreText = document.getElementById('playerScore');
    const computerScoreText = document.getElementById('computerScore');

    resultOfRound.style.color = colorPhraseObj.color;
    resultOfRound.style.fontWeight = '900';
    resultOfRound.textContent = colorPhraseObj.phrase;

    if (colorPhraseObj.color === yellow) {
        resultOfRound.style.textShadow = '0 0 7px yellow, 0 0 10px yellow, 0 0 21px yellow, 0 0 42px yellow';
        resultOfRound.style.transition = 'text-shadow 0.3s linear'
    } else if (colorPhraseObj.color === green) {
        resultOfRound.style.textShadow = '0 0 7px green, 0 0 10px green, 0 0 21px green, 0 0 42px green';
        resultOfRound.style.transition = 'text-shadow 0.3s linear'
    } else if (colorPhraseObj.color === red) {
        resultOfRound.style.textShadow = '0 0 7px red, 0 0 10px red, 0 0 21px red, 0 0 42px red';
        resultOfRound.style.transition = 'text-shadow 0.3s linear'
    }

    playerChoiceText.textContent = `Your Choice: ${playerSelection}`;

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

    const emojiOfWinner = document.getElementById('emoji-size')
    
    if (playerScore > computerScore) {
        emojiOfWinner.textContent = emojiPlayer;
        gameResult.textContent = `You Win ${playerScore}:${computerScore}`;
    } else {
        emojiOfWinner.textContent = emojiComputer;
        gameResult.textContent = `Computer Wins ${computerScore}:${playerScore}`;
    }

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
    resultOfRound.style.textShadow = 'none'

    const computerButtonContainer = document.getElementById('computer');
    const computerButtons = computerButtonContainer.querySelectorAll('button');
    computerButtons.forEach(computerBtn => {
        computerBtn.style.backgroundColor = '#fff'
        computerBtn.style.boxShadow = 'none'
        computerBtn.style.textShadow = 'none'
        computerBtn.style.transition = 'none'
    });

    gameResult.textContent = '';

    const elementsToReset = ['playerChoice', 'playerScore', 'computerScore'];
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

        // Reset background color of computer buttons within the #computer div
        const computerButtonContainer = document.getElementById('computer');
        const computerButtons = computerButtonContainer.querySelectorAll('button');
        computerButtons.forEach(computerBtn => {
            computerBtn.style.backgroundColor = '#fff'
            computerBtn.style.boxShadow = 'none'
            computerBtn.style.textShadow = 'none'
        });

        // Change background color of the current computer selected button
        const computerSelectedButton = document.getElementById(`${computerSelection}Computer`);
        computerSelectedButton.style.backgroundColor = '#8000ff';
        computerSelectedButton.style.boxShadow = '0 0 20px #8000ff'
        computerSelectedButton.style.textShadow = '0 0 7px #8000ff, 0 0 10px #8000ff,0 0 21px #8000ff,0 0 42px #8000ff,0 0 82px #8000ff,0 0 92px #8000ff,0 0 102px #8000ff,0 0 151px #8000ff;'
        computerSelectedButton.style.transition = 'background-color 0.3s linear, box-shadow 0.3s linear, text-shadow 0.3s linear'

        if (playerScore === 5 || computerScore === 5) {
            [playerScore, computerScore] = endGameDisplay();

            const playAgainButton = document.getElementById('playAgainButton');
            playAgainButton.addEventListener('click', playAgain);
        }
    });
});
