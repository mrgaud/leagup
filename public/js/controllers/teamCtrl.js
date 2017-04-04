app.controller('teamCtrl', function($scope, $state, $stateParams, teamSrvc, profileSrvc, $location) {
    $state.current.name === 'createTeam' && !$scope.user ? $location.path('login_signup') : ''
    $state.current.name === 'edit_team' && !$scope.user ? $location.path('login_signup') : ''
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
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    if ($state.current.name === "team") {
        teamSrvc.getTeam().then(res => {
            res.data.messages.sort((x, y) => x.date < y.date)
            res.data.messages = res.data.messages.map(x => {
                x.date = moment(x.date).format('MMM Do YYYY, h:mm:ss a')
                return x
            })
            $scope.team = res.data
            $scope.team.likesId = $scope.team.likes.map(x => x.id)
            $scope.team.dislikesId = $scope.team.dislikes.map(x => x.user_id)
            teamSrvc.teamChart($scope.team)
            console.log($scope.team);
        }, err => {
            console.log(err);
        })
    }
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
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
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    $scope.joinTeam = function() {
        teamSrvc.joinTeam($scope.user.id, $scope.team.team_id)
        location.reload()
    }
    $scope.leaveTeam = function() {
        teamSrvc.leaveTeam($scope.user.id, $scope.team.team_id)
        location.reload()
    }
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
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
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    //###########################//###########################//###########################
    $scope.addLike = function() {
        let obj = {
            user_id: $scope.user.id,
            team_id: $scope.team.team_id,
            date: Date.now()
        }
        $scope.team.dislikes.map(x => {
            if (x.user_id === $scope.user.id) {
                teamSrvc.removeDislike(obj)
            }
        })
        teamSrvc.addLike(obj)
        teamSrvc.getTeam().then(res => {
            res.data.messages.sort((x, y) => x.date < y.date)
            res.data.messages = res.data.messages.map(x => {
                x.date = moment(x.date).format('MMM Do YYYY, h:mm:ss a')
                return x
            })
            $scope.team = res.data
            $scope.team.likesId = $scope.team.likes.map(x => x.id)
            $scope.team.dislikesId = $scope.team.dislikes.map(x => x.user_id)
            teamSrvc.teamChart($scope.team)
        }, err => {
            console.log(err);
        })
    }

    $scope.addDislike = function() {
        let obj = {
            user_id: $scope.user.id,
            team_id: $scope.team.team_id,
            date: Date.now()
        }
        $scope.team.likes.map(x => {
            if (x.user_id === $scope.user.id) {
                teamSrvc.removeLike(obj)
            }
        })
        teamSrvc.addDislike(obj)
        teamSrvc.getTeam().then(res => {
            res.data.messages.sort((x, y) => x.date < y.date)
            res.data.messages = res.data.messages.map(x => {
                x.date = moment(x.date).format('MMM Do YYYY, h:mm:ss a')
                return x
            })
            $scope.team = res.data
            $scope.team.likesId = $scope.team.likes.map(x => x.id)
            $scope.team.dislikesId = $scope.team.dislikes.map(x => x.user_id)
            teamSrvc.teamChart($scope.team)
        }, err => {
            console.log(err);
        })
    }
    // ####################// ####################// ####################// ####################
    // ####################// ####################// ####################// ####################
    // ####################// ####################// ####################// ####################
    $scope.edit_team = function(desc, photo, priv, team) {
        if ($scope.user.id === $stateParams.admin) {
            alert("you do not have permission to edit this team. you will now be redirected back home")
            $location.path('profile({username:$scope.user.username})')
            return
        }
        let checked = []
        let image;
        if ((document.getElementById('preview').src).includes('leag')) {
            image = document.getElementById('preview').src;
        } else if (photo) {
            image = photo
        } else {
            image = null;
        }
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
            user_id:$scope.user.id,
            team_id:$stateParams.team,
            team_description: desc || null,
            team_photo: image,
            privacy: priv.value,
            team_games: checked
        }
        teamSrvc.edit_team(obj)
        $location.path(`team/${$stateParams.team}`)
    }
})
