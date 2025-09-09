// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import HomeRoutes from './src/routes/homeRoutes';

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', HomeRoutes);
  }
}

export default new App().app;
