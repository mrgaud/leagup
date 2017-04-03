app.controller('teamCtrl', function($scope, $state, teamSrvc, profileSrvc, $location) {
    $state.current.name === 'createTeam' && !$scope.user ? $location.path('login_signup') : ''
    $scope.games = profileSrvc.games
    $scope.options = [{
        label: "only I can invite",
        value: 2
    }, {
        label: 'anybody can invite',
        value: 1
    }, {
        label: 'anybody can join',
        value: 0
    }]

    $scope.priv = $scope.options[2]

    if ($state.current.name === "team") {
        teamSrvc.getTeam().then(res => {
            res.data.messages.sort((x, y) => x.date < y.date)
            res.data.messages = res.data.messages.map(x => {
                x.date = moment(x.date).format('MMM Do YYYY, h:mm:ss a')
                return x
            })
            $scope.team = res.data
            console.log(res.data);
            teamSrvc.teamChart($scope.team)
        }, err => {
            console.log(err);
        })
    }

    $scope.upload = function(id) {
        profileSrvc.upload(id)
    }


    $scope.createTeam = function(name, desc, photo, priv) {
        let checked = []
        let image;
        $('input[type=checkbox]:checked').each(function(index, checkbox) {
            checked.push($(checkbox).attr('id'));
        });
        checked = checked.map(x => {
            for (let i = 0; i < $scope.games.length; i++) {
                if ($scope.games[i].name === x) {
                    return x = $scope.games[i]
                }
            }
        })
        checked = JSON.stringify(checked)
        if ((document.getElementById('preview').src).includes('leag')) {
            image = document.getElementById('preview').src;
        } else if (photo) {
            image = photo
        } else {
            image = null;
        }
        let obj = {
            team_name: name,
            team_description: desc,
            team_photo: image,
            privacy: priv.value,
            team_games: checked
        }
        teamSrvc.createTeam(obj)
        $location.path('/user/' + $scope.user.username)
    }

    $scope.joinTeam = function() {
        teamSrvc.joinTeam($scope.user.id, $scope.team.team_id)
        location.reload()
    }
    $scope.leaveTeam = function() {
        teamSrvc.leaveTeam($scope.user.id, $scope.team.team_id)
        location.reload()
    }
    $scope.createTeamsMessage = function(message) {
        teamSrvc.createTeamMessage($scope.user, $scope.team, message).then((res) => {
            teamSrvc.getTeam().then(res => {
                res.data.messages.sort((x, y) => x.date < y.date)
                res.data.messages = res.data.messages.map(x => {
                    x.date = moment(x.date).format('MMM Do YYYY, h:mm:ss a')
                    return x
                })
                $scope.team = res.data
                teamSrvc.teamChart($scope.team)
            }, err => {
                console.log(err);
            })
        })
    }

})
