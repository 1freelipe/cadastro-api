import Aluno from '../models/aluno';

// Index
class AlunoController {
  async index(req, res) {
    const alunos = await Aluno.findAll();
    res.json(alunos);
  }

  // Store
  async store(req, res) {
    try {
      const novoAluno = await Aluno.create(req.body);
      return res.json(novoAluno);
    } catch (e) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }

  // Update
  async update(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }

      const newData = await aluno.update(req.body);
      return res.json(newData);
    } catch (e) {
      return res.status(400).json({ errors: e.message });
    }
  }

  // Show
  async show(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.json(400).json({ erros: e.message });
    }
  }

  // Delete
  async delete(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Aluno não encontrado'],
        });
      }

      await aluno.destroy();
      return res.json({
        message: 'Aluno apagado',
      });
    } catch (e) {
      return res.status(400).json({ errors: e.message });
    }
  }
}

export default new AlunoController();
