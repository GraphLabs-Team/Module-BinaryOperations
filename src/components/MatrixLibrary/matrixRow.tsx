import React from "react";
import {Cell, LabelCell} from "./matrixCell";
import "./matrixRow.css"


type RowProps = {
    id: number,
    matrixId: string,
    vector: string[],
    has_index: boolean,
    clickHandler: (cellId: number, rowId: number) => void
}


export function Row(props: RowProps) {
    return (
        <div id={"matrix-" + props.matrixId + "-row-" + props.id.toString()} className="row">
            {props.vector.map((el, col_i) => {
                const isDiagonal = col_i === props.id + 1; // Проверка на диагональ
                const isFirstColumn = col_i === 0; // Проверка на первый столбец

                const shouldHighlight = isDiagonal || isFirstColumn;

                if (props.has_index && col_i === 0) {
                    return (
                        <LabelCell 
                            key={col_i}
                            id={col_i} 
                            rowId={props.id} 
                            matrixId={props.matrixId} 
                            value={el}
                            clickHandler={props.clickHandler}
                            className={shouldHighlight ? "highlighted" : ""}
                        />
                    );
                } else {
                    return (
                        <Cell 
                            key={col_i}
                            id={col_i} 
                            rowId={props.id} 
                            matrixId={props.matrixId} 
                            value={el}
                            clickHandler={props.clickHandler}
                            className={shouldHighlight ? "highlighted" : ""}
                        />
                    );
                } 
            })}
        </div>
    );
}



type LabelRowProps = {
    id: number,
    matrixId: string,
    vector: string[],
    clickHandler: (cellId: number, rowId: number) => void
}

export function LabelRow(props: LabelRowProps) {
    return (
        <div id={"matrix-" + props.matrixId + "-row-" + props.id.toString()} className="row">
            {props.vector.map((el, col_i) => {
                // const isFirstRow = 1; // Проверка на первую строку
                // const isFirstColumn = 1; // Проверка на первый столбец

                const shouldHighlight = 1;

                return (
                    <LabelCell 
                        key={col_i}
                        id={col_i} 
                        rowId={props.id} 
                        matrixId={props.matrixId} 
                        value={el}
                        clickHandler={props.clickHandler}
                        className={shouldHighlight ? "highlighted" : ""}
                    />
                );
            })}
        </div>
    );
}
