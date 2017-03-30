update clients_info
set description = $2, games = $3
where user_id = $1
