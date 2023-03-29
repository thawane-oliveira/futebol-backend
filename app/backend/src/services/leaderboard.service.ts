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
    const [results] = await this.model.query(homeQuery);
    return results as ILeaderboard[];
  }

  // async getRanking(): Promise<string> {
  //   const allMatches = await this.getFinishedMatches();

  //   const finishedMatches = allMatches.filter((match) => match.inProgress === false);

  //   console.log(finishedMatches);

  //   // const initialRank = makeRanking(allTeams, finishedMatches);
  //   return 'initialRank';
  //   // const finalRanking = orderRanking(initialRanking);
  //   // return finalRanking;
  // }
}

export default LeaderboardService;
