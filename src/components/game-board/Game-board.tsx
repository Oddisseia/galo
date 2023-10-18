import {ReactElement} from "react";
import {Game} from "../game/Game.tsx";
import {History} from "../history/History.tsx";

export const GameBoard = (): ReactElement => {
    return (
        <>
            <div className="row">
                <div className="col-6">
                    <Game/>
                </div>

                <div className="col-6">
                    <History/>
                </div>
            </div>
        </>
    );
};
