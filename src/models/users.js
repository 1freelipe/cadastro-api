import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

export default class Users extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '', // Caso o campo não seja preenchido, ele será uma string vazia
        validate: {
          len: { // Validação que será utilizada
            args: [3, 255], // Argumentos que definirão o tamanho do campo em caracteres.
            msg: 'Campo nome deve conter entre 3 e 255 caracteres',
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existente',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      password: { // Campo que não irá existir no banco de dados
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Campo senha deve conter entre 6 e 50 caracteres',
          },
        },

      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
    }, {
      sequelize,
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8); // Hook que irá mandar a senha antes de salvar no banco de dados, para o hash de senha utilizando o bcrypt
      }
    });
    return this;
  }
}
