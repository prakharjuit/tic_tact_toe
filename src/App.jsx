import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isBlueNext, setIsBlueNext] = useState(true);
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);

  useEffect(() => {
    const storedBlueScore = localStorage.getItem("blueScore");
    const storedRedScore = localStorage.getItem("redScore");
    if (storedBlueScore !== null) setBlueScore(Number(storedBlueScore));
    if (storedRedScore !== null) setRedScore(Number(storedRedScore));
  }, []);

  useEffect(() => {
    localStorage.setItem("blueScore", blueScore);
    localStorage.setItem("redScore", redScore);
  }, [blueScore, redScore]);

  const handleClick = (index) => {
    const newSquares = squares.slice();
    if (calculateWinner(squares) || squares[index]) return;
    newSquares[index] = isBlueNext ? "blue" : "red";
    setSquares(newSquares);
    setIsBlueNext(!isBlueNext);
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
    if (winner === "blue") {
      setBlueScore(blueScore + 1);
    } else {
      setRedScore(redScore + 1);
    }
    setSquares(Array(9).fill(null));
  } else {
    status = `Next player: ${isBlueNext ? "Blue" : "Red"}`;
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null));
  };

  return (
    <div className="game">
      <Scoreboard blueScore={blueScore} redScore={redScore} />
      <div className="game-board">
        <Board squares={squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={resetGame}>Reset Game</button>
      </div>
    </div>
  );
};

export default App;
