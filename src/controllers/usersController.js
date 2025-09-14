import User from '../models/users';

class UsersController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      res.json(novoUser);
    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) }); // Percorrendo o array de erros com o map e retornando exatamente o erro que vier ocorrer
    }
  }
}

export default new UsersController();
