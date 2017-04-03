app.controller('navCtrl', function($scope, navSrvc, $location, $state, $stateParams) {
    $scope.results = null
    $scope.goTo = function(path){
        $location.path('/search/'+path)
    }
    console.log($stateParams);
    navSrvc.search($stateParams.query).then(res => {
        $scope.results = res.data
        console.log($scope.results);
    }, err => console.log(err))

$scope.test = 'hello world'
})
