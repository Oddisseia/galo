import {ReactElement, useState} from "react";
import {Game} from "../game/Game.tsx";
import {History} from "../history/History.tsx";

export interface PreviousGameState {
    boardState: string[],
    numberOfPlays: number
}

export const GameBoard = (): ReactElement => {
    const [history, setHistory] = useState<PreviousGameState[]>([]);
    const getGameState = (squares: string[], xIsNext: boolean): void => {
        console.log(xIsNext);
        const currentPlay: number = squares.filter(element => element !== null).length;
        setHistory([...history, {boardState: squares, numberOfPlays: currentPlay}]);
    };

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <Game callback={getGameState}/>
                </div>

                <div className="col-6">
                    <History history={history}/>
                </div>
            </div>
        </>
    );
};
