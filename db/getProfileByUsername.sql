select * from clients
full outer join clients_info
on clients.id = clients_info.user_id
where lower(username) = lower($1)  or email = $1
