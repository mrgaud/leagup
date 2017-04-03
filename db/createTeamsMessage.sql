insert into teams_messages (team_id, poster_id, poster_username, message, date)
    values($1,$2,$3,$4,$5)
returning *
