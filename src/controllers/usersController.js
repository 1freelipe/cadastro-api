import User from '../models/users';

// Store
class UsersController {
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) }); // Percorrendo o array de erros com o map e retornando exatamente o erro que vier ocorrer
    }
  }

  // Index

  async index(req, res) {
    try {
      console.log('USER ID:', req.userId);
      console.log('USER Email:', req.userEmail);
      const users = await User.findAll();
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // Show

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      return await res.json(user);
    } catch (e) {
      return res.json({ errors: e.message });
    }
  }

  // Update

  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      if (!user) {
        return await res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      const newData = await user.update(req.body);
      return res.json(newData);
    } catch (e) {
      return res.json({ errors: e.message });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const userDelete = await User.findByPk(req.params.id);

      if (!userDelete) {
        return await res.status(400).json({
          errors: ['ID não encontrado'],
        });
      }

      userDelete.destroy();
      return res.json(userDelete);
    } catch (e) {
      return res.json({ errors: e.message });
    }
  }
}

export default new UsersController();
