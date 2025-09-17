import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Foto from '../models/foto';

const upload = multer(multerConfig).single('foto');

class FotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        // eslint-disable-next-line
        const { aluno_id } = req.body;
        // eslint-disable-next-line
        const foto = await Foto.create({ originalname, filename, aluno_id});
        // eslint-disable-next-line
        return res.json(foto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Esse aluno não está cadastrado'],
        });
      }
    });
  }
}

export default new FotoController();
