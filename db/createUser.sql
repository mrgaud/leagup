INSERT INTO clients (username, email, password)
select $1,$2,$3
where not exists(select * from clients where lower(username)=lower($1) or lower(email)=lower($2))
RETURNING *
;
-- INSERT INTO clients (username, email, password)
-- VALUES ($1, $2, $3)
-- RETURNING *
-- ;
