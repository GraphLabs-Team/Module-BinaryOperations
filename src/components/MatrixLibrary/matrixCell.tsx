import React from "react";
import "./matrixCell.css"


type CellProps = {
    id: number;
    rowId: number;
    matrixId: string;
    value: string;
    clickHandler: (cellId: number, rowId: number) => void;
    className?: string;  // Добавляем необязательное свойство className
}

export function Cell(props: CellProps) {
    let cell_id = "matrix-" + props.matrixId + "-row-" + props.rowId.toString() + "-cell-" + props.id.toString();
    let button_id = "matrix-" + props.matrixId + "-row-" + props.rowId.toString() + "-cell-" + props.id.toString() + "-button";
    return (
        <div id={cell_id} className={`cell ${props.className ?? ""}`}>
            <button 
                id={button_id} 
                className="cell-button" 
                onClick={() => props.clickHandler(props.id, props.rowId)}>{props.value}</button>
        </div>
    );
}

type LabelCellProps = {
    id: number;
    rowId: number;
    matrixId: string;
    value: string;
    clickHandler: (cellId: number, rowId: number) => void;
    className?: string;  // Добавляем необязательное свойство className
}

export function LabelCell(props: LabelCellProps) {
    let cell_id = "matrix-" + props.matrixId + "-row-" + props.rowId.toString() + "-cell-" + props.id.toString();
    let button_id = "matrix-" + props.matrixId + "-row-" + props.rowId.toString() + "-cell-" + props.id.toString() + "-button";
    return (
        <div id={cell_id} className={`cell ${props.className ?? ""}`}>
            <button 
                id={button_id} 
                className="cell-button" 
                disabled={true}
                onClick={() => props.clickHandler(props.id, props.rowId)}>{props.value}</button>
        </div>
    );
}
