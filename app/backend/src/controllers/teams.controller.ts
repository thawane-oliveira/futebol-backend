import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(private _service = new TeamsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const posts = await this._service.getAll();
    return res.status(200).json(posts);
  };
}

export default TeamsController;
