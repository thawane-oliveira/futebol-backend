import { ModelStatic, Op } from 'sequelize';
import { INewMatch } from '../interfaces/INewMatch';
import { ICreatedMatch } from '../interfaces/ICreatedMatch';
import { IMatchService } from '../interfaces/IMatchService';
import { INewInfo } from '../interfaces/INewInfo';
import Teams from '../database/models/teams.model';
import MatchesModel from '../database/models/matches.model';

class MatchesService implements IMatchService {
  protected model: ModelStatic<MatchesModel> = MatchesModel;

  async getAll(): Promise<MatchesModel[]> {
    return this.model.findAll(
      {
        include: [
          { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
          { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
        ],
      },
    );
  }

  async getByProgress(inProgress: string): Promise<MatchesModel[]> {
    let verifyProgress;
    if (inProgress === 'true') verifyProgress = true;
    if (inProgress === 'false') verifyProgress = false;
    // const verifyProgress = Boolean(inProgress);

    return this.model.findAll({
      include: [
        { model: Teams, as: 'homeTeam', attributes: ['teamName'] },
        { model: Teams, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { [Op.and]: [{ inProgress: verifyProgress }] },
    });
  }

  async createMatch(newMatch: INewMatch): Promise<ICreatedMatch> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = newMatch;
    const data = await this.model.create({
      homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
    });
    return data;
  }

  async finishMatch(id: number): Promise<number[]> {
    return this.model.update({ inProgress: false }, { where: { id } });
  }

  async updateMatch(id: number, newInfo: INewInfo): Promise<number[]> {
    return this.model.update(
      {
        homeTeamGoals: newInfo.homeTeamGoals, awayTeamGoals: newInfo.awayTeamGoals,
      },
      { where: { id } },
    );
  }
}

export default MatchesService;
