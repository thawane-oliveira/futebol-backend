import { ModelStatic } from 'sequelize';
import { ITeamsService } from '../interfaces/ITeamsService';
import { ITeam } from '../interfaces/ITeam';
import TeamsModel from '../database/models/teams.model';

class TeamsService implements ITeamsService {
  protected model: ModelStatic<TeamsModel> = TeamsModel;

  async getAll(): Promise<ITeam[]> {
    return this.model.findAll();
  }

  async getById(id: string): Promise<ITeam | null> {
    return this.model.findByPk(Number(id));
  }
}

export default TeamsService;
