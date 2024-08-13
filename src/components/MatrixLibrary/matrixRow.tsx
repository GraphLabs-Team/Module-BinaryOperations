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


export function Row(props: RowProps){
    return (
        <div id={"matrix-" + props.matrixId + "-row-" + props.id.toString()} className="row">
            {props.vector.map((el, col_i) => {
                if (props.has_index && col_i === 0){
                    return <LabelCell 
                        id={col_i} 
                        rowId={props.id} 
                        matrixId={props.matrixId} 
                        value={el}
                        clickHandler={props.clickHandler}/>
                }
                else{
                    return <Cell 
                        id={col_i} 
                        rowId={props.id} 
                        matrixId={props.matrixId} 
                        value={el}
                        clickHandler={props.clickHandler}/>
                } 
            })}
        </div>
    )
}

type LabelRowProps = {
    id: number,
    matrixId: string,
    vector: string[],
    clickHandler: (cellId: number, rowId: number) => void
}

export function LabelRow(props: LabelRowProps){
    return (
        <div id={"matrix-" + props.matrixId + "-row-" + props.id.toString()} className="row">
            {props.vector.map((el, col_i) => {
                return <LabelCell 
                    id={col_i} 
                    rowId={props.id} 
                    matrixId={props.matrixId} 
                    value={el}
                    clickHandler={props.clickHandler}/>
            })}
        </div>
    )
}