app.controller('teamCtrl', function($scope,$state, teamSrvc, profileSrvc, $location) {
    $state.current.name === 'create_team' && !$scope.user?$location.path('login_signup'):''
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
    $scope.privacy = $scope.options[2]

    $scope.upload = function(id) {
        profileSrvc.upload(id)
    }
    $scope.createTeam = function(name,desc,photo,priv){
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
        if((document.getElementById('preview').src).includes('leag')){
            image = document.getElementById('preview').src;
        }else if(photo){
            image = photo
        }else{
            image = null;
        }
        let obj = {
            team_name:name,
            team_description:desc,
            team_photo:image,
            privacy:priv.value,
            team_games:checked
        }
        console.log(obj);
        teamSrvc.createTeam(obj)
        $location.path('/user/'+$scope.user.username)
    }

})
