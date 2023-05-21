import { WINNER_COMBOS } from "../constants"

const checkWinnerFrom = (boardToCheck) => {
    //Revisamos las combinaciones ganadoras para revisar si x u o ganó
    for (const combo of WINNER_COMBOS) {
        const [a,b,c] = combo
        if(
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[a] === boardToCheck[c]
        ) {
            return boardToCheck[a]
        }				
    }
    // Si no hay ganador
    return null
}

const checkEndGame = (newBoard) => {
    // Revisamos si hay un empatw
    // Si no hay mas espacios vacios en el tablero
    return newBoard.every((Square) => Square !== null)
}

export {
    checkWinnerFrom,
    checkEndGame
}