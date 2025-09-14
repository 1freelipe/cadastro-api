import jwt from 'jsonwebtoken';
import User from '../models/users';

// Gerando o token de acesso do usuário
class TokenController {
  async store(req, res) {
    // Garantindo que eu vou receber do usuário o que ele digitar
    const { email = '', password = '' } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'], // Verificando se os campos foram preenchidos
      });
    }

    // Se o usuário for encontrado, o email dele será comparado com o email já existente no banco de dados
    const user = await User.findOne({ where: { email } });

    // Se algum dos campos for inválido, esse será o erro
    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não encontrado'],
      });
    }

    // Adicionando uma verificação de senha, para comparar a senha sendo enviada com o hash de senha do banco de dados
    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    // Gerando o token do usuário
    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    // Retornando o token para o usuário em objeto
    return res.json({ token });
  }
}

export default new TokenController();
