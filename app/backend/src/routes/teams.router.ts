import { Request, Response, Router } from 'express';
import TeamsService from '../services/teams.service';
import TeamsController from '../controllers/teams.controller';

const router = Router();

const teamsService = new TeamsService();
const teamsController = new TeamsController(teamsService);

router.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default router;
