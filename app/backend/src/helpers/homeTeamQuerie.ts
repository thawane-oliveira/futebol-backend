const homeQuery = `SELECT 
    t.team_name AS name,
    CAST(SUM(CASE   WHEN m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
    END) AS CHAR) AS totalPoints,
    COUNT(t.team_name) AS totalGames,
    CAST(SUM(m.home_team_goals > m.away_team_goals) AS CHAR) AS totalVictories,
    CAST(SUM(m.home_team_goals = m.away_team_goals) AS CHAR) AS totalDraws,
    CAST(SUM(m.home_team_goals < m.away_team_goals) AS CHAR) AS totalLosses,
    CAST(SUM(m.home_team_goals) AS CHAR) AS goalsFavor,
    CAST(SUM(m.away_team_goals) AS CHAR) AS goalsOwn,
    CAST((SUM(m.home_team_goals) - SUM(m.away_team_goals)) AS SIGNED) AS goalsBalance,
    CAST(ROUND((SUM(CASE
        WHEN m.home_team_goals > m.away_team_goals THEN 3
        WHEN m.home_team_goals = m.away_team_goals THEN 1
        ELSE 0
    END) / (COUNT(*) * 3) * 100), 2) AS CHAR) AS efficiency
FROM    teams AS t        INNER JOIN
    matches AS m ON m.home_team_id = t.id
    WHERE m.in_progress = FALSE
GROUP BY name
ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;
export default homeQuery;
