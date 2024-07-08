document.addEventListener('DOMContentLoaded', function () {
    const balanceElement = document.querySelector('.balance');
    const amountInput = document.getElementById('amount');
    const resultElement = document.querySelector('.result');
    const amountError = document.querySelector('.amounterrors');
    const selectionErrors = document.querySelector('.selectionerrors');
    const placeBetButton = document.querySelector('.placebet');

    // object images
    const rockImg = document.getElementById('rock');
    const paperImg = document.getElementById('paper');
    const scissorImg = document.getElementById('scissors');
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
            (userChoice === 'rock' && computerChoice === 'scissor') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissor' && computerChoice === 'paper')
        ) {
            return 'You win!';
        }
        return 'You lose!';
    }

    // Function to remove selected class from all images
    function clearSelection() {
        rockImg.classList.remove('selected');
        paperImg.classList.remove('selected');
        scissorImg.classList.remove('selected');
    }

    // Event listeners for user selection
    rockImg.addEventListener('click', function () {
        clearSelection();
        rockImg.classList.add('selected');
        userSelection = 'rock';
        selectionErrors.textContent = '';
    });

    paperImg.addEventListener('click', function () {
        clearSelection();
        paperImg.classList.add('selected');
        userSelection = 'paper';
        selectionErrors.textContent = '';
    });

    scissorImg.addEventListener('click', function () {
        clearSelection();
        scissorImg.classList.add('selected');
        userSelection = 'scissors';
        selectionErrors.textContent = '';
    });

    // Function to animate the result
    function animateResult(computerChoice, callback) {
        const choices = ['rock', 'paper', 'scissor'];
        let index = 0;
        const animationDuration = 2000; // Duration of the animation in ms
        const intervalTime = 100; // Time between image changes in ms

        const interval = setInterval(() => {
            resultImage.src = `./Assets/img/${choices[index]}.png`;
            index = (index + 1) % choices.length;
        }, intervalTime);

        setTimeout(() => {
            clearInterval(interval);
            resultImage.src = `./Assets/img/${computerChoice}.png`;
            callback();
        }, animationDuration);
    }

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

        // Animate the result
        animateResult(computerChoice, () => {
            // Determine winner
            const result = determineWinner(userSelection, computerChoice);

            // Update balance
            if (result === 'You win!' ) {
                balance += betAmount;
            } else if (result === 'You lose!') {
                balance -= betAmount;
            }else {
                balance -= betAmount;
            }

            // Update UI
            resultElement.textContent = result;
            updateBalance();
        });
    });

    // Initialize balance display
    updateBalance();
});
