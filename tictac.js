document.addEventListener("DOMContentLoaded", () => {
  const board = Array(9).fill(null);
  let isXNext = true;
  let gameActive = false; 
  const squares = document.querySelectorAll(".square");
  const statusDisplay = document.getElementById("status");
  const resetButton = document.getElementById("reset");
  const startButton = document.getElementById("start");
  const stopButton = document.getElementById("stop");

  const updateStatus = () => {
    const winner = calculateWinner(board);
    if (winner) {
      statusDisplay.textContent = `Winner: ${winner}`;
      gameActive = false;
    } else if (board.every((square) => square)) {
      statusDisplay.textContent = "Draw!";
      gameActive = false;
    } else {
      statusDisplay.textContent = `Next player: ${isXNext ? "X" : "O"}`;
    }
  };

  const handleSquareClick = (index) => {
    if (!gameActive || board[index] || calculateWinner(board)) return;

    board[index] = isXNext ? "X" : "O";
    squares[index].textContent = board[index];
    isXNext = !isXNext;
    updateStatus();
  };

  const resetGame = () => {
    board.fill(null);
    squares.forEach((square) => (square.textContent = ""));
    isXNext = true;
    gameActive = false;
    statusDisplay.textContent = "Press Start to play";
  };

  const startGame = () => {
    if (!gameActive) {
      gameActive = true;
      statusDisplay.textContent = `Next player: ${isXNext ? "X" : "O"}`;
    }
  };

  const stopGame = () => {
    gameActive = false;
    statusDisplay.textContent = "Game stopped. Press Start to continue.";
  };

  squares.forEach((square, index) => {
    square.addEventListener("click", () => handleSquareClick(index));
  });

  resetButton.addEventListener("click", resetGame);
  startButton.addEventListener("click", startGame);
  stopButton.addEventListener("click", stopGame);

  const calculateWinner = (board) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], 
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], 
      [0, 4, 8],
      [2, 4, 6], 
    ];
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };
});
