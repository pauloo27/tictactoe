import express from 'express';
import Game, { GameStatus } from '../models/Game';
import { ALLOWED_ORIGIN } from '../index';

export async function createNewGame(req: express.Request, res: express.Response) : Promise<void> {
  if (req.headers.origin !== ALLOWED_ORIGIN) {
    res.status(403).send(`${req.headers.origin} isn't a valid origin.`);
    console.log(`Blocked request from ${req.headers.origin}.`);
    return;
  }

  let invite = '';
  let game: Game | null;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    invite = Math.random().toString(36).substring(4);
    // eslint-disable-next-line no-await-in-loop
    game = await Game.findOne({ where: { invite } });
    if (game === null || game.status === GameStatus.FINISHED) break;
  }

  const newGame = Game.build({ status: GameStatus.WAITING, invite });
  await newGame.save();

  res.status(201).send(newGame);
}

export async function joinGame(invite: string) : Promise<void> {
  Game.update({ status: GameStatus.PLAYING }, { where: { invite } });
}
