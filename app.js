import dotenv from 'dotenv';
import { resolve } from 'path';
dotenv.config();

import express from 'express';
import HomeRoutes from './src/routes/homeRoutes';
import UserRoutes from './src/routes/userRoutes';
import TokenRoutes from './src/routes/tokenRoutes';
import AlunoRoutes from './src/routes/alunoRoutes';
import FotoRoutes from './src/routes/fotoRoutes';

import './src/database';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'uploads')));
  }

  routes() {
    this.app.use('/', HomeRoutes);
    this.app.use('/users/', UserRoutes);
    this.app.use('/tokens/', TokenRoutes);
    this.app.use('/alunos/', AlunoRoutes);
    this.app.use('/fotos/', FotoRoutes);
  }
}

export default new App().app;
