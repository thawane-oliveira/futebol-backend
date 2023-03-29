import awayQuery from '../helpers/awayTeamQuerie';
import Model from '../database/models';
import homeQuery from '../helpers/homeTeamQuerie';
import ILeaderboard from '../interfaces/ILeaderboard';

class LeaderboardService {
  protected model = Model; // necessário chamar a model desta forma por utilizar query, recebi ajuda do Italo na mentoria

  async getHomeResults(): Promise<ILeaderboard[]> {
    const [results] = await this.model.query(homeQuery);
    return results as ILeaderboard[];
  }

  async getAwayResults(): Promise<ILeaderboard[]> {
    const [results] = await this.model.query(awayQuery);
    return results as ILeaderboard[];
  }
}

export default LeaderboardService;
