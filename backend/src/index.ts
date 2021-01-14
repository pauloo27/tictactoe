import express from 'express';
import cors from 'cors';
import http from 'http';
import socketio from 'socket.io';
import AbstractService from './services/AbstractService';
import Database from './services/Database';
import router from './router';
import * as GameController from './controllers/GameController';

// eslint-disable-next-line import/prefer-default-export
export const ALLOWED_ORIGIN = process.env.TTT_FRONTEND || 'http://localhost:3000';

const app = express();

const server = http.createServer(app);

const io = socketio.listen(server);

const services = [
  new Database(),
];

async function loadServices() : Promise<void> {
  await Promise.all(services.map(async (service: AbstractService) : Promise<boolean> => {
    console.log(`[${service.name}] Loading service...`);
    if (!(await service.load())) {
      console.log(`[${service.name}] Cannot load service.`);
      process.exit(-1);
      return false;
    }
    console.log(`[${service.name}] Loaded.`);
    return true;
  }));
}

async function loadExpressServer() {
  app.use(cors({ origin: ALLOWED_ORIGIN }));
  app.use(router);
  const port = process.env.TTT_PORT || '3003';
  server.listen(port, () => {
    console.log(`HTTP server up and running at port ${port}, listening to requests from ${ALLOWED_ORIGIN}`);
  });
}

async function loadSocketIOHandlers() {
  const invites = new Map<string, any>();
  const rooms = new Map<string, Array<any>>();

  io.on('connection', (socket) => {
    socket.on('ownership', (data) => {
      console.log('The socket', socket.id, 'claimed the ownership of', data);
      invites.set(data, socket);
    });
    socket.on('join', (data) => {
      console.log('The socket', socket.id, 'joinded the room', data);
      invites.get(data).emit('used', data);
      rooms.set(data, [invites.get(data), socket]);
      invites.delete(data);
      GameController.joinGame(data);
    });
    socket.on('move', (data) => {
      const players = rooms.get(data.invite);
      if (players) {
        const adversary = players.find((player: any) => player !== socket);
        adversary.emit('moved', { row: data.row, column: data.column });
      }
    });
    socket.on('replay', (data) => {
      const players = rooms.get(data.invite);
      if (players) {
        const adversary = players.find((player: any) => player !== socket);
        adversary.emit('replayed');
      }
    });
  });
}

loadServices()
  .then(loadSocketIOHandlers)
  .then(loadExpressServer);
