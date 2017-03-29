app.controller('profileCtrl', function($scope, profileSrvc, $location) {

    $scope.games = profileSrvc.games;

    if ($location.url() === '/edit_profile' && !$scope.user) {
        console.log('working');
        $location.path('login_signup')
    }


    // $(function() {
    //     $('input[type=checkbox]').on('change', function() {
    //         let checked = [];
    //         $('input[type=checkbox]:checked').each(function(index, checkbox) {
    //             checked.push($(checkbox).attr('id'));
    //             return checked
    //         });
    //     });
    // });
    // FIXME: add profile image getter
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
        console.log(obj);
        profileSrvc.editProfile(obj)
    }

})
