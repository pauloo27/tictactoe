import React, { useState, useEffect, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import socket from '../services/SocketIO';
import '../styles/Game.scss';
import Grid from '../components/Grid';
import { getLang } from '../utils/Lang';

interface GameProps {
  lang: string;
  setLang: Function;
  langs: any;
  roomInvite: string | undefined;
  roomCreator: boolean;
}

export enum CellValue {
  X = 'X',
  O = 'O',
}

let listenerAdded = false;

export default function Game(props: GameProps) : React.ReactElement {
  const { roomInvite, roomCreator, lang } = props;

  const [cellsValue, setCellsValue] = useState([[], [], []] as Array<Array<CellValue>>);
  const [isPlayerTurn, setIsPlayerTurn] = useState(roomCreator);
  const [winner, setWinner] = useState(undefined as CellValue | undefined | null);
  const playerValue = roomCreator ? CellValue.X : CellValue.O;
  const locale = getLang(lang);

  const checkForWinner = useCallback((cells: Array<Array<CellValue>>) => {
    if (winner !== undefined) return;
    if (cells.flat().length === 9) {
      setWinner(null);
      return;
    }
    const checkFor = (line: Array<CellValue>): boolean => {
      if (winner !== undefined) return true;
      const ordered = line.sort();
      if (ordered[0] !== ordered[2] || ordered[0] === undefined) return false;
      setWinner(ordered[0]);
      return true;
    };
    for (let i = 0; i < 3; i += 1) {
      // horizontal
      if (checkFor([cells[i][0], cells[i][1], cells[i][2]])) return;
      // vertical
      if (checkFor([cells[0][i], cells[1][i], cells[2][i]])) return;
    }
    // diagonals
    if (checkFor([cells[0][0], cells[1][1], cells[2][2]])) return;
    checkFor([cells[0][2], cells[1][1], cells[2][0]]);
  }, [winner, setWinner]);

  const updateCell = useCallback((row: number, column: number, value: CellValue) => {
    setCellsValue((prev: Array<Array<CellValue>>) => {
      if (playerValue === value && !isPlayerTurn) return prev;
      if (prev[row][column] !== undefined || winner !== undefined) return prev;
      const newValue = prev.slice(0);
      newValue[row][column] = value;
      if (value === playerValue) {
        socket.emit('move', { row, column, invite: roomInvite });
        setIsPlayerTurn(false);
      } else {
        setIsPlayerTurn(true);
      }
      checkForWinner(newValue);
      return newValue;
    });
  }, [
    setCellsValue, roomInvite, playerValue, isPlayerTurn, setIsPlayerTurn, checkForWinner, winner,
  ]);

  const playAgain = useCallback((emit = true) => {
    setWinner(undefined);
    setCellsValue([[], [], []]);
    if (emit) socket.emit('replay', { invite: roomInvite });
  }, [setWinner, setCellsValue, roomInvite]);

  useEffect(() => {
    if (roomInvite === undefined || listenerAdded) return;
    listenerAdded = true;
    socket.on('moved', (data: any) => updateCell(data.row, data.column, roomCreator ? CellValue.O : CellValue.X));
    socket.on('replayed', () => playAgain(false));
  }, [updateCell, roomCreator, roomInvite, playAgain]);

  if (roomInvite === undefined) {
    return <Redirect to="/" />;
  }

  const getHeader = () => {
    if (winner !== undefined) {
      const statusMessage = () => {
        if (winner === null) return <h2>{locale.game.draw}</h2>;
        return <h2>{winner === playerValue ? locale.game.you_win : locale.game.you_lost}</h2>;
      };

      return (
        <div id="game-status-header">
          {statusMessage()}
          <button type="button" className="action-button" onClick={() => playAgain()}>
            {locale.game.play_again}
          </button>
        </div>
      );
    }
    return (
      <div id="game-status-header">
        <h2>{isPlayerTurn ? locale.game.your_turn : locale.game.not_your_turn}</h2>
      </div>
    );
  };

  return (
    <div id="game-main-container">
      {getHeader()}
      <div id="game-content">
        <Grid cellsValue={cellsValue} updateCell={updateCell} playerValue={playerValue} />
      </div>
    </div>
  );
}
