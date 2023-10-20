import {MouseEventHandler, ReactElement, useEffect, useState} from "react";
import {PreviousGameState} from "../game-board/Game-board.tsx";
import './History.scss';

interface HistoryProps {
    history: PreviousGameState[],
    undo: MouseEventHandler<HTMLButtonElement>
}

export const History = ({history, undo}: HistoryProps): ReactElement => {
    const [lastPlay, setLastPlay] = useState<string[]>([]);

    useEffect(() => {
        if (history.length > 0) {
            setLastPlay(history[history.length - 1].boardState);
            return;
        }
        setLastPlay([]);
    }, [history]);

    return (
        <>
            <div className="history-container">
                <button onClick={undo}>UNDO</button>
                <div className="previous-play">
                    <span className="title">Previous</span>
                    <div className="row border-bottom margin-left">
                        <div className="square">{lastPlay[0]}</div>
                        <div className="square middle">{lastPlay[1]}</div>
                        <div className="square">{lastPlay[2]}</div>
                    </div>
                    <div className="row border-bottom margin-left">
                        <div className="square">{lastPlay[3]}</div>
                        <div className="square middle">{lastPlay[4]}</div>
                        <div className="square">{lastPlay[5]}</div>
                    </div>
                    <div className="row margin-left">
                        <div className="square">{lastPlay[6]}</div>
                        <div className="square middle">{lastPlay[7]}</div>
                        <div className="square">{lastPlay[8]}</div>
                    </div>
                </div>
            </div>
        </>
    );
};
