import {Square} from "../square/Square.tsx";
import {ReactElement, useEffect, useState} from "react";
import "./Game.scss";
import {LastPlay} from "../game-board/Game-board.tsx";

interface GameProps {
    sendGameState: (squares: string[], xIsNext: boolean) => void,
    resetHistory: () => void,
    lastPlay: LastPlay
}

export const Game = ({
                         sendGameState,
                         resetHistory,
                         lastPlay
                     }: GameProps): ReactElement => {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [squares, setSquares] = useState<string[]>(Array(9).fill(null));

    const handleClick = (index: number): void => {
        if (squares[index] || calculateWinner(squares)) { return; }

        sendGameState([...squares], xIsNext);

        const squaresClone: string[] = [...squares];
        squaresClone[index] = xIsNext ? 'X' : 'O';

        setSquares(squaresClone);
        setXIsNext(!xIsNext);
    };

    const status = (): string => {
        const winner: string | null = calculateWinner(squares);
        if (winner) {
            return "Winner: " + winner;
        }
        return "Next player: " + (xIsNext ? "X" : "O");
    }

    const restartGame = (): void => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        resetHistory();
    };

    useEffect(() => {
        setSquares([...lastPlay.board]);
        setXIsNext(lastPlay.xTurn);
    }, [lastPlay]);

    return (
        <>
            <div className="status">{status()}</div>

            <div className="row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>

            <button className="restart" onClick={() => restartGame()}>RESTART</button>
        </>
    );
};

const calculateWinner = (squares: string[]): string | null => {
    const lines: number[][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const line of lines) {
        const [a, b, c]: number[] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }

    return null;
};
