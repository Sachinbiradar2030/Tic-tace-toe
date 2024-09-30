import { useState } from 'react';
import Card from '../Card/Card';
import 'react-toastify/dist/ReactToastify.css';
import './grid.css';
import { ToastContainer, toast } from 'react-toastify';

function isWinner(board, symbol) {
  if (board[0] === board[1] && board[1] === board[2] && board[2] === symbol) return symbol;
  if (board[3] === board[4] && board[4] === board[5] && board[5] === symbol) return symbol;
  if (board[6] === board[7] && board[7] === board[8] && board[8] === symbol) return symbol;

  if (board[0] === board[3] && board[3] === board[6] && board[6] === symbol) return symbol;
  if (board[1] === board[4] && board[4] === board[7] && board[7] === symbol) return symbol;
  if (board[2] === board[5] && board[5] === board[8] && board[8] === symbol) return symbol;

  if (board[0] === board[4] && board[4] === board[8] && board[8] === symbol) return symbol;
  if (board[2] === board[4] && board[4] === board[6] && board[6] === symbol) return symbol;
  return null;
}

function isDraw(board) {
  return board.every(cell => cell !== ""); // If no empty cells, it's a draw
}

const Grid = ({ numberOfCards }) => {
  const [turn, setTurn] = useState(true);
  const [board, settBoard] = useState(Array(numberOfCards).fill(""));
  const [winner, setWinner] = useState(null);
  const [isDrawState, setIsDrawState] = useState(false); // State to track draw condition

  function play(index) {
    if (winner || board[index]) return; // Prevent playing after game ends or on an already filled cell

    board[index] = turn ? "o" : "x";
    const win = isWinner(board, turn ? "o" : "x");

    if (win) {
      setWinner(win);
      toast.success(`Congratulations! ${win} won the game.`);
    } else if (isDraw(board)) {
      setIsDrawState(true);
      toast.info("It's a draw!");
    }

    settBoard([...board]);
    setTurn(!turn);
  }

  function reset() {
    settBoard(Array(numberOfCards).fill(""));
    setWinner(null);
    setIsDrawState(false);
    setTurn(true);
  }

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="grid-wrapper">
        {(winner || isDrawState) && (
          <>
            {winner && <h1 className="turn-highlight">Winner is {winner}</h1>}
            {isDrawState && <h1 className="turn-highlight">It's a draw!</h1>}
            <button className="reset" onClick={reset}>Reset game</button>
          </>
        )}

        {!winner && !isDrawState && (
          <h1 className="trun-highlight">Current Turn: {turn ? 'o' : 'x'}</h1>
        )}

        <div className="grid">
          {board.map((value, idx) => {
            return <Card gameEnd={winner || isDrawState} onPlay={play} player={value} key={idx} index={idx} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Grid;
