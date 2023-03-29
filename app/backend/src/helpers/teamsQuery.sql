SELECT m.id, thome.team_name as home_team, m.home_team_goals, taway.team_name as away_team, m.away_team_goals FROM TRYBE_FUTEBOL_CLUBE.matches as m
INNer join teams as thome
on thome.id = m.home_team_id
INNer join teams as taway
on taway.id = m.away_team_id
where in_progress = 0;
