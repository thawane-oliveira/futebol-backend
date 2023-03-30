import allTeams from '../helpers/teamsQuery';
import awayQuery from '../helpers/awayTeamQuerie';
import Model from '../database/models';
import homeQuery from '../helpers/homeTeamQuerie';
import ILeaderboard from '../interfaces/ILeaderboard';

class LeaderboardService {
  protected model = Model; // necessário chamar a model desta forma por utilizar query, recebi ajuda do Italo na mentoria

  efficiencyCalc = (pts: number, games: number) => Number(((pts / (games * 3)) * 100).toFixed(2));

  async getAllResults(): Promise<ILeaderboard[]> {
    const [results] = await this.model.query(allTeams);
    return results as ILeaderboard[];
    // const awayTeams = await this.getAwayResults();

    // const teamRank = homeTeams.map((home) => {
    //   awayTeams.reduce((acc, curr) => {
    //     if (curr.name === acc.name) {
    //       acc.totalPoints += curr.totalPoints;
    //       acc.totalGames += +curr.totalGames;
    //       acc.totalVictories += +curr.totalVictories;
    //       acc.totalDraws += curr.totalDraws;
    //       acc.totalLosses += curr.totalLosses;
    //       acc.goalsFavor += curr.goalsFavor;
    //       acc.goalsOwn += curr.goalsOwn;
    //       acc.goalsBalance = acc.goalsFavor - acc.goalsOwn;
    //       const efficiency = Number(acc.totalPoints / (acc.totalGames * 3) * 100);
    //       acc.efficiency = Number(efficiency.toFixed(2));
    //     }
    //     return acc;
    //   }, home);
    // });

    // const teamRank = homeTeams.filter((team, index) => team[index].name).map((t, idx) => ({
    //   name: t.name,
    //   totalPoints: t.totalPoints + awayTeams[idx].totalPoints,
    //   totalGames: t.totalGames + awayTeams[idx].totalGames,
    //   totalVictories: t.totalVictories + awayTeams[idx].totalVictories,
    //   totalDraws: t.totalDraws + awayTeams[idx].totalDraws,
    //   totalLosses: t.totalLosses + awayTeams[idx].totalLosses,
    //   goalsFavor: t.goalsFavor + awayTeams[idx].goalsFavor,
    //   goalsOwn: t.goalsOwn + awayTeams[idx].goalsOwn,
    //   goalsBalance: t.goalsBalance + awayTeams[idx].goalsBalance,
    //   efficiency: this.efficiencyCalc(
    //     t.totalPoints + awayTeams[idx].totalPoints,
    //     t.totalGames + awayTeams[idx].totalGames,
    //   ) }));
  }

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
