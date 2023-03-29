import ILeaderboard from '../interfaces/ILeaderboard';
import { IMatch } from '../interfaces/IMatch';

// [ exemplo da ordem esperada
//   {
//     "name": "Palmeiras",
//     "totalPoints": 13,
//     "totalGames": 5,
//     "totalVictories": 4,
//     "totalDraws": 1,
//     "totalLosses": 0,
//     "goalsFavor": 17,
//     "goalsOwn": 5,
//     "goalsBalance": 12,
//     "efficiency": 86.67
//   },
// ]

// matches é o array com todas as partidas já finalizadas, utilizado para fazer o cálculo de pontos

const totalPoints = (matches: IMatch[]) => {
  let points = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      points += 3; // victory
    }
    if (match.homeTeamGoals === match.awayTeamGoals) {
      points += 1; // draw
    }
    if (match.homeTeamGoals < match.awayTeamGoals) {
      points += 0; // loss
    }
  });
  return points;
};

const totalGames = (matches: IMatch[]) => matches.length;

const totalVictories = (matches: IMatch[]) => {
  let victories = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) {
      victories += 1;
    }
  });
  return victories;
};

const totalDraws = (matches: IMatch[]) => {
  let draws = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals === match.awayTeamGoals) {
      draws += 1;
    }
  });
  return draws;
};

const totalLosses = (matches: IMatch[]) => {
  let losses = 0;
  matches.forEach((match) => {
    if (match.homeTeamGoals < match.awayTeamGoals) {
      losses += 1;
    }
  });
  return losses;
};

const goalsFavor = (matches: IMatch[]) => {
  let goals = 0;
  matches.forEach((match) => {
    goals += match.homeTeamGoals;
  });
  return goals;
};

const goalsOwn = (matches: IMatch[]) => {
  let goals = 0;
  matches.forEach((match) => {
    goals += match.awayTeamGoals;
  });
  return goals;
};

const goalsBalance = (matches: IMatch[]) => goalsFavor(matches) - goalsOwn(matches);

const efficiency = (matches: IMatch[]) => {
  const points = totalPoints(matches);
  const games = totalGames(matches);
  const ranking = ((points / (games * 3)) * 100).toFixed(2);
  return ranking;
};

const makeRanking = (allTeams: string[], matches: IMatch[]) => {
  const ranking = [] as ILeaderboard[]; // leaderboard precisa iniciar um array vazio, serão adicionados novos itens ao fim, necessário refatorar

  allTeams.forEach((name) => {
    const teamName = matches.filter((match) => match.homeTeam.teamName === name);
    ranking.push({
      name,
      totalPoints: totalPoints(teamName),
      totalGames: totalGames(teamName),
      totalVictories: totalVictories(teamName),
      totalDraws: totalDraws(teamName),
      totalLosses: totalLosses(teamName),
      goalsFavor: goalsFavor(teamName),
      goalsOwn: goalsOwn(teamName),
      goalsBalance: goalsBalance(teamName),
      efficiency: Number(efficiency(teamName)),
    });
  });
  return ranking;
};

const xablau = () => 'x';

// const orderRanking = (ranking: ILeaderboard[]) => {
//   ranking.sort((a, b) => {
//     if (b.totalVictories !== a.totalVictories) return b.totalVictories - a.totalVictories;
//     if (b.goalsBalance !== a.goalsBalance) return b.goalsBalance - a.goalsBalance;
//     if (b.goalsFavor !== a.goalsFavor) return b.goalsFavor - a.goalsFavor;
//     return b.totalPoints - a.totalPoints;
//   });
// };

export { makeRanking, xablau };
