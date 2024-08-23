//your JS code here. If required.
document.getElementById('submit').addEventListener('click', () => {
  const player1 = document.getElementById('player-1').value;
  const player2 = document.getElementById('player-2').value;
  if (player1 && player2) {
    document.getElementById('board').style.display = 'block';
    document.querySelector('.message').innerText = `${player1}, you're up!`;
    startGame(player1, player2);
  }
});

function startGame(player1, player2) {
  const cells = document.querySelectorAll('.cell');
  let currentPlayer = player1;
  let currentMarker = 'X';
  const board = Array(9).fill(null);

  cells.forEach(cell => {
    cell.addEventListener('click', () => {
      const cellId = parseInt(cell.id) - 1;
      if (!board[cellId]) {
        board[cellId] = currentMarker;
        cell.innerText = currentMarker;
        if (checkWin(board, currentMarker)) {
          document.querySelector('.message').innerText = `${currentPlayer}, congratulations you won!`;
        } else if (board.every(cell => cell)) {
          document.querySelector('.message').innerText = 'It\'s a draw!';
        } else {
          currentPlayer = currentPlayer === player1 ? player2 : player1;
          currentMarker = currentMarker === 'X' ? 'O' : 'X';
          document.querySelector('.message').innerText = `${currentPlayer}, you're up!`;
        }
      }
    });
  });
}

function checkWin(board, marker) {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winConditions.some(condition => 
    condition.every(index => board[index] === marker)
  );
}
