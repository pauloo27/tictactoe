import { Sequelize } from 'sequelize-typescript';
import os from 'os';
import AbstractService from './AbstractService';
import Game, { GameStatus } from '../models/Game';

export default class Database extends AbstractService {
  db: Sequelize;

  constructor() {
    super('Database');
    this.db = new Sequelize({
      dialect: 'sqlite',
      storage: '.data/database.sqlite',
      models: [Game],
    });
  }

  async load() : Promise<boolean> {
    await this.db.sync();
    await Game.update({ status: GameStatus.FINISHED }, { where: {} });
    return true;
  }
}
