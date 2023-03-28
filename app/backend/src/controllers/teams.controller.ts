import { Request, Response } from 'express';
import { getTeamsService } from '../services/teams.service';

const getAllTeams = async (_req: Request, res: Response) => {
  const posts = await getTeamsService();
  return res.status(200).json(posts);
};

const xablau = () => null;

export { getAllTeams, xablau };
