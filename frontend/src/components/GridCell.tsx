import React from 'react';
import { CellValue } from '../pages/Game';

interface GridCellProps {
  cellsValue: Array<Array<CellValue>>
  column: number;
  row: number;
  updateCell: Function;
  playerValue: CellValue;
}

export default function GridCell(props: GridCellProps) : React.ReactElement {
  const {
    row, column, cellsValue, updateCell, playerValue,
  } = props;

  return (
    <div className={`grid-cell grid-cell-r${row} grid-cell-c${column}`} onClick={() => updateCell(row, column, playerValue)}>
      {cellsValue[row][column]}
    </div>
  );
}
