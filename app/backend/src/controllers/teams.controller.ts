import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(private _service = new TeamsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this._service.getAll();
    return res.status(200).json(teams);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const team = await this._service.getById(id);
    return res.status(200).json(team);
  };
}

export default TeamsController;
