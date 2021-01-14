import React from 'react';
import GridCell from './GridCell';
import { CellValue } from '../pages/Game';

interface GridRowProps {
  row: number;
  cellsValue: Array<Array<CellValue>>;
  updateCell: Function;
  playerValue: CellValue;
}

export default function GridRow(props: GridRowProps) : React.ReactElement {
  const {
    row, cellsValue, updateCell, playerValue,
  } = props;
  return (
    <div className="grid-row">
      <GridCell
        row={row}
        column={0}
        cellsValue={cellsValue}
        updateCell={updateCell}
        playerValue={playerValue}
      />
      <GridCell
        row={row}
        column={1}
        cellsValue={cellsValue}
        updateCell={updateCell}
        playerValue={playerValue}
      />
      <GridCell
        row={row}
        column={2}
        cellsValue={cellsValue}
        updateCell={updateCell}
        playerValue={playerValue}
      />
    </div>
  );
}
