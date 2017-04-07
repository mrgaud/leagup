app.controller('navCtrl', ['$scope','navSrvc', '$location','$state', '$stateParams', function($scope, navSrvc, $location, $state, $stateParams) {
    $scope.results = null
    $scope.goTo = function(path) {
        $location.path('/search/' + path)
        $scope.query = ''
    }
    console.log($stateParams);
    navSrvc.search($stateParams.query).then(res => {
        res.data.teams.map(x => {
            return x.team_games = JSON.parse(x.team_games)
        })
        $scope.results = res.data
        console.log($scope.results);
    }, err => console.log(err))

    $scope.test = 'hello world'
}])
