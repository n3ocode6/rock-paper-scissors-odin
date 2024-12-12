let userScore = 0;
let compScore = 0;
let rounds = 0;

// Freezing the choices object
const Choices = Object.freeze({
    ROCK: 0,
    PAPER: 1,
    SCISSORS: 2
});

// Mapping choices to human-readable names
const choicesList = [Choices.ROCK, Choices.PAPER, Choices.SCISSORS];

// Game logic to determine the winner
function check(userInp, compInp) {
    // Tie condition
    if (userInp === compInp) {
        rounds += 1;
        updateScoreBoard();
        return "It's a tie!";
    }

    // Win conditions
    if (
        (userInp === Choices.ROCK && compInp === Choices.SCISSORS) ||
        (userInp === Choices.PAPER && compInp === Choices.ROCK) ||
        (userInp === Choices.SCISSORS && compInp === Choices.PAPER)
    ) {
        userScore += 1;
        rounds += 1;
        updateScoreBoard();
        return "You win!";
    } else {
        // Lose conditions
        compScore += 1;
        rounds += 1;
        updateScoreBoard();
        return "You lose!";
    }
}

// Update the score and rounds on the page
function updateScoreBoard() {
    document.getElementById('user-score').textContent = userScore;
    document.getElementById('comp-score').textContent = compScore;
    document.getElementById('round-count').textContent = rounds;
}

// Randomly get the computer's choice
function getBotChoice() {
    const randomChoice = Math.floor(Math.random() * 3);
    return choicesList[randomChoice];
}

// Handle user's choice based on button clicked
function getHumanChoice(e) {
    switch (e.target.name) {
        case "0":
            return Choices.ROCK;
        case "1":
            return Choices.PAPER;
        case "2":
            return Choices.SCISSORS;
        default:
            return null;
    }
}

// Display result
function displayResult(result) {
    document.getElementById('result').textContent = result;
}

// Add event listeners for each button
const buttons = document.querySelectorAll('.choice');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const humanSelection = getHumanChoice(e); // Get the user's choice
        const computerSelection = getBotChoice(); // Get the computer's choice
        const result = check(humanSelection, computerSelection); // Check who won
        displayResult(result); // Display the result
    });
});
