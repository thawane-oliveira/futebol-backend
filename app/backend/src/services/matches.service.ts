import { ModelStatic } from 'sequelize';
import { IMatchService } from '../interfaces/IMatchService';
import Teams from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';
// import { IMatch } from '../interfaces/IMatch';

class MatchesService implements IMatchService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async getAll(): Promise<MatchesModel[]> {
    return this.model.findAll({ include: [
      { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
      { model: Teams, as: 'awayTeam', attributes: ['teamName'] }] });
  }
}

export default MatchesService;
