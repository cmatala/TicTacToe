// Factory function to create player objects
const Player = (name, marker) => {
    return { name, marker };
};

// Gameboard module to manage the game board
const Gameboard = (() => {
    // Grab the restart button
    const restartButton = document.querySelector("#btn");

    // Grab all the squares 
    const squares = document.querySelectorAll('td');

    // Function to clear all the squares 
    function clearBoard() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = '';
        }
    }

    // Add event listener to the restart button
    restartButton.addEventListener('click', clearBoard);

    // Variables to keep track of players and current player
    let currentPlayer;
    let player1;
    let player2;

    // Function to start the game
    function startGame() {
        const player1Name = document.getElementById('player1').value;
        const player2Name = document.getElementById('player2').value;

        // Create players
        player1 = Player(player1Name, 'X');
        player2 = Player(player2Name, 'O');
        currentPlayer = player1;

        // Add click event listener to each square
        squares.forEach(square => {
            square.addEventListener('click', () => {
                if (square.textContent === '') {
                    square.textContent = currentPlayer.marker;
                    // Check for winner
                    if (checkWinner()) {
                        displayResult(`${currentPlayer.name} wins!`);
                    } else if (checkTie()) {
                        displayResult("It's a tie!");
                    } else {
                        // Switch players
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                    }
                }
            });
        });
    }

    // Function to check for a winner
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (
                squares[a].textContent !== '' &&
                squares[a].textContent === squares[b].textContent &&
                squares[a].textContent === squares[c].textContent
            ) {
                return true;
            }
        }
        return false;
    }

    // Function to check for a tie
    function checkTie() {
        for (let square of squares) {
            if (square.textContent === '') {
                return false; // There are still empty squares, game continues
            }
        }
        return true; // All squares are filled, it's a tie
    }

    // Function to display the result of the game
    function displayResult(result) {
        alert(result);
        // Ask to replay
        const replay = confirm('Do you want to play again?');
        if (replay) {
            clearBoard();
            startGame();
        }
    }

    // Start the game when the module is loaded
    startGame();

})();
