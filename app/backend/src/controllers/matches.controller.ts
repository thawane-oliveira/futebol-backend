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

  public createMatch = async (req: Request, res: Response) => {
    const newMatch = req.body;

    if (newMatch.homeTeamId === newMatch.awayTeamId) {
      return res.status(422).json({
        message: 'It is not possible to create a match with two equal teams',
      });
    }

    const createdMatch = await this._service.createMatch(newMatch);

    if (createdMatch.message) {
      return res.status(404).json({ message: createdMatch.message });
    }

    return res.status(201).json(createdMatch);
  };

  public updateMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const newInfo = req.body;

    await this._service.updateMatch(Number(id), newInfo);
    return res.status(200).json({ message: 'Updated' });
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;

    await this._service.finishMatch(Number(id));
    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;
