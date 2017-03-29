SELECT *
FROM clients
full outer join clients_info
on clients_info.user_id = clients.id
WHERE email = $1
;
