import './Square.scss';
import {MouseEventHandler, ReactElement} from "react";

interface SquareProps {
    value: string,
    onSquareClick: MouseEventHandler<HTMLButtonElement>
}

export const Square = ({value, onSquareClick}: SquareProps): ReactElement => {
    return <button className="square" onClick={onSquareClick}>{value}</button>
};
