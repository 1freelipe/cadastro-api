import jwt from 'jsonwebtoken';
import User from '../models/users';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login necessário'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({
      where: {
        id,
        email,
      },
    });

    if (!user) {
      return res.status(401).json({
        errors: 'Usuário inválido, é necessário um novo login',
      });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (e) {
    console.log(token);
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
