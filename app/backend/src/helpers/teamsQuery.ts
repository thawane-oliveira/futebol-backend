const allTeams = `SELECT 
name,
SUM(leaderboard.totalPoints) AS totalPoints,
SUM(totalGames) AS totalGames,
SUM(totalVictories) AS totalVictories,
SUM(totalDraws) AS totalDraws,
SUM(totalLosses) AS totalLosses,
SUM(goalsFavor) AS goalsFavor,
SUM(goalsOwn) AS goalsOwn,
SUM(goalsBalance) AS goalsBalance,
ROUND((SUM(totalPoints) / (SUM(totalGames) * 3)) * 100,
        2) AS efficiency
FROM
(SELECT 
    t.team_name AS name,
        (SUM(IF(m.home_team_goals > m.away_team_goals, 3, 0)) +
        SUM(IF(m.home_team_goals < m.away_team_goals, 0, 0)) +
        SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0))) AS totalPoints,
        COUNT(t.team_name) AS totalGames,
        SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
        SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
        SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalLosses,
        SUM(m.home_team_goals) AS goalsFavor,
        SUM(m.away_team_goals) AS goalsOwn,
        CAST((SUM(m.home_team_goals) - SUM(m.away_team_goals)) AS SIGNED) AS goalsBalance
FROM
    TRYBE_FUTEBOL_CLUBE.teams AS t
JOIN TRYBE_FUTEBOL_CLUBE.matches AS m ON t.id = m.home_team_id
WHERE
    in_progress = 0
GROUP BY t.team_name UNION ALL
SELECT 
    t.team_name AS name,
        (SUM(IF(m.away_team_goals > m.home_team_goals, 3, 0))
        + SUM(IF(m.away_team_goals < m.home_team_goals, 0, 0))
        + SUM(IF(m.away_team_goals = m.home_team_goals, 1, 0))) AS totalPoints,
        COUNT(t.team_name) AS totalGames,
        SUM(IF(m.away_team_goals > m.home_team_goals, 1, 0)) AS totalVictories,
        SUM(IF(m.away_team_goals = m.home_team_goals, 1, 0)) AS totalDraws,
        SUM(IF(m.away_team_goals < m.home_team_goals, 1, 0)) AS totalLosses,
        SUM(m.away_team_goals) AS goalsFavor,
        SUM(m.home_team_goals) AS goalsOwn,
        (SUM(m.away_team_goals) - SUM(m.home_team_goals)) AS goalsBalance
FROM
    TRYBE_FUTEBOL_CLUBE.teams AS t
JOIN TRYBE_FUTEBOL_CLUBE.matches AS m ON t.id = m.away_team_id
WHERE
    in_progress = 0
GROUP BY t.team_name) AS leaderboard
GROUP BY leaderboard.name
ORDER BY totalPoints DESC , goalsBalance DESC , goalsFavor DESC , goalsOwn DESC;`;

export default allTeams;
