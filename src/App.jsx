import { useState } from 'react'
import './index.css'
import confetti from 'canvas-confetti'
import Square from './components/Square'
import { TURNS } from './constants'
import {checkWinnerFrom, checkEndGame} from './Logic/board'
import WinnerModal from './components/WinnerModal'
import Board from './components/Board'

function App() {

	const [board, setBoard]= useState( () => {
		const boardFromStorage = window.localStorage.getItem('board')
		return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
	})

	const [turn, setTurn] = useState ( () => {
		const turnFromStorage = window.localStorage.getItem('turn')
		return turnFromStorage ?? TURNS.X
	})

	const [winner, setWinner] = useState(null) // null es no hay ganador y false es empate


	const resetGame = () => {
		setBoard((Array(9).fill(null)));
		setTurn(TURNS.X)
		setWinner(null)

		window.localStorage.removeItem('board')
		window.localStorage.removeItem('turn')
	}

	const updateBoard = (index) => {

		// No actualizamos la posicion si ya tiene algo
		if(board[index] || winner ) return

		//Actualizamos el tablero
		const newBoard = [...board]
		newBoard[index] = turn
		setBoard(newBoard)

		// Cambiamos el turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
		setTurn(newTurn)
		// Guardar aqui partida
		window.localStorage.setItem('board', JSON.stringify(newBoard))
		window.localStorage.setItem('turn', newTurn)
		//Revisar si hay ganador
		const newWinner = checkWinnerFrom(newBoard)
		if(newWinner) {
			confetti()
			setWinner(newWinner)
		} else if (checkEndGame(newBoard)){
			setWinner(false) // empate
		}
	}
  
	return (
		<main className="board">
			<h1 className="text-2xl font-bold">TIC TAC TOE</h1>
			<button onClick={resetGame}>Resetear Tablero</button>
			<Board board={board} updateBoard={updateBoard}/>

			<section className="turn">
				<Square isSelected={turn === TURNS.X}>
					{TURNS.X}
				</Square>
				<Square isSelected={turn === TURNS.O}>
					{TURNS.O}
				</Square>
			</section>

			<WinnerModal resetGame={resetGame} winner={winner}/>

		</main>
	)
}

export default App
