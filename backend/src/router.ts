import express from 'express';
import * as GameController from './controllers/GameController';

const router = express.Router();

router.post('/games/', GameController.createNewGame);

export default router;
