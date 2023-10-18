import {ReactElement} from "react";
import {PreviousGameState} from "../game-board/Game-board.tsx";

interface HistoryProps {history: PreviousGameState[]}

export const History = ({history}: HistoryProps): ReactElement => {
    return (
        <>
            {
                history.map((item: PreviousGameState) => (
                        <div key={item.numberOfPlays}>{item.numberOfPlays}</div>
                    )
                )
            }

        </>
    );
};
