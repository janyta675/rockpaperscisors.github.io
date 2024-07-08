document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.querySelector('.balance');
    const amountInput = document.getElementById('amount');
    const resultElement = document.querySelector('.result');
    const amountError = document.querySelector('.amounterrors');
    const selectionErrors = document.querySelector('.selectionerrors');
    const placeBetButton = document.querySelector('.placebet');

    // object images
    const rockimg = document.getElementById('rock');
    const paperimg = document.getElementById('paper');
    const scissorimg = document.getElementById('scissors');
    const resultImage = document.querySelector('.result-image');

    let balance = 5000; // initial balance
    let userSelection = '';

    // Update balance display
    function updateBalance() {
        balanceElement.textContent = `Balance: Ksh${balance}`;
    }

    // Function to get computer's choice
    function getComputerChoice() {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    // Function to determine winner
    function determineWinner(userChoice, computerChoice) {
        if (userChoice === computerChoice) {
            return 'It\'s a tie!';
        }
        if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'You win!';
        }
        return 'You lose!';
    }

    // Event listeners for user selection
    rockimg.addEventListener('click', function () {
        userSelection = 'rock';
        selectionErrors.textContent = '';
    });

    paperimg.addEventListener('click', function () {
        userSelection = 'paper';
        selectionErrors.textContent = '';
    });

    scissorimg.addEventListener('click', function () {
        userSelection = 'scissors';
        selectionErrors.textContent = '';
    });

    // Event listener for placing bet
    placeBetButton.addEventListener('click', function () {
        const betAmount = parseInt(amountInput.value);

        if (!userSelection) {
            selectionErrors.textContent = 'Please select Rock, Paper, or Scissors.';
            return;
        }

        if (isNaN(betAmount) || betAmount <= 0) {
            amountError.textContent = 'Please enter a valid amount.';
            return;
        }

        if (betAmount > balance) {
            amountError.textContent = 'Insufficient balance.';
            return;
        }

        // Get computer's choice
        const computerChoice = getComputerChoice();

        // Determine winner
        const result = determineWinner(userSelection, computerChoice);

        // Update balance
        if (result === 'You win!') {
            balance += betAmount*1.5;
        } else if (result === 'You lose!') {
            balance -= betAmount;
        }

        // Update UI
        resultElement.textContent = result;
        resultImage.src = `./Assets/img/${computerChoice}.png`;
        updateBalance();
    });

    // Initialize balance display
    updateBalance();
});
