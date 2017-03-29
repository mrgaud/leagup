select * from clients
full outer join clients_info
on clients.id = clients_info.user_id
where username = $1 or email = $1
