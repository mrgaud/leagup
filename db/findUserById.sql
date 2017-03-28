SELECT *
FROM clients
join clients_info
on clients.id = clients_info.user_id
WHERE id = $1
;
