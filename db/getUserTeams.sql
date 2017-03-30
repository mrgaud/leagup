select * from teams_clients
join teams
on teams.team_id = teams_clients.team_id
where user_id = $1
