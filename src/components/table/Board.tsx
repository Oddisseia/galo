import {Square} from "../square/Square.tsx";
import {ReactElement, useState} from "react";
import "./Board.scss";

export const Board = (): ReactElement => {
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [squares, setSquares] = useState<string[]>(Array(9).fill(null));

    const handleClick = (index: number): void => {
        if (squares[index] || calculateWinner(squares)) { return; }

        const squaresClone: string[] = squares.slice();
        squaresClone[index] = xIsNext ? 'X' : 'O';

        setSquares(squaresClone);
        setXIsNext(!xIsNext);
    };
    const status = (): string => {
        const winner: string | null = calculateWinner(squares);
        if (winner) {
            return  "Winner: " + winner;
        }
            return  "Next player: " + (xIsNext ? "X" : "O");
    }

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
