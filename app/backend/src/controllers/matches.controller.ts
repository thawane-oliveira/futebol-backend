import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private _service = new MatchesService()) { }

  public getAll = async (req: Request, res: Response) => {
    const { inProgress } = req.query;

    if (inProgress === undefined) {
      const matches = await this._service.getAll();
      return res.status(200).json(matches);
    }
    const filteredMatches = await this._service.getByProgress(inProgress as string);
    return res.status(200).json(filteredMatches);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this._service.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
