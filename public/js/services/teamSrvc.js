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
    //#############################//#############################

    this.createTeamMessage = function(user, team, message) {
        let obj = {
            team_id: team.team_id,
            poster_id: user.id,
            poster_username: user.username,
            message: message
        }
        return $http.post('/team/createTeamsMessage', obj)
    }

    //#############################//#############################
    this.teamChart = function(team) {
        function getData(liDi) {
            let likes = team[liDi].map(f => moment(f.date).format('YYYYMMDD'))
            counts = {}
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
        likes = getData('likes')
        dislikes = getData('dislikes')

        console.log(likes);
        let ctx = $('#teamChart')
        let teamChart = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    borderColor: 'rgba(100,100,155,.7)',
                    data: likes,
                    tension: .5
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        type: 'linear',
                        ticks: {
                            beginAtZero: true
                        },
                        stacked: true
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
})
