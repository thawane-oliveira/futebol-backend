import { Request, Response, Router } from 'express';
import LeaderboardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardService = new LeaderboardService();
const leaderboardController = new LeaderboardController(leaderboardService);

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.getHomeResults(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.getAwayResults(req, res),
);

export default router;
