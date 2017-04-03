app.service('teamSrvc', function($http, $state) {
    this.createTeam = function(obj) {
        $http.post('/team/createTeam', obj)
    }
    this.getTeam = function() {
        return $http.get('/team/getTeam/' + $state.params.id)
    }
    this.joinTeam = function(user_id, team_id) {
        let obj = {
            user_id: user_id,
            team_id: team_id
        }
        return $http.post('/team/joinTeam', obj)
    }
    this.leaveTeam = function(user_id, team_id) {
        let obj = {
            user_id: user_id,
            team_id: team_id
        }
        return $http.post('/team/leaveTeam', obj)
    }

    this.teamChart = function(team) {
        console.log(team);
    }

    this.createTeamMessage = function(user, team, message) {
        let obj = {
            team_id: team.team_id,
            poster_id: user.id,
            poster_username: user.username,
            message: message
        }
        return $http.post('/team/createTeamsMessage', obj)
    }

    this.teamChart = function(profile) {
        
    }

})
