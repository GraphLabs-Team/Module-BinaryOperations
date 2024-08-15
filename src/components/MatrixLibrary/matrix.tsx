import assert from "assert";
import React, { useEffect, useMemo, useState } from "react";
import "./matrix.css";
import { LabelRow, Row } from "./matrixRow";
// import { Button, Modal, ModalBody } from "reactstrap";

type BaseType = {
  id: string;
  is_mutable: boolean;
  col_names?: string[];
  row_names?: string[];
  disableCellClick?: boolean;
};

type DataProps =
  | {
      data_array: string[][];
      shape?: never;
      number_init?: never;
    }
  | {
      data_array?: never;
      shape: { rows: number; cols: number };
      number_init: string;
    };

type MatrixType = BaseType & DataProps;

export default function Matrix(props: MatrixType) {
  const [dataArray, setDataArray] = useState<string[][]>();
  const [colNames, setColNames] = useState<string[]>([]);
  const [rowNames, setRowNames] = useState<string[]>([]);
  const [cellData, setCellData] = useState<{
    cell_id: number;
    row_id: number;
  }>();
  //let cellData = {cell_id: NaN, row_id: NaN}

  // Data array creation
  if (props.data_array && !dataArray) {
    // Проверка размерности данных
    let base_lenght = 0;
    for (let i = 0; i < props.data_array.length; i++) {
      if (i === 0) {
        base_lenght = props.data_array[i].length;
      } else {
        assert(
          base_lenght === props.data_array[i].length,
          "Размерность данных не совпадает"
        );
      }
    }
    setDataArray(props.data_array);
  }

  // Shape + number creation
  if (props.shape && !dataArray) {
    assert(props.shape.rows > 0, "Количество строк меньше 1!");
    assert(props.shape.cols > 0, "Количество столбцов меньше 1");
    let array: string[][] = [];
    for (let i = 0; i < props.shape.rows; i++) {
      let vector: string[] = [];
      for (let j = 0; j < props.shape.cols; j++) {
        vector.push(props.number_init);
      }
      array.push(vector);
    }
    setDataArray(array);
  }

  if (dataArray && colNames.length === 0 && rowNames.length === 0) {
    // Дозаполняем лейблы на col
    if (dataArray.length > 0) {
      if (props.row_names) {
        setColNames(
          [""].concat(createNames(props.col_names, dataArray[0].length, ""))
        );
      } else {
        setColNames(createNames(props.col_names, dataArray[0].length, ""));
      }
    }
    // Дозаполняем лейблы на row
    setRowNames(createNames(props.row_names, dataArray.length, ""));
  }

  const closeModal = () => {
    (document.querySelector("#modal") as HTMLModElement).style.display = "none";
  };

  const setData = () => {
    let inputValue = document.getElementById(
      "input-model-matrix"
    ) as HTMLInputElement;
    if (cellData && inputValue.value && dataArray) {
      let new_arr = dataArray;
      new_arr[cellData.row_id][cellData.cell_id - 1] = inputValue.value;
      setDataArray(new_arr);
      //arr[cellData.row_id][cellData.cell_id] = inputValue.value
      closeModal();
      console.log("Data setted!");
      setCellData(undefined);
    }
  };

  if (cellData) {
    (document.querySelector("#modal") as HTMLModElement).style.display =
      "block";
  }

  return (
    <>
      <div id="modal" className="modal" style={{ display: "none" }}>
        <div className="modal-content">
          <h2>Введите число</h2>
          <input id={"input-model-matrix"} type="number"></input>
          <button className="close" onClick={closeModal}>
            Отмена
          </button>
          {cellData && (
            <button className="close" onClick={setData}>
              Подтвердить
            </button>
          )}
        </div>
      </div>

      <div id={props.id} className="matrix">
        {props.col_names && (
          <LabelRow
            id={-1}
            matrixId={props.id}
            vector={colNames}
            clickHandler={(cellId: number, rowId: number) =>
              setCellData({ cell_id: cellId, row_id: rowId })
            }
          />
        )}
        {dataArray?.map((vector, row_i) => {
          let res_vect = [""].concat(vector);
          if (props.row_names) {
            res_vect = [rowNames[row_i]].concat(vector);
            return (
              <Row
                id={row_i}
                matrixId={props.id}
                vector={res_vect.map((val) => val === "1" ? "1" : val === "0" ? "" : val)}
                has_index={true}
                clickHandler={(cellId: number, rowId: number) => {
                  if (!props.disableCellClick)
                    return setCellData({ cell_id: cellId, row_id: rowId });
                }}
              />
            );
          } else {
            return (
              <Row
                id={row_i}
                matrixId={props.id}
                vector={res_vect.map((val) => val === "1" ? "1" : val === "0" ? "" : val)}
                has_index={false}
                clickHandler={(cellId: number, rowId: number) => {
                  if (!props.disableCellClick)
                    return setCellData({ cell_id: cellId, row_id: rowId });
                }}
              />
            );
          }
        })}
      </div>
    </>
  );
}

function createNames(
  initArray: string[] | undefined,
  finalLength: number,
  baseSymbol: string
) {
  let array: string[] = [];

  for (let i = 0; i < finalLength; i++) {
    if (initArray) {
      if (initArray.length > i) {
        array.push(initArray[i]);
      } else {
        array.push(baseSymbol);
      }
    } else {
      array.push(baseSymbol);
    }
  }
  return array;
}
