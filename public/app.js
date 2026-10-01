const { useState } = React;

function TicTacToe() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const winnerInfo = calculateWinner(board);
    const winner = winnerInfo ? winnerInfo.winner : null;
    const winningLine = winnerInfo ? winnerInfo.line : [];

    const handleClick = (index) => {
        if (board[index] || winner) return;

        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    const isDraw = !winner && board.every((square) => square !== null);

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isDraw) {
        status = "It's a Draw!";
    } else {
        status = `Next Player: ${isXNext ? 'X' : 'O'}`;
    }

    return (
        <div className="flex flex-col items-center p-6 bg-slate-800 rounded-2xl shadow-2xl border border-slate-700">
            <h1 className="text-4xl font-extrabold mb-6 text-indigo-400 tracking-wider">
                TIC TAC TOE
            </h1>

            <div className={`text-xl font-semibold mb-6 px-4 py-2 rounded-lg ${
                winner ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 
                isDraw ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 
                'bg-slate-700 text-slate-200'
            }`}>
                {status}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6 bg-slate-900 p-3 rounded-xl border border-slate-700">
                {board.map((value, idx) => {
                    const isWinningSquare = winningLine.includes(idx);
                    return (
                        <button
                            key={idx}
                            onClick={() => handleClick(idx)}
                            className={`w-20 h-20 text-3xl font-black rounded-lg transition-all duration-200 flex items-center justify-center ${
                                isWinningSquare 
                                    ? 'bg-emerald-500 text-white animate-pulse' 
                                    : value 
                                        ? 'bg-slate-800 border border-slate-600' 
                                        : 'bg-slate-800 hover:bg-slate-700 border border-slate-700'
                            } ${
                                value === 'X' ? 'text-indigo-400' : 'text-rose-400'
                            }`}
                        >
                            {value}
                        </button>
                    );
                })}
            </div>

            <button
                onClick={resetGame}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
            >
                Reset Game
            </button>
        </div>
    );
}

// Winning combinations check karne ke liye helper function
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}

// DOM Rendering
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<TicTacToe />);