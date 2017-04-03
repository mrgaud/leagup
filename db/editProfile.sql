update clients_info
set description = $2, games = $3, image_url = $4
where user_id = $1
