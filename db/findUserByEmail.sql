SELECT *
FROM clients
join clients_info
on clients_info.user_id = clients.id
WHERE email = $1
;
