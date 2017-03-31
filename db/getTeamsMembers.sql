select *
    from teams_clients
    full outer join clients
    on clients.id = teams_clients.user_id
    where team_id = $1
