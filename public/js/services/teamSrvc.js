app.service('teamSrvc', ['$http','$state',function($http, $state) {
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
    this.kickFromTeam = function(obj){
        $http.post('team/kickFromTeam', obj)
    }

    this.edit_team = function(obj){
        return $http.patch('/team/edit_team',obj)
    }
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    this.createTeamMessage = function(user, team, message) {
        let obj = {
            team_id: team.team_id,
            poster_id: user.id,
            poster_username: user.username,
            message: message
        }
        return $http.post('/team/createTeamsMessage', obj)
    }
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################

    this.addLike = function(obj) {
        return $http.post('/team/addLike', obj)
    }
    this.addDislike = function(obj) {
        return $http.post('/team/addDislike', obj)
    }
    this.removeLike = function(obj) {
        return $http.post('/team/removeLike', obj)
    }
    this.removeDislike = function(obj) {
        return $http.post('/team/removeDislike', obj)
    }
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    this.teamChart = function(team) {
        function getData(liDi) {
            let likes = team[liDi].map(f => moment(f.date).format('YYYYMMDD'))
            let counts = {}
            likes.forEach(i => counts[i] = (counts[i] || 0) + 1)
            likes = []
            for (var o in counts) {
                likes.push({
                    x: o,
                    y: counts[o]
                })
            }
            return likes
        }
        let likes = getData('likes')
        let dislikes = getData('dislikes')

        let ctx = $('#teamChart')
        let teamChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label:'likes',
                    borderColor: 'rgba(75,192,192,.5)',
                    backgroundColor:'rgba(75,192,192,0.3)',
                    data: likes,
                    tension: .5
                },{
                    label:'dislikes',
                    data:dislikes,
                    borderColor:'rgba(192,100,100,0.3)',
                    backgroundColor:'rgba(192,100,100,.5)'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        type: 'linear',
                        ticks: {
                            stepSize: 2,
                            beginAtZero: true
                        },
                        stacked: false
                    }],
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'day',
                            round: 'day'
                        }
                    }]
                }
            }
        })
    }
}])
