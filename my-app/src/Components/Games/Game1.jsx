import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
const WinningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Game1 = () => {

const [board, setBoard] = useState(Array(9).fill(null));
const [isXNext, setIsXNext] = useState(true);
const [winner, setWinner] = useState(null);

useEffect(() => {
  if (!isXNext && !winner) {
    // Computer's turn
    const availableCells = board.reduce((acc, cell, index) => {
      if (!cell) acc.push(index);
      return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const computerMove = availableCells[randomIndex];

    const newBoard = [...board];
    newBoard[computerMove] = 'O';
    setBoard(newBoard);
    setIsXNext(true);
    checkWinner(newBoard);
  }
}, [board, isXNext, winner]);

const handleClick = (index) => {
  if (board[index] || winner || !isXNext) return;

  const newBoard = [...board];
  newBoard[index] = 'X';
  setBoard(newBoard);
  setIsXNext(false);
  checkWinner(newBoard);
};

const checkWinner = (board) => {
  WinningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      setWinner(board[a]);
    }
  });

  if (!winner && board.every((cell) => cell)) {
    // Check for draw
    setWinner('Draw');
  }
};

const handleReset = () => {
  setBoard(Array(9).fill(null));
  setIsXNext(true);
  setWinner(null);
};

return (
  <div className='h-screen bg-[#1F1F1F] w-full'>
  <Link to ='/home'><div className=' w-[50px] ml-auto pr-5 pt-5 bg-[#1F1F1F] h-[8%]'>
      <LuLogOut size = {40} style ={{color: '#ffffff'}}/>
  </div></Link>
  <div className="flex flex-col items-center justify-center w-full h-[92%] pt-[50px]">
    <h1 className="text-3xl font-bold mb-4 text-[#ffffff]">{winner ? (winner === 'Draw' ? 'It\'s a draw!' : `Winner: ${winner}`) : `Next Player: ${isXNext ? 'X' : 'O'}`}</h1>
    <div className="grid grid-cols-3 gap-4">
      {board.map((cell, index) => (
        <button
          key={index}
          className={classNames('w-20 h-20 text-4xl border border-gray-300', {
            'bg-gray-200': cell,
          })}
          onClick={() => handleClick(index)}
        >
          {cell}
        </button>
      ))}
    </div>
    <div className='flex items-center justify-between w-[272px] mt-4'>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleReset}>Reset</button>
      <Link to='/game2'><button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleReset}>Change Game</button></Link>
    </div>
  </div>
  </div>
  
);
};

export default Game1