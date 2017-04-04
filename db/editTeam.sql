update teams
    set
    team_description= COALESCE($3,team_description), team_games = COALESCE($4,team_games), team_photo = COALESCE($5,team_photo), privacy=COALESCE($6,privacy)
    where team_admin = $1 and team_id = $2
