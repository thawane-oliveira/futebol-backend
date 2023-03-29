import { Request, Response, Router } from 'express';
import MatchesService from '../services/matches.service';
import MatchesController from '../controllers/matches.controller';

const router = Router();

const matchesService = new MatchesService();
const matchesController = new MatchesController(matchesService);

router.get('/', (req: Request, res: Response) => matchesController.getAll(req, res));

export default router;
