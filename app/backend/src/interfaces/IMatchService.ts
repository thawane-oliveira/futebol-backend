import Matches from '../database/models/matches.model';

export interface IMatchService {
  getAll(): Promise<Matches[]>;
}
