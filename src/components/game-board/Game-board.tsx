import {ReactElement, useState} from "react";
import {Game} from "../game/Game.tsx";
import {History} from "../history/History.tsx";

export interface PreviousGameState {
    boardState: string[],
    numberOfPlays: number
}

export interface LastPlay {
    board: string[],
    xTurn: boolean
}

export const GameBoard = (): ReactElement => {
    const [history, setHistory] = useState<PreviousGameState[]>([]);
    const [lastPlay, setLastPlay] = useState<LastPlay>({board: [], xTurn: true});
    const [xIsNext, setXisNext] = useState<boolean>(false);

    const getGameState = (squares: string[], xIsNext: boolean): void => {
        const currentPlay: number = squares.filter(element => element !== null).length;
        setHistory([...history, {boardState: squares, numberOfPlays: currentPlay}]);
        setXisNext(xIsNext);
    };

    const resetHistory = (): void => setHistory([]);

    const undo = (): void => {
        if (history.length > 0) {
            setXisNext(!xIsNext);
            setLastPlay({board: history[history.length - 1].boardState, xTurn: xIsNext});
            setHistory(history.slice(0, history.length - 1));
            return;
        }

        setLastPlay({board: Array(9).fill(null), xTurn: true});
    }

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <Game sendGameState={getGameState} resetHistory={resetHistory} lastPlay={lastPlay}/>
                </div>

                <div className="col-6">
                    <History history={history} undo={undo}/>
                </div>
            </div>
        </>
    );
};
