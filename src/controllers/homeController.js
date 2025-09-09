import Aluno from '../models/aluno';
class HomeController {
  async index(req, res) {
    const novoAluno = await Aluno.create({
      nome: 'Felipe',
      sobrenome: 'Rodrigues',
      email: 'teste@teste.com',
      idade: '25',
      peso: 79,
      altura: 1.81,
    });
    res.json(novoAluno);
  }
}

export default new HomeController();
