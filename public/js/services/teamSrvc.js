app.service('teamSrvc', function($http, $state) {
    this.createTeam = function(obj) {
        $http.post('/team/create_team', obj)
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

    this.teamChart = function(team){
        console.log(team);
    }
})
