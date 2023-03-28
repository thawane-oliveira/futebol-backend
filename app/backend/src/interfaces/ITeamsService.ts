import { ITeam } from './ITeam';

export interface ITeamsService {
  getAll(): Promise<ITeam[]>;
}
