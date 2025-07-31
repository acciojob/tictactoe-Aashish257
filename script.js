//your JS code here. If required.

let player1 = "";
let player2 = "";
let currentPlayer = "X";
let gameActive = true;

const cells = document.querySelectorAll(".cell");
const board = Array(9).fill("");
const message = document.getElementById("message");

document.getElementById("submit").addEventListener("click", () => {
  const p1 = document.getElementById("player-1").value.trim();
  const p2 = document.getElementById("player-2").value.trim();

  if (p1 === "" || p2 === "") {
    alert("Please enter both player names.");
    return;
  }

  player1 = p1;
  player2 = p2;
  document.getElementById("input-section").classList.add("hidden");
  document.getElementById("game-section").classList.remove("hidden");

  message.innerText = `${player1}, you're up`;
});

cells.forEach(cell => {
  cell.addEventListener("click", () => {
    const id = parseInt(cell.id) - 1;

    if (board[id] !== "" || !gameActive) return;

    board[id] = currentPlayer;
    cell.innerText = currentPlayer;

    if (checkWin()) {
      const winner = currentPlayer === "X" ? player1 : player2;
      message.innerText = `${winner}, congratulations you won!`;
      gameActive = false;
    } else if (board.every(cell => cell !== "")) {
      message.innerText = `It's a draw!`;
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      const nextPlayer = currentPlayer === "X" ? player1 : player2;
      message.innerText = `${nextPlayer}, you're up`;
    }
  });
});

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];

  return winPatterns.some(pattern =>
    board[pattern[0]] === currentPlayer &&
    board[pattern[1]] === currentPlayer &&
    board[pattern[2]] === currentPlayer
  );
}
