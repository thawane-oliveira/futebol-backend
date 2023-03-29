import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private _service = new MatchesService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const matches = await this._service.getAll();
    return res.status(200).json(matches);
  };
}

export default MatchesController;
