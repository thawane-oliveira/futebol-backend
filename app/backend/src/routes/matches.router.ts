import { Request, Response, Router } from 'express';
import { validateToken } from '../middlewares/loginValidator';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));

router.patch(
  '/:id/finish',
  validateToken,
  (req: Request, res: Response) => matchesController.finishMatch(req, res),
);
export default router;
