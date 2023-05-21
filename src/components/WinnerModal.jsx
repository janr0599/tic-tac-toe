import Square from "./Square"

const WinnerModal = ({winner, resetGame}) => {    
    if (winner === null) return null

    const winnerText = winner === false ? "Empate" : "Ganó:"
    return (
        <section className='winner'>
            <div className="text">
                <h2 className='flex flex-col gap-3 font-bold'>
                    {winnerText}
                </h2>

                    <header className='win font-normal'>
                        {winner && <Square>{winner}</Square>}
                    </header>

                    <footer>
                        <button 
                            onClick={resetGame}
                            >Empezar de nuevo
                        </button>
                    </footer>
            </div>
        </section>
    )
}

export default WinnerModal