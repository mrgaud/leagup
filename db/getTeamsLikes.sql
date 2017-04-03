select * from teams_likes
join clients
on clients.id = teams_likes.user_id
where team_id = $1
