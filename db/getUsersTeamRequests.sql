select * from pending_team_invites
join teams
on teams.team_id = pending_team_invites.team
where invited = $1
