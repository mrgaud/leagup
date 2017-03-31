select * from clients where lower(email) = lower($1) and lower(username) = lower($2)
