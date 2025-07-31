const submitBtn = document.getElementById("submit");
const player1Input = document.getElementById("player1");
const player2Input = document.getElementById("player2");
const messageDiv = document.getElementById("message");
const boardDiv = document.getElementById("board");

let player1 = "", player2 = "";
let currentPlayer = "";
let gameBoard = Array(9).fill("");
let gameOver = false;

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

submitBtn.addEventListener("click", () => {
  player1 = player1Input.value.trim();
  player2 = player2Input.value.trim();

  if (!player1 || !player2) {
    alert("Please enter names for both players.");
    return;
  }

  document.getElementById("form").style.display = "none";
  document.getElementById("game").style.display = "block";

  currentPlayer = player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;

  createBoard();
});

function createBoard() {
  boardDiv.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.id = (i + 1).toString(); // id 1 to 9
    cell.addEventListener("click", () => handleMove(i, cell));
    boardDiv.appendChild(cell);
  }
}

function handleMove(index, cell) {
  if (gameBoard[index] || gameOver) return;

  const mark = currentPlayer === player1 ? "x" : "o";
  gameBoard[index] = mark;
  cell.textContent = mark;

  if (checkWinner(mark)) {
    messageDiv.textContent = `${currentPlayer} congratulations you won!`;
    gameOver = true;
    return;
  }

  if (!gameBoard.includes("")) {
    messageDiv.textContent = "It's a draw!";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === player1 ? player2 : player1;
  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWinner(mark) {
  return winCombos.some(combo => 
    combo.every(index => gameBoard[index] === mark)
  );
}
