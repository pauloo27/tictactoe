import React from 'react';
import GridRow from './GridRow';
import { CellValue } from '../pages/Game';

interface GridProps {
  cellsValue: Array<Array<CellValue>>;
  updateCell: Function;
  playerValue: CellValue;
}

export default function Grid(props: GridProps) : React.ReactElement {
  const { cellsValue, updateCell, playerValue } = props;
  return (
    <div className="grid">
      <GridRow row={0} cellsValue={cellsValue} updateCell={updateCell} playerValue={playerValue} />
      <GridRow row={1} cellsValue={cellsValue} updateCell={updateCell} playerValue={playerValue} />
      <GridRow row={2} cellsValue={cellsValue} updateCell={updateCell} playerValue={playerValue} />
    </div>
  );
}
