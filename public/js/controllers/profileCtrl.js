console.log(Date.now());
app.controller('profileCtrl', function($scope, profileSrvc, $location, $state) {

    $scope.games = profileSrvc.games;

    if ($location.url() === '/edit_profile' && !$scope.user) {
        $location.path('login_signup')
    }

    $scope.editProfile = function(description) {
        let checked = []
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
        let obj = {
            description: description || $scope.user.description,
            games: checked.length ? checked : $scope.user.games
        }
        profileSrvc.editProfile(obj)
        $location.path('/user/' + $scope.user.username)
        location.reload()
    }

    $scope.upload = function(id) {
        profileSrvc.upload(id)
    }

    let user = $location.url().replace('/user/', '')
    $(window).scrollTop(0)
    $scope.getProfile(user)

    // if ($state.current.name === 'profile') {
    //     console.log($scope.profile);
    //     if ($scope.profile) {
    //         profileSrvc.chart($scope.profile)
    //     }
    // }
    // NOTE: Controlls the likes/dislikes
    $scope.addLike = function(prof,user){
        let obj = {
            user_id:prof,
            poster_id:user,
            date:Date.now()
        }
        if($scope.profile.dislikesId.includes(user)){
            profileSrvc.removeDislike(obj)
        }
        profileSrvc.addLike(obj)
        location.reload()
    }
    $scope.addDislike = function(prof,user){
        let obj = {
            user_id:prof,
            poster_id:user,
            date:Date.now()
        }
        if($scope.profile.likesId.includes(user)){
            profileSrvc.removeLike(obj)
        }
        profileSrvc.addDislike(obj)
        location.reload()
    }
})
