import { Router } from 'express';
import * as teamsController from '../controllers/teams.controller';

const router = Router();

router.get('/', teamsController.getAllTeams);

export default router;
