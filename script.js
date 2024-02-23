function getComputerChoice(){
    choice = ['rock', 'paper', 'scissors'];
    const random_index = Math.floor(Math.random() * 3);

    return choice[random_index];
}

let playerScore = 0;
let computerScore = 0;

function playRound(playerSelection, computerSelection){
    if (playerSelection === computerSelection) {
        return "Tie";
    } else if (
        (playerSelection === 'paper' && computerSelection === 'rock') ||
        (playerSelection === 'rock' && computerSelection === 'scissors') ||
        (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
        playerScore += 1;
        return "You Win a Round!";
    } else {
        computerScore += 1;
        return "You Lose a Round!";
    }    
} 

function playGame(){
    for (let i = 0; i < 5; i++){
        const playerSelection = prompt("Rock, Paper or Scissors? Enter something: ").toLowerCase();
        const computerSelection = getComputerChoice();
        console.log(playRound(playerSelection, computerSelection));
    }

    if (playerScore > computerScore){
        console.log("You Win a Match");
    } else if(playerScore < computerScore){
        console.log("You Lose a Match");
    } else{
        console.log("Tie on a Match");
    }
}

playGame()
