import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private _service = new LeaderboardService()) { }

  public getAllResults = async (_req: Request, res: Response) => {
    const ranking = await this._service.getAllResults();
    return res.status(200).json(ranking);
  };

  public getHomeResults = async (_req: Request, res: Response) => {
    const ranking = await this._service.getHomeResults();
    return res.status(200).json(ranking);
  };

  public getAwayResults = async (_req: Request, res: Response) => {
    const ranking = await this._service.getAwayResults();
    return res.status(200).json(ranking);
  };
}

export default LeaderboardController;
