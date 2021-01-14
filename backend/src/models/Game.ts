import {
  Table, Model, AllowNull, NotNull, Column,
} from 'sequelize-typescript';

export enum GameStatus {
  WAITING,
  PLAYING,
  FINISHED,
}

@Table
export default class Game extends Model<Game> {
  @AllowNull(false)
  @NotNull
  @Column
  invite!: string;

  @AllowNull(false)
  @NotNull
  @Column
  status!: GameStatus;
}
