import React, { useState } from "react";
import "./TicTacToe.css";

// PUBLIC_INTERFACE
function TicTacToe() {
  /**
   * Renders and manages the two-player Tic Tac Toe game,
   * and displays status, winner/draw message, and restart button.
   * Responsive and styled per project theme.
   */
  const emptyBoard = Array(9).fill(null);
  const [board, setBoard] = useState(emptyBoard);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);

  // Check for winner after every move
  React.useEffect(() => {
    const win = calculateWinner(board);
    if (win) {
      setWinner(win);
      setGameOver(true);
    } else if (board.every((cell) => cell !== null)) {
      setWinner("draw");
      setGameOver(true);
    }
  }, [board]);

  // PUBLIC_INTERFACE
  function handleClick(index) {
    if (board[index] !== null || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function restartGame() {
    setBoard(emptyBoard);
    setXIsNext(true);
    setGameOver(false);
    setWinner(null);
  }

  const getStatusMessage = () => {
    if (winner === "draw") return "It's a draw!";
    if (winner) return `Winner: ${winner}`;
    return `Next turn: ${xIsNext ? "X" : "O"}`;
  };

  return (
    <div className="ttt-container">
      <h1 className="ttt-header">Tic Tac Toe</h1>
      <div className="ttt-status" data-testid="ttt-status">{getStatusMessage()}</div>
      <div className="ttt-board" role="grid">
        {board.map((cell, idx) => (
          <button
            key={idx}
            className={`ttt-cell ${cell === "X" ? "ttt-x" : cell === "O" ? "ttt-o" : ""}`}
            onClick={() => handleClick(idx)}
            disabled={!!cell || gameOver}
            aria-label={`cell ${idx % 3 + 1}, row ${Math.floor(idx / 3) + 1}`}
            tabIndex={0}
            data-testid={`ttt-cell-${idx}`}
          >
            {cell}
          </button>
        ))}
      </div>
      <button className="ttt-restart-btn" onClick={restartGame} data-testid="ttt-restart-btn">
        Restart Game
      </button>
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(board) {
  /**
   * Determines the winner of the given Tic Tac Toe board, if any.
   * Returns "X", "O", or null.
   */
  const lines = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diags
  ];
  for (let [a,b,c] of lines) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default TicTacToe;

