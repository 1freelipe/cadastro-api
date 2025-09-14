import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import Aluno from '../models/aluno';
import User from '../models/users';

const models = [Aluno, User];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
